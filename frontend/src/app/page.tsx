"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, Calendar, MessageSquare, BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// For Animated Counter
const AnimatedCounter = ({ end, className }: { end: number, className?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return <span ref={ref} className={className}>{count}</span>;
};

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
                Connect. Learn.<br />
                <span className="text-foreground">Grow Your Career.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="max-w-[42rem] lg:mx-0 text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                The ultimate platform for students, professionals, and recruiters to discover opportunities, collaborate, and master new skills.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40 rounded-full w-full sm:w-auto overflow-hidden relative group" asChild>
                <Link href="/signup">
                  <span className="relative z-10 flex items-center">Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base transition-all hover:scale-105 hover:bg-primary/5 hover:text-primary hover:border-primary/50 rounded-full w-full sm:w-auto shadow-sm" asChild>
                <Link href="/jobs">
                  Explore Jobs
                </Link>
              </Button>
            </FadeIn>

            <FadeIn delay={0.6} className="mt-12 flex items-center gap-6 justify-center lg:justify-start opacity-80">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <Image src={`/images/hero.png`} alt="User" width={40} height={40} className="object-cover h-full w-full" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <span className="text-primary font-bold">10,000+</span> professionals joined
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
                    <p className="font-bold text-foreground">Top Rated Platform</p>
                    <p className="text-sm text-muted-foreground">Join the best network</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section with animated counters */}
      <section className="py-12 border-y bg-background relative z-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-border">
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-2 flex">
                <AnimatedCounter end={500} /><span className="text-primary">+</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Active Jobs</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-2 flex">
                <AnimatedCounter end={10} />k<span className="text-primary">+</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Users</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-2 flex">
                <AnimatedCounter end={150} /><span className="text-primary">+</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Events</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-2 flex">
                <AnimatedCounter end={99} />%
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground inline-block">Everything you need in one place</h2>
            <p className="text-xl text-muted-foreground max-w-[46rem] mx-auto font-medium">
              Our comprehensive suite of tools helps you build your professional identity and accelerate your career growth exponentially.
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
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Jobs & Internships</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Discover top career opportunities tailored to your unique skill set and experience level. Apply easily and get hired faster.</p>
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
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Tech Events</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Join hackathons, workshops, and meetups to expand your network and learn practically. Connect with industry leaders.</p>
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
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Community</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Engage in vibrant discussions, ask questions, and share knowledge with peers and mentors. Find your technical tribe.</p>
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
                  <h3 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">Resources</h3>
                  <p className="text-muted-foreground flex-1 leading-relaxed">Access curated learning materials, roadmaps, and tutorials to stay ahead of the curve. Filtered for high quality.</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Ready to accelerate your career?</h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-[40rem] mx-auto mb-10 font-medium">Join thousands of professionals already finding their next huge opportunity through Prolance.</p>
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
