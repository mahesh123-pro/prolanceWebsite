"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, Calendar, MessageSquare, BookOpen, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Fade In Component
const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right", className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
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
      .node-glow { filter: drop-shadow(0 0 10px hsl(var(--primary) / 0.7)); }
      .path-glow { filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.4)); }
    `}} />
    <svg viewBox="50 -100 1100 800" className="w-[120%] h-auto md:w-full max-w-5xl" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Abstract Background Elements */}
      <circle cx="600" cy="300" r="350" fill="hsl(var(--primary))" opacity="0.02" className="animate-pulse" style={{ animationDuration: '7s' }} />
      <circle cx="600" cy="300" r="250" fill="hsl(var(--primary))" opacity="0.04" className="animate-pulse" style={{ animationDuration: '5s' }} />
      <circle cx="600" cy="300" r="150" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.1" strokeDasharray="4 8" className="animate-[spin_40s_linear_infinite] origin-center" />

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
          <circle cx="600" cy="300" r="22" fill="url(#nodeGrad)" stroke="hsl(var(--background))" strokeWidth="4" />
          <circle cx="600" cy="300" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" className="animate-[ping_4s_ease-in-out_infinite]" />
        </g>

        {/* Secondary Nodes */}
        <g style={{ animation: 'svgFloat 5s ease-in-out infinite 1s' }}>
          <circle cx="350" cy="180" r="14" stroke="hsl(var(--background))" strokeWidth="3" />
        </g>
        <g style={{ animation: 'svgFloat 7s ease-in-out infinite 0.5s' }}>
          <circle cx="850" cy="420" r="16" stroke="hsl(var(--background))" strokeWidth="3" />
        </g>
        <g style={{ animation: 'svgFloat 4s ease-in-out infinite 2s' }}>
          <circle cx="500" cy="350" r="12" stroke="hsl(var(--background))" strokeWidth="2.5" className="animate-pulse" />
        </g>
        <g style={{ animation: 'svgFloat 6s ease-in-out infinite 1.5s' }}>
          <circle cx="750" cy="250" r="14" stroke="hsl(var(--background))" strokeWidth="3" />
        </g>

        {/* End Nodes */}
        <circle cx="150" cy="300" r="10" stroke="hsl(var(--background))" strokeWidth="2" />
        <circle cx="1050" cy="300" r="12" stroke="hsl(var(--background))" strokeWidth="2" />
        <circle cx="100" cy="400" r="8" stroke="hsl(var(--background))" strokeWidth="1.5" className="animate-pulse" />
        <circle cx="950" cy="180" r="10" stroke="hsl(var(--background))" strokeWidth="2" />
        <circle cx="250" cy="150" r="8" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="1100" cy="450" r="8" stroke="hsl(var(--background))" strokeWidth="1.5" className="animate-pulse" />

        {/* Polyline intersections */}
        <circle cx="320" cy="220" r="6" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="900" cy="380" r="6" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="350" cy="450" r="5" stroke="hsl(var(--background))" strokeWidth="1" />
        <circle cx="850" cy="450" r="7" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="500" cy="150" r="7" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="750" cy="150" r="7" stroke="hsl(var(--background))" strokeWidth="1.5" />
        <circle cx="900" cy="200" r="5" stroke="hsl(var(--background))" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-16 md:py-28 bg-gradient-to-br from-background via-primary/5 to-secondary/20">
        <div className="absolute inset-0 bg-grid-primary/[0.03] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

        <div className="container relative z-10 px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium mb-8 text-primary backdrop-blur-sm shadow-sm hover:shadow-primary/20 transition-all hover:scale-105 cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2.5 animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
                Welcome to the future of networking
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-foreground/80 leading-tight">
                Accelerate Your<br />
                <span className="text-foreground">Tech Career.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="max-w-[42rem] lg:mx-0 text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                The exclusive networking hub bridging the gap between student developers, early-career tech professionals, and innovative startups hiring top talent.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 rounded-full w-full sm:w-auto overflow-hidden relative group" asChild>
                <Link href="/signup">
                  <span className="relative z-10 flex items-center">Join the Network <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base transition-all hover:scale-105 hover:bg-primary/5 hover:text-primary hover:border-primary/50 rounded-full w-full sm:w-auto shadow-sm" asChild>
                <Link href="/jobs">
                  Explore Tech Jobs
                </Link>
              </Button>
            </FadeIn>

            <FadeIn delay={0.6} className="mt-12 flex items-center gap-6 justify-center lg:justify-start opacity-80">
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i}`} alt={`Beta User ${i}`} className="object-cover h-full w-full" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <span className="text-primary font-bold">Trusted by</span> early beta users
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="left" className="relative mx-auto w-full max-w-[500px] lg:max-w-none aspect-[4/3] lg:aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/30 rounded-full blur-[80px] -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="relative w-full h-[90%] rounded-3xl overflow-hidden border border-white/10 bg-muted/10 shadow-2xl shadow-primary/10 group transition-all duration-500 hover:shadow-primary/30">
              <Image
                src="/images/hero.png"
                alt="Professionals Networking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>

              {/* Floating interactive elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-xl translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Star className="h-6 w-6 fill-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Top Rated Developer Platform</p>
                    <p className="text-sm text-muted-foreground">Join the elite network</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <FadeIn delay={0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/jobs.png"
                    alt="Jobs and Internships"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                    <Briefcase className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Tech Opportunities</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Discover internships, full-time engineering roles, and exclusive freelance gigs posted directly by innovative companies.</p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={0.2}>
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/events.png"
                    alt="Tech Events"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 group-hover:scale-110 shadow-sm">
                    <Calendar className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Developer Events</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Filter and RSVP to hackathons, UI/UX workshops, and local meetups to expand your network in real time.</p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 3 */}
            <FadeIn delay={0.3}>
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/community.png"
                    alt="Community Chat"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                    <MessageSquare className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Vibrant Community</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Engage in technical discussions, ask architectural questions, and share project challenges with peers and senior mentors.</p>
                </div>
              </div>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={0.4}>
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-[220px] w-full overflow-hidden border-b border-border/50">
                  <Image
                    src="/images/resources.png"
                    alt="Learning Resources"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-6 group-hover:scale-110 shadow-sm">
                    <BookOpen className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Curated Resources</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Access high-quality learning materials, developer roadmaps, and interview prep tutorials to stay consistently ahead.</p>
                </div>
              </div>
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
      <section className="py-24 bg-background relative z-20 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6">Loved by our beta users</h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              See what student developers and recruiters are already saying about their experience on Prolance.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <FadeIn delay={0.1}>
              <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 relative flex flex-col h-full hover:shadow-lg transition-all">
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10 rotate-180" />
                <p className="text-lg leading-relaxed text-foreground/80 mb-6 flex-1">
                  "Prolance totally changed how I network. I found a startup looking for a frontend developer and secured my first serious internship within a week of creating my profile."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/100?img=33" alt="Sarah J" className="h-12 w-12 rounded-full ring-2 ring-primary/20 object-cover" />
                  <div>
                    <h4 className="font-bold text-foreground">Sarah J.</h4>
                    <p className="text-sm text-primary">CS Student</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Testimonial 2 */}
            <FadeIn delay={0.2}>
              <div className="bg-primary border border-primary-foreground/10 rounded-3xl p-8 relative flex flex-col h-full shadow-xl shadow-primary/20 text-primary-foreground transform md:-translate-y-4">
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary-foreground/20 rotate-180" />
                <p className="text-lg leading-relaxed mb-6 flex-1">
                  "As a technical recruiter, sifting through generalized job boards is exhausting. Prolance provides a concentrated pool of highly motivated and skilled tech talent."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/100?img=53" alt="Mark T" className="h-12 w-12 rounded-full ring-2 ring-primary-foreground/50 object-cover" />
                  <div>
                    <h4 className="font-bold">Mark T.</h4>
                    <p className="text-sm opacity-80">Technical Recruiter</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Testimonial 3 */}
            <FadeIn delay={0.3}>
              <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 relative flex flex-col h-full hover:shadow-lg transition-all">
                <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/10 rotate-180" />
                <p className="text-lg leading-relaxed text-foreground/80 mb-6 flex-1">
                  "The community aspect is incredible. Whenever I get stuck on a complex bug, I can bounce ideas off senior devs who genuinely want to help out. Highly recommend!"
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/100?img=12" alt="David L" className="h-12 w-12 rounded-full ring-2 ring-primary/20 object-cover" />
                  <div>
                    <h4 className="font-bold text-foreground">David L.</h4>
                    <p className="text-sm text-primary">Junior Full-Stack Dev</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to execute your career roadmap?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-[40rem] mx-auto mb-10 font-medium">Join ambitious tech professionals building their future exclusively on Prolance.</p>
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold shadow-2xl hover:scale-105 transition-transform rounded-full" asChild>
              <Link href="/signup">
                Create Your Free Profile
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
