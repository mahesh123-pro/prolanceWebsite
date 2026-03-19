"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, Calendar, MessageSquare, BookOpen, Star, Quote, Sparkles, Zap, Layout, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Advanced Fade In Component with 3D effects
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right", className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const yOffset = direction === "up" ? 60 : direction === "down" ? -60 : 0;
  const xOffset = direction === "left" ? 60 : direction === "right" ? -60 : 0;
  const rotate = direction === "left" ? 15 : direction === "right" ? -15 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset, rotate: rotate * 0.1 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, rotate: 0 } : { opacity: 0, y: yOffset, x: xOffset, rotate: rotate * 0.1 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className = "", ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Global Network Premium SVG Component
const GlobalNetworkSVG = () => (
  <div className="w-full relative pointer-events-none flex items-center justify-center">
    <style dangerouslySetInnerHTML={{
      __html: `
      @keyframes svgDash { to { stroke-dashoffset: -100; } }
      @keyframes svgFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      .node-glow { filter: drop-shadow(0 0 10px var(--primary)); opacity: 0.9; }
      .path-glow { filter: drop-shadow(0 0 6px var(--primary)); opacity: 0.8; }
    `}} />
    <svg viewBox="50 -100 1100 800" className="w-[120%] h-auto md:w-full max-w-5xl" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="80%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Abstract Background Elements */}
      <circle cx="600" cy="300" r="350" fill="var(--primary)" opacity="0.02" className="animate-pulse" style={{ animationDuration: '7s' }} />
      <circle cx="600" cy="300" r="250" fill="var(--primary)" opacity="0.04" className="animate-pulse" style={{ animationDuration: '5s' }} />
      <circle cx="600" cy="300" r="150" fill="transparent" stroke="var(--primary)" strokeWidth="1" opacity="0.1" strokeDasharray="4 8" className="animate-[spin_40s_linear_infinite] origin-center" />

      {/* Network Connections */}
      <g fill="none" className="path-glow">
        <path d="M 150 300 Q 350 100, 600 300 T 1050 300" stroke="url(#lineGrad1)" strokeWidth="3.5" opacity="0.9" />
        <path d="M 100 400 Q 300 550, 500 350 T 950 180" stroke="url(#lineGrad2)" strokeWidth="2.5" strokeDasharray="8 8" className="animate-[dash_3s_linear_infinite]" style={{ animationDirection: 'reverse', animationName: 'svgDash' }} />
        <path d="M 250 150 Q 500 50, 750 250 T 1100 450" stroke="url(#lineGrad1)" strokeWidth="1.5" />

        {/* Additional complex routing */}
        <polyline points="150,300 320,220 500,350 750,250 900,380 1050,300" stroke="url(#lineGrad2)" strokeWidth="1" opacity="0.4" />
        <polyline points="100,400 350,450 600,300 850,450 1100,450" stroke="url(#lineGrad1)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
        <path d="M 320 220 L 500 150 L 600 300 L 750 150 L 900 200" stroke="url(#lineGrad1)" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Connection Nodes */}
      <g className="node-glow" fill="url(#nodeGrad)">
        {/* Main Central Nodes */}
        <g style={{ animation: 'svgFloat 6s ease-in-out infinite' }} className="origin-center">
          <circle cx="600" cy="300" r="22" fill="url(#nodeGrad)" stroke="var(--background)" strokeWidth="4" />
          <circle cx="600" cy="300" r="45" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.5" className="animate-[ping_4s_ease-in-out_infinite]" />
        </g>

        {/* Secondary Nodes */}
        <g style={{ animation: 'svgFloat 5s ease-in-out infinite 1s' }}>
          <circle cx="350" cy="180" r="14" stroke="var(--background)" strokeWidth="3" />
        </g>
        <g style={{ animation: 'svgFloat 7s ease-in-out infinite 0.5s' }}>
          <circle cx="850" cy="420" r="16" stroke="var(--background)" strokeWidth="3" />
        </g>
        <g style={{ animation: 'svgFloat 4s ease-in-out infinite 2s' }}>
          <circle cx="500" cy="350" r="12" stroke="var(--background)" strokeWidth="2.5" className="animate-pulse" />
        </g>
        <g style={{ animation: 'svgFloat 6s ease-in-out infinite 1.5s' }}>
          <circle cx="750" cy="250" r="14" stroke="var(--background)" strokeWidth="3" />
        </g>

        {/* End Nodes */}
        <circle cx="150" cy="300" r="10" stroke="var(--background)" strokeWidth="2" />
        <circle cx="1050" cy="300" r="12" stroke="var(--background)" strokeWidth="2" />
        <circle cx="100" cy="400" r="8" stroke="var(--background)" strokeWidth="1.5" className="animate-pulse" />
        <circle cx="950" cy="180" r="10" stroke="var(--background)" strokeWidth="2" />
        <circle cx="250" cy="150" r="8" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="1100" cy="450" r="8" stroke="var(--background)" strokeWidth="1.5" className="animate-pulse" />

        {/* Polyline intersections */}
        <circle cx="320" cy="220" r="6" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="900" cy="380" r="6" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="350" cy="450" r="5" stroke="var(--background)" strokeWidth="1" />
        <circle cx="850" cy="450" r="7" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="500" cy="150" r="7" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="750" cy="150" r="7" stroke="var(--background)" strokeWidth="1.5" />
        <circle cx="900" cy="200" r="5" stroke="var(--background)" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

const Floating3DCube = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes float3dCube {
          0%, 100% { transform: translateY(0) rotateX(10deg) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateX(20deg) rotateY(10deg); }
        }
        .cube-glow { filter: drop-shadow(0 0 20px var(--primary)); opacity: 0.9; }
      `
    }} />
    <svg viewBox="0 0 200 200" className="w-full h-full cube-glow" style={{ animation: 'float3dCube 6s ease-in-out infinite' }}>
      <defs>
        <linearGradient id="cubeTop" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      <polygon points="100,100 180,60 180,140 100,180" fill="url(#cubeRight)" stroke="var(--primary)" strokeWidth="1" />
      <polygon points="100,100 20,60 20,140 100,180" fill="url(#cubeLeft)" stroke="var(--primary)" strokeWidth="1" />
      <polygon points="100,20 180,60 100,100 20,60" fill="url(#cubeTop)" stroke="var(--primary)" strokeWidth="1" />
      
      <polygon points="100,40 160,70 100,100 40,70" fill="none" stroke="var(--foreground)" strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="100" x2="100" y2="160" stroke="var(--foreground)" strokeWidth="1" opacity="0.5" />
      
      <circle cx="100" cy="20" r="3" fill="var(--primary)" />
      <circle cx="20" cy="60" r="3" fill="var(--primary)" />
      <circle cx="180" cy="60" r="3" fill="var(--primary)" />
      <circle cx="100" cy="180" r="3" fill="var(--primary)" />
    </svg>
  </div>
);

const Abstract3DRings = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes spin3dRings {
          0% { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(60deg) rotateY(360deg) rotateZ(360deg); }
        }
      `
    }} />
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ perspective: '500px' }}>
      <g style={{ transformStyle: 'preserve-3d', animation: 'spin3dRings 20s linear infinite', transformOrigin: 'center' }}>
        <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.8" />
        <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.6" style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }} />
        <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.4" style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }} />
        <circle cx="100" cy="100" r="20" fill="var(--primary)" opacity="0.2" className="animate-pulse" />
      </g>
    </svg>
  </div>
);

const Floating3DPyramid = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes floatPyramid {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-15px) rotateY(15deg); }
        }
      `
    }} />
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 15px 15px var(--primary))' }}>
      <defs>
        <linearGradient id="pyrFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="pyrBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="pyrShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g style={{ transformOrigin: 'center', animation: 'floatPyramid 8s ease-in-out infinite' }}>
        <ellipse cx="100" cy="160" rx="50" ry="15" fill="url(#pyrShadow)" />
        <polygon points="100,30 40,140 100,120" fill="url(#pyrBack)" stroke="var(--primary)" strokeWidth="0.5" opacity="0.6" />
        <polygon points="100,30 160,140 100,120" fill="url(#pyrBack)" stroke="var(--primary)" strokeWidth="0.5" opacity="0.3" />
        <polygon points="100,30 40,140 100,160" fill="url(#pyrFront)" stroke="var(--primary)" strokeWidth="1" />
        <polygon points="100,30 160,140 100,160" fill="url(#pyrFront)" stroke="var(--primary)" strokeWidth="1" opacity="0.8" />
        <circle cx="100" cy="30" r="4" fill="var(--primary)" className="animate-ping" />
        <circle cx="100" cy="30" r="4" fill="white" />
      </g>
    </svg>
  </div>
);

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-16 md:py-28 bg-gradient-to-br from-background via-primary/5 to-secondary/20">
        {/* Animated Background Particles */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="absolute inset-0 bg-grid-primary/[0.03] bg-[size:40px_40px] pointer-events-none" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"
          style={{ y: heroY }}
        />

        <motion.div 
          className="container relative z-10 px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <FadeIn delay={0.1}>
              <motion.div 
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium mb-8 text-primary backdrop-blur-sm shadow-sm hover:shadow-primary/20 transition-all hover:scale-105 cursor-default"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="flex h-2 w-2 rounded-full bg-primary mr-2.5 animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                <motion.div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Welcome to the future of networking
                </motion.div>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <motion.h1 
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-foreground/80 leading-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.span className="block">Accelerate Your</motion.span>
                <motion.span 
                  className="block text-foreground"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Tech Career.
                </motion.span>
              </motion.h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <motion.p 
                className="max-w-[42rem] lg:mx-0 text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The exclusive networking hub bridging the gap between student developers, early-career tech professionals, and innovative startups hiring top talent.
              </motion.p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <MagneticButton>
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 rounded-full w-full sm:w-auto overflow-hidden relative group" 
                  asChild
                >
                  <Link href="/signup">
                    <motion.div className="relative z-10 flex items-center" whileHover={{ x: 5 }}>
                      <Zap className="mr-2 h-5 w-5" />
                      Join the Network 
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                    />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-base transition-all hover:scale-105 hover:bg-primary/5 hover:text-primary hover:border-primary/50 rounded-full w-full sm:w-auto shadow-sm" 
                  asChild
                >
                  <Link href="/jobs">
                    Explore Tech Jobs
                  </Link>
                </Button>
              </MagneticButton>
            </FadeIn>

            <FadeIn delay={0.6} className="mt-12 flex items-center gap-6 justify-center lg:justify-start opacity-80">
              <motion.div 
                className="flex -space-x-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[11, 12, 13, 14].map((i, index) => (
                  <motion.div 
                    key={i} 
                    className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt={`Beta User ${i}`} className="object-cover h-full w-full" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div 
                className="text-sm font-medium"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="text-primary font-bold">Trusted by</span> early beta users
              </motion.div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="left" className="relative mx-auto w-full max-w-[500px] lg:max-w-none aspect-[4/3] lg:aspect-square flex items-center justify-center">
            <FloatingElement delay={0.5} duration={4}>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/30 rounded-full blur-[80px] -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </FloatingElement>
            <motion.div 
              className="relative w-full h-[90%] rounded-3xl overflow-hidden border border-white/10 bg-muted/10 shadow-2xl shadow-primary/10 group transition-all duration-500 hover:shadow-primary/30"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ perspective: "1000px" }}
            >
              <Image
                src="/images/hero.png"
                alt="Professionals Networking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Floating interactive elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-xl translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-6 w-6 fill-primary" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Top Rated Developer Platform
                    </motion.p>
                    <motion.p 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Join the elite network
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </FadeIn>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground inline-block">Everything you need to scale your impact</h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              A curated suite of tools engineered to help you securely build your identity, collaborate globally, and accelerate your career.
            </p>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <FadeIn delay={0.1}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/10), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Link href="/jobs" className="absolute inset-0 z-20" aria-label="View Tech Opportunities"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/jobs.png"
                    alt="Jobs and Internships"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Briefcase className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Tech Opportunities
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Discover internships, full-time engineering roles, and exclusive freelance gigs posted directly by innovative companies.</p>
                </div>
              </motion.div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={0.2}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: -5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/10), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <Link href="/events" className="absolute inset-0 z-20" aria-label="View Developer Events"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/events.png"
                    alt="Tech Events"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: -360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Developer Events
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Filter and RSVP to hackathons, UI/UX workshops, and local meetups to expand your network in real time.</p>
                </div>
              </motion.div>
            </FadeIn>

            {/* Feature 3 */}
            <FadeIn delay={0.3}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/10), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <Link href="/community" className="absolute inset-0 z-20" aria-label="View Vibrant Community"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/community.png"
                    alt="Community Chat"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageSquare className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Vibrant Community
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Engage in technical discussions, ask architectural questions, and share project challenges with peers and senior mentors.</p>
                </div>
              </motion.div>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={0.4}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: -5,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    background: [
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/10), transparent)",
                      "linear-gradient(to bottom, hsl(var(--primary)/5), transparent)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
                <Link href="/resources" className="absolute inset-0 z-20" aria-label="View Curated Resources"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/resources.png"
                    alt="Learning Resources"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: -360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BookOpen className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Curated Resources
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Access high-quality learning materials, developer roadmaps, and interview prep tutorials to stay consistently ahead.</p>
                </div>
              </motion.div>
            </FadeIn>

            {/* Feature 5 */}
            <FadeIn delay={0.4}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link href="/portfolios" className="absolute inset-0 z-20" aria-label="View Builder Portfolios"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/portfolios.png"
                    alt="Builder Portfolios"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2.0 }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Layout className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Builder Portfolios
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Customize a striking developer profile to showcase repositories, case studies, and career milestones easily.</p>
                </div>
              </motion.div>
            </FadeIn>

            {/* Feature 6 */}
            <FadeIn delay={0.5}>
              <motion.div 
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: -5,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link href="/matching" className="absolute inset-0 z-20" aria-label="View Automated Matching"></Link>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/matching.png"
                    alt="Automated Matching"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 group-hover:scale-110 shadow-sm"
                    whileHover={{ rotate: -360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.h3 
                    className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Automated Matching
                  </motion.h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Let our smart algorithms match your unique skillset with startups actively searching for developers like you.</p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3D Innovation Elements Section */}
      <section className="py-24 relative overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground inline-block">
              Modern Tech Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              We leverage cutting-edge tools to provide a seamless, high-performance experience.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* 3D Element 1 */}
            <FadeIn delay={0.1} direction="up" className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-48 h-48 mb-6 relative transition-transform duration-500 group-hover:scale-110">
                <Floating3DCube className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">Robust Architecture</h3>
              <p className="text-muted-foreground">Built on solid foundations ensuring 99.9% uptime and enterprise-grade security for your data.</p>
            </FadeIn>

            {/* 3D Element 2 */}
            <FadeIn delay={0.3} direction="up" className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-56 h-56 mb-6 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                 <Abstract3DRings className="w-full h-full drop-shadow-[0_0_15px_var(--primary)]" />
                 <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full -z-10 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">Global Sync</h3>
              <p className="text-muted-foreground">Real-time synchronization across an abstract network ring of distributed servers worldwide.</p>
            </FadeIn>

            {/* 3D Element 3 */}
            <FadeIn delay={0.5} direction="up" className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-48 h-48 mb-6 relative transition-transform duration-500 group-hover:scale-110">
                 <Floating3DPyramid className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">Scalable Solutions</h3>
              <p className="text-muted-foreground">Our infrastructure scales dynamically from student side-projects to enterprise applications.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-24 bg-background relative overflow-hidden border-y border-border/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">Built for Global Connectivity</h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              Join thousands of professionals in a seamlessly interconnected ecosystem designed to accelerate your career growth.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="relative w-full rounded-3xl border border-primary/10 bg-gradient-to-b from-muted/30 to-background p-4 md:p-12 flex items-center justify-center shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            <GlobalNetworkSVG />
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-dark relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <FadeIn className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 text-foreground">Loved by our beta users</h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              See what student developers and recruiters are already saying about their experience on Prolance.
            </p>
          </FadeIn>

          <div className="grid-layout">
            {/* Testimonial 1 */}
            <FadeIn delay={0.1}>
              <motion.div 
                className="card-glass p-8 relative flex flex-col h-full group"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute top-6 right-8 h-12 w-12 text-primary/10 rotate-180"
                  animate={{ 
                    rotate: [180, 185, 180],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Quote className="h-full w-full" />
                </motion.div>
                <motion.p 
                  className="text-lg leading-relaxed text-foreground/80 mb-6 flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  "Prolance totally changed how I network. I found a startup looking for a frontend developer and secured my first serious internship within a week of creating my profile."
                </motion.p>
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://i.pravatar.cc/100?img=33" 
                      alt="Sarah J" 
                      className="h-12 w-12 rounded-full ring-2 ring-primary/20 object-cover" 
                    />
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-bold text-foreground"
                      whileHover={{ color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      Sarah J.
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-primary"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      CS Student
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </FadeIn>

            {/* Testimonial 2 - Featured */}
            <FadeIn delay={0.2}>
              <motion.div 
                className="card-glass bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border-primary/30 p-8 relative flex flex-col h-full transform md:-translate-y-4 group"
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute top-6 right-8 h-12 w-12 text-primary-foreground/20 rotate-180"
                  animate={{ 
                    rotate: [180, 175, 180],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Quote className="h-full w-full" />
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/20"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="h-3 w-3 text-background fill-background" />
                </motion.div>
                <motion.p 
                  className="text-lg leading-relaxed mb-6 flex-1 text-foreground/90 whitespace-pre-line"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  "As a technical recruiter, sifting through generalized job boards is exhausting. Prolance provides a concentrated pool of highly motivated and skilled tech talent."
                </motion.p>
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://i.pravatar.cc/100?img=53" 
                      alt="Mark T" 
                      className="h-12 w-12 rounded-full ring-2 ring-primary-foreground/50 object-cover" 
                    />
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-bold text-foreground"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Mark T.
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-primary opacity-90"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      Technical Recruiter
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </FadeIn>

            {/* Testimonial 3 */}
            <FadeIn delay={0.3}>
              <motion.div 
                className="card-glass p-8 relative flex flex-col h-full group"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="absolute top-6 right-8 h-12 w-12 text-primary/10 rotate-180"
                  animate={{ 
                    rotate: [180, 175, 180],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <Quote className="h-full w-full" />
                </motion.div>
                <motion.p 
                  className="text-lg leading-relaxed text-foreground/80 mb-6 flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  "The community aspect is incredible. Whenever I get stuck on a complex bug, I can bounce ideas off senior devs who genuinely want to help out. Highly recommend!"
                </motion.p>
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://i.pravatar.cc/100?img=12" 
                      alt="David L" 
                      className="h-12 w-12 rounded-full ring-2 ring-primary/20 object-cover" 
                    />
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-bold text-foreground"
                      whileHover={{ color: "hsl(var(--primary))" }}
                      transition={{ duration: 0.2 }}
                    >
                      David L.
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-primary"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    >
                      Junior Full-Stack Dev
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-primary/95"
          animate={{
            background: [
              "linear-gradient(135deg, hsl(var(--primary)/95), hsl(var(--primary)/85))",
              "linear-gradient(135deg, hsl(var(--primary)/85), hsl(var(--primary)/95))",
              "linear-gradient(135deg, hsl(var(--primary)/95), hsl(var(--primary)/85))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 mix-blend-overlay bg-cover bg-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <FadeIn>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              Ready to execute your career roadmap?
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg md:text-xl max-w-[40rem] mx-auto mb-10 font-medium"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join ambitious tech professionals building their future exclusively on Prolance.
            </motion.p>
            <MagneticButton>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-14 px-10 text-lg font-bold shadow-2xl hover:scale-105 transition-transform rounded-full relative overflow-hidden group" 
                  asChild
                >
                  <Link href="/signup">
                    <motion.div 
                      className="relative z-10 flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <Sparkles className="h-5 w-5" />
                      Create Your Free Profile
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      initial={{ y: "100%" }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
