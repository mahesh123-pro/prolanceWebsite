"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { motion } from "framer-motion";

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function Background3D() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const enabled = useMemo(() => {
    if (!pathname) return true;
    return !pathname.startsWith("/admin");
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    if (getPrefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.set(0, 0, 22);

    // Main group with slow drift
    const group = new THREE.Group();
    scene.add(group);

    const isDark = resolvedTheme !== "light";
    const primary = new THREE.Color(isDark ? 0x9b7cff : 0x6d28d9);
    const secondary = new THREE.Color(isDark ? 0x60a5fa : 0x2563eb);

    // Particle field (depthy star dust)
    const particleCount = Math.round(
      THREE.MathUtils.clamp((window.innerWidth * window.innerHeight) / 14000, 450, 1400)
    );
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const speed = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Wide spread with extra depth
      positions[i3 + 0] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;
      sizes[i] = 0.6 + Math.random() * 1.8;
      speed[i] = 0.2 + Math.random() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: primary },
        uColorB: { value: secondary },
        uOpacity: { value: isDark ? 0.55 : 0.35 },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aSize;
        attribute float aSpeed;
        varying float vMix;
        void main() {
          vec3 p = position;
          // subtle breathing wave + drift based on depth
          float t = uTime * (0.15 + aSpeed * 0.1);
          p.x += sin(t + position.z * 0.08) * 0.25;
          p.y += cos(t + position.x * 0.08) * 0.20;
          vMix = clamp((p.z + 25.0) / 50.0, 0.0, 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * (220.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        varying float vMix;
        void main() {
          vec2 uv = gl_PointCoord.xy - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d);
          vec3 col = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(col, alpha * uOpacity);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    // Soft volumetric-ish blobs (cheap: 2 planes with gradient textures)
    const blobGeo = new THREE.PlaneGeometry(30, 30);
    const blobMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: isDark ? 0.10 : 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: primary,
    });
    const blob1 = new THREE.Mesh(blobGeo, blobMat);
    blob1.position.set(-6, 2, -16);
    blob1.rotation.z = 0.6;
    group.add(blob1);

    const blob2 = new THREE.Mesh(blobGeo, blobMat.clone());
    (blob2.material as THREE.MeshBasicMaterial).color = secondary;
    blob2.position.set(8, -3, -22);
    blob2.rotation.z = -0.4;
    group.add(blob2);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", onResize, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      // slow global drift
      group.rotation.y = t * 0.03;
      group.rotation.x = t * 0.015;

      // mouse parallax (tiny, premium)
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      blobGeo.dispose();
      blobMat.dispose();
      renderer.dispose();
    };
  }, [enabled, resolvedTheme]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="bg-3d fixed inset-0 overflow-hidden pointer-events-none -z-50">
      <canvas ref={canvasRef} className="bg-3d__canvas absolute inset-0" />
      <div className="bg-3d__vignette absolute inset-0" />
      
      {/* Immersive 3D Images in the background */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] opacity-20 mix-blend-screen"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/bg_3d_shape_1.png"
          alt=""
          className="w-full h-full object-contain blur-[1px]"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] min-w-[400px] min-h-[400px] opacity-15 mix-blend-screen"
        animate={{
          y: [0, -40, 0],
          x: [0, 25, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <img
          src="/images/bg_3d_shape_2.png"
          alt=""
          className="w-full h-full object-contain blur-[2px]"
        />
      </motion.div>
    </div>
  );
}

