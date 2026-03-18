"use client";

import Link from "next/link";
import { ArrowRight, Target, Brain, Radar, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AutomatedMatchingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-background to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />

        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Target className="h-8 w-8 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary"
          >
            Find the perfect startup. <br className="hidden md:block" /> Automatically.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[46rem] mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium"
          >
            Stop applying to black holes. Our AI examines your repositories and tech stack, and proactively matches your specific capabilities with startups searching for exact talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/25 hover:scale-105 rounded-full w-full sm:w-auto overflow-hidden group">
              <Link href="/signup">
                <div className="relative z-10 flex items-center justify-center">
                  Get Matched Today <Zap className="ml-2 h-5 w-5 fill-primary-foreground group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base hover:scale-105 hover:bg-muted text-foreground rounded-full w-full sm:w-auto shadow-sm transition-all border-border/50">
              <Link href="/">Back to Home</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/20 border-t border-border/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-3 items-center">
            {[
              {
                icon: <Brain className="h-10 w-10 text-primary" />,
                title: "1. Skill Extractor AI",
                desc: "We parse your GitHub commits and project text to map your actual coding competencies without relying solely on a resume."
              },
              {
                icon: <Radar className="h-10 w-10 text-primary" />,
                title: "2. Passive Radar",
                desc: "Once setup, skip scrolling job boards. Your profile acts as a beacon for internal engineering managers."
              },
              {
                icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
                title: "3. Direct Introduction",
                desc: "When an exact match is discovered, you both receive a direct intro via our internal secure messaging."
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-6 h-24 w-24 rounded-full border border-border/50 bg-background/50 flex items-center justify-center group-hover:bg-primary/5 transition-colors shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
