"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x7c3aed, 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x60a5fa, 1.5, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Group to hold all network elements
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // 1. Core Sphere (representation of a globe node)
    const coreGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(coreMesh);

    // 2. Outer node particles
    const particleCount = 40;
    const particleGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const particleMat = new THREE.MeshPhongMaterial({
      color: 0x60a5fa,
      emissive: 0x2563eb,
      shininess: 30
    });

    const particles: THREE.Mesh[] = [];
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.1 + Math.random() * 0.7; // orbit distance

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const particle = new THREE.Mesh(particleGeo, particleMat);
      particle.position.set(x, y, z);
      networkGroup.add(particle);
      particles.push(particle);
      positions.push(new THREE.Vector3(x, y, z));
    }

    // 3. Dynamic Connecting Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9b7cff,
      transparent: true,
      opacity: 0.2
    });

    const lines: THREE.Line[] = [];

    // Connect particles if they are close enough
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < 1.4) {
          const points = [positions[i], positions[j]];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, lineMaterial);
          networkGroup.add(line);
          lines.push(line);
        }
      }
    }

    // Handle mouse movement for parallax tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate network
      networkGroup.rotation.y += 0.0025;
      networkGroup.rotation.x += 0.0012;

      // Parallax effect on mouse
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineMaterial.dispose();
      lines.forEach(l => l.geometry.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] relative flex items-center justify-center overflow-hidden" />
  );
}
