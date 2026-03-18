"use client";

import Link from "next/link";
import { ArrowRight, Layout, Sparkles, Code, Globe, PenTool, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BuilderPortfoliosPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium mb-8 text-primary backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Introducing Builder Portfolios
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-foreground/80"
          >
            Your dynamic tech identity, <br className="hidden md:block" /> unified in one place.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[46rem] mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed font-medium"
          >
            Showcase your repositories, case studies, hackathon wins, and career milestones. Effortlessly generate a strikingly beautiful, developer-focused portfolio that recruiters actually want to read.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/25 hover:scale-105 rounded-full w-full sm:w-auto overflow-hidden relative group">
              <Link href="/signup">
                <div className="relative z-10 flex items-center justify-center">
                  Create Your Portfolio <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base hover:scale-105 hover:bg-primary/5 hover:text-primary rounded-full w-full sm:w-auto shadow-sm">
              <Link href="/">Return Home</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: <Code className="h-8 w-8 text-primary" />,
                title: "GitHub Sync",
                desc: "Automatically import and highlight your top repositories with real-time star counts and commit activity."
              },
              {
                icon: <PenTool className="h-8 w-8 text-primary" />,
                title: "Custom Theming",
                desc: "Personalize your portfolio with dynamic glassmorphism themes integrated directly into your public URL."
              },
              {
                icon: <Globe className="h-8 w-8 text-primary" />,
                title: "Custom Domain",
                desc: "Connect your specific .dev or .me domain and stand out to hiring managers with a unified brand."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
