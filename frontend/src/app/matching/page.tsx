"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Target, Brain, Radar, CheckCircle2, Zap, ArrowRight, 
  Sparkles, Loader2, RefreshCw, Send, Lock, Globe, Database, MessageSquare, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';

export default function AutomatedMatchingPage() {
  const [matchState, setMatchState] = useState<'input' | 'scanning' | 'results'>('input');
  
  // Input fields
  const [githubUser, setGithubUser] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [rolePreference, setRolePreference] = useState('Frontend');

  // Scanning simulation states
  const [scanStep, setScanStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  // Results details
  const [matchRate, setMatchRate] = useState(96);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedStartup, setSelectedStartup] = useState<any | null>(null);

  const scanSteps = [
    { text: "Scanning GitHub repositories & commits...", icon: <Globe className="h-5 w-5" /> },
    { text: "Extracting developer stack profiles...", icon: <Brain className="h-5 w-5" /> },
    { text: "Querying verified hiring startups in database...", icon: <Database className="h-5 w-5" /> },
    { text: "Calculating mutual architecture matches...", icon: <Target className="h-5 w-5" /> }
  ];

  const matchedStartups = [
    {
      id: 1,
      name: "ApexLabs",
      match: 98,
      role: "Full-Stack Developer",
      location: "Remote",
      reason: "Your active use of React, Next.js, and Node.js aligns perfectly with ApexLabs' core stack requirements (100% stack match).",
      founders: "Sarah Chen (CTO)",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      skills: ["React", "Next.js", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      name: "NeuroAI",
      match: 92,
      role: "AI Integration Engineer",
      location: "Seattle, WA (Hybrid)",
      reason: "Your background matches their criteria for fine-tuning Transformer pipelines and cloud services deployment.",
      founders: "David Miller (CEO)",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      skills: ["Python", "PyTorch", "Transformers", "AWS"]
    },
    {
      id: 3,
      name: "InnovateTech",
      match: 86,
      role: "Senior Frontend Engineer",
      location: "San Francisco, CA",
      reason: "High score based on your responsive UI designs and styling micro-animations matching their Design System roadmap.",
      founders: "Elena Rostova (VP Product)",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      skills: ["React", "TypeScript", "TailwindCSS", "Framer Motion"]
    }
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUser && !resumeText) {
      toast.error("Please enter a GitHub username or paste some resume text!");
      return;
    }

    setMatchState('scanning');
    setScanStep(0);
    setScanProgress(0);
  };

  // Run scanning progress simulation
  useEffect(() => {
    if (matchState !== 'scanning') return;

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25;
      });
    }, 100);

    // Simulate step changes
    const stepInterval = setInterval(() => {
      setScanStep(prev => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          // Go to results after brief delay
          setTimeout(() => {
            setMatchState('results');
            // Randomize match rate based on inputs slightly
            setMatchRate(Math.floor(Math.random() * 15) + 84);
            toast.success("AI scanning complete! Matches generated.");
          }, 800);
          return 3;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [matchState]);

  const handleSendMessage = () => {
    if (!messageText) {
      toast.error("Message content cannot be empty!");
      return;
    }

    toast.success(`Message sent to ${selectedStartup.founders} at ${selectedStartup.name}!`);
    setMessageOpen(false);
    setMessageText('');
  };

  const autofillData = () => {
    setGithubUser('mahesh123-pro');
    setResumeText("Full-Stack engineer with 2+ years of experience constructing high-performance developer workspaces. Built prolanceWebsite utilizing React, Next.js, and server-side MongoDB schemas. Passionate about animations and clean API structures.");
    toast.success("Mock details autofilled!");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <AnimatePresence mode="wait">
        {matchState === 'input' && (
          <motion.div
            key="input-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-center py-16 md:py-24"
          >
            {/* Hero Details */}
            <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-8"
              >
                <Sparkles className="h-4 w-4" />
                AI Matchmaking Engine
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/95 to-primary">
                Find the perfect startup. <br /> Automatically.
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Stop applying to black holes. Our passive AI radar examines your stack and matches you directly with founders searching for exact talent.
              </p>
            </div>

            {/* Form Section */}
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
              <Card className="rounded-[2rem] border border-border/40 bg-background/50 backdrop-blur-md overflow-hidden p-8 md:p-12 shadow-xl relative">
                <div className="absolute top-0 right-0 p-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={autofillData}
                    className="text-xs text-primary font-bold hover:bg-primary/5 rounded-xl h-8 px-3"
                  >
                    Demo Autofill
                  </Button>
                </div>

                <form onSubmit={handleStartScan} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80">GitHub Username</label>
                    <Input 
                      placeholder="e.g. mahesh123-pro" 
                      className="rounded-xl h-11 bg-muted/20 border-border/40 focus-visible:ring-primary font-medium"
                      value={githubUser}
                      onChange={(e) => setGithubUser(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground/80">We parse repository readmes, stacks, and commit metrics.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80">Paste Resume or Project Summary</label>
                    <textarea 
                      rows={5}
                      placeholder="Describe your coding experience, tech stack, and proudest projects..." 
                      className="w-full p-4 rounded-xl bg-muted/20 border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium focus:border-transparent"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80">Primary Preferred Role Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Frontend', 'Backend', 'Full-Stack'].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setRolePreference(role)}
                          className={`h-11 rounded-xl font-bold border transition-all text-sm ${rolePreference === role ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/15 border-border/60 text-muted-foreground hover:bg-muted/30 hover:text-foreground'}`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                      <Lock className="h-3.5 w-3.5" /> Data is safe & encrypted
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto rounded-xl h-12 px-8 font-bold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                    >
                      Start AI Matching <Zap className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </motion.div>
        )}

        {matchState === 'scanning' && (
          <motion.div
            key="scanning-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 flex flex-col items-center justify-center py-20 bg-gradient-to-br from-background via-primary/5 to-purple-500/5"
          >
            <div className="w-full max-w-md px-6 text-center space-y-10">
              {/* Spinning Radar Circle */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-primary/50"
                />
                <motion.div 
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-28 h-28 rounded-full bg-primary/10 blur-xl"
                />
                <Radar className="h-14 w-14 text-primary animate-pulse relative z-10" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black">AI Radar Active</h2>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">Computing stack similarities and scouting startup portfolios...</p>
              </div>

              {/* Steps Progress */}
              <div className="space-y-4 text-left bg-background/60 border border-border/40 p-6 rounded-2xl shadow-sm">
                {scanSteps.map((step, index) => {
                  const isActive = scanStep === index;
                  const isCompleted = scanStep > index;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center gap-3.5 transition-all duration-300 ${isActive ? 'text-primary font-bold scale-[1.01]' : isCompleted ? 'text-emerald-500 opacity-90' : 'text-muted-foreground/50'}`}
                    >
                      <div className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 ${isActive ? 'border-primary bg-primary/10 text-primary' : isCompleted ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-border/60 text-muted-foreground'}`}>
                        {isActive ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : isCompleted ? <CheckCircle2 className="h-4.5 w-4.5" /> : step.icon}
                      </div>
                      <span className="text-sm">{step.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 text-right">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">{Math.floor(scanProgress)}% Matched</span>
              </div>
            </div>
          </motion.div>
        )}

        {matchState === 'results' && (
          <motion.div
            key="results-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="container px-4 md:px-6 mx-auto py-16 max-w-6xl flex-1 flex flex-col space-y-10"
          >
            {/* Header Dashboard */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-b pb-8 gap-6">
              <div className="text-center md:text-left space-y-2">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Matches Found
                </div>
                <h1 className="text-3xl md:text-5xl font-black">AI Match Dashboard</h1>
                <p className="text-sm text-muted-foreground font-semibold">User Stack Profile: <span className="text-primary">{rolePreference} Developer</span> • GitHub: <span className="text-foreground">{githubUser || 'Linked'}</span></p>
              </div>

              <Button 
                onClick={() => setMatchState('input')}
                variant="outline" 
                className="rounded-xl h-11 border-border/40 hover:bg-muted font-bold flex items-center gap-1.5"
              >
                <RefreshCw className="h-4 w-4" /> Restart AI Scan
              </Button>
            </div>

            {/* Dashboard Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* Circular Score Match Card */}
                <Card className="rounded-[2rem] border border-border/40 p-8 text-center bg-background/50 backdrop-blur-sm shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Aggregate Match Rate</h3>

                  <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="72" cy="72" r="64" stroke="hsl(var(--muted))" strokeWidth="10" fill="transparent" />
                      <motion.circle 
                        cx="72" 
                        cy="72" 
                        r="64" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth="10" 
                        fill="transparent" 
                        strokeDasharray={402}
                        initial={{ strokeDashoffset: 402 }}
                        animate={{ strokeDashoffset: 402 - (402 * matchRate) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-black text-foreground">{matchRate}%</span>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase">Optimal</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
                    Based on stack affinity, location preference, and repository quality metrics.
                  </p>
                </Card>

                {/* Extracted Skills */}
                <Card className="rounded-[2rem] border border-border/40 p-8 bg-background/50 backdrop-blur-sm shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Extracted Stack Profile</h3>
                  
                  <div className="space-y-4">
                    {[
                      { skill: "Frontend Architecture", score: 98 },
                      { skill: "TypeScript Implementation", score: 94 },
                      { skill: "React / Component Design", score: 90 },
                      { skill: "Next.js routing / APIs", score: 85 }
                    ].map((item, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-foreground/80">{item.skill}</span>
                          <span className="text-primary">{item.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary" 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column Matches List */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-lg font-bold text-foreground/80 flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary animate-pulse" />
                  Top Match Introductions
                </h3>

                {matchedStartups.map((startup) => (
                  <Card key={startup.id} className="group overflow-hidden rounded-[2rem] border border-border/40 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <div className="p-8 flex flex-col md:flex-row gap-6 items-start">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 border border-border/60">
                        <img src={startup.image} alt={startup.name} className="object-cover w-full h-full" />
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-2xl font-black group-hover:text-primary transition-colors">{startup.name}</h4>
                              <Badge className="bg-emerald-500/15 text-emerald-600 border-none font-black text-xs px-2.5 py-0.5 rounded-full">{startup.match}% Match</Badge>
                            </div>
                            <p className="text-sm font-semibold text-muted-foreground/80">{startup.role} • {startup.location}</p>
                          </div>
                          
                          <Button 
                            onClick={() => {
                              setSelectedStartup(startup);
                              setMessageOpen(true);
                              setMessageText(`Hi Sarah, I saw ApexLabs matching with my Next.js & Node stack on Prolance. I'd love to chat!`);
                            }}
                            className="rounded-xl h-10 px-5 font-bold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
                          >
                            Introduce Me <Send className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                          {startup.reason}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {startup.skills.map(skill => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1 rounded-lg text-xs font-bold border-none uppercase tracking-tighter bg-muted/40 text-foreground">{skill}</Badge>
                          ))}
                        </div>

                        <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1 border-t pt-4 mt-2">
                          <span>Intro target: <span className="text-foreground font-bold">{startup.founders}</span></span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-in Secure founder Message Dialog */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="max-w-md rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            <div className="p-8 pb-5 border-b border-border/40 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMessageOpen(false)}
                className="absolute right-6 top-6 h-8 w-8 rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-black flex items-center gap-1.5">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Secure Founder Pitch
                </DialogTitle>
                <DialogDescription className="text-sm font-semibold text-muted-foreground/80 mt-1">
                  Introduce yourself to <span className="text-foreground font-bold">{selectedStartup?.founders}</span> at {selectedStartup?.name}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Opening Message</label>
                <textarea
                  rows={4}
                  className="w-full p-4 rounded-xl bg-muted/20 border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium focus:border-transparent"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setMessageOpen(false)}
                  className="rounded-xl font-bold hover:bg-muted"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  className="rounded-xl px-6 h-11 font-bold bg-primary text-primary-foreground flex items-center gap-1.5"
                >
                  Send Introduction <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
