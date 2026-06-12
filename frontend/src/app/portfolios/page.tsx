"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Layout, Sparkles, Code, Globe, PenTool, 
  ExternalLink, Copy, Check, Trash2, Plus, Laptop, Smartphone, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import toast from 'react-hot-toast';

export default function BuilderPortfoliosPage() {
  // Customizer States
  const [devName, setDevName] = useState('Mahesh Kumar');
  const [devTitle, setDevTitle] = useState('Cloud Engineer & Full-Stack Developer');
  const [devBio, setDevBio] = useState('Building robust, cloud-native backend infrastructures and crafting butter-smooth interactive frontend web systems.');
  const [devGithub, setDevGithub] = useState('github.com/mahesh123-pro');
  const [newSkill, setNewSkill] = useState('');
  const [devSkills, setDevSkills] = useState(['Next.js', 'React', 'AWS', 'TypeScript', 'Node.js', 'Docker']);
  const [theme, setTheme] = useState<'violet' | 'sapphire' | 'emerald' | 'minimalist'>('violet');
  const [layoutType, setLayoutType] = useState<'glass' | 'terminal' | 'bold'>('glass');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  // Quick Preset Autofills
  const applyPreset = (presetType: 'cloud' | 'frontend' | 'ml') => {
    if (presetType === 'cloud') {
      setDevName('Mahesh Kumar');
      setDevTitle('Cloud Architect & DevOps Engineer');
      setDevBio('Designing scalable AWS infrastructures, automating Kubernetes clusters, and constructing microservices pipelines.');
      setDevSkills(['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Go', 'Linux']);
      setTheme('sapphire');
    } else if (presetType === 'frontend') {
      setDevName('Sarah Jenkins');
      setDevTitle('Senior UI/UX & Frontend Developer');
      setDevBio('Obsessed with micro-interactions, layout physics, and responsive pixel-perfect web animations.');
      setDevSkills(['Next.js', 'React', 'Framer Motion', 'Figma', 'TypeScript', 'Tailwind']);
      setTheme('violet');
    } else if (presetType === 'ml') {
      setDevName('Alex Rivera');
      setDevTitle('Machine Learning Engineer');
      setDevBio('Building robust computer vision models, fine-tuning neural transformers, and optimizing GPU inference.');
      setDevSkills(['Python', 'PyTorch', 'Transformers', 'FastAPI', 'AWS', 'SQL']);
      setTheme('emerald');
    }
    toast.success("Preset loaded!");
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill) return;
    if (devSkills.includes(newSkill)) {
      toast.error("Skill already exists!");
      return;
    }
    setDevSkills([...devSkills, newSkill]);
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setDevSkills(devSkills.filter(s => s !== skillToRemove));
  };

  const handleCopyLink = () => {
    setCopied(true);
    toast.success("Public portfolio link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Theme configuration mappings
  const themeClasses = {
    violet: {
      card: "bg-background/40 border-purple-500/20 shadow-purple-500/5",
      accentText: "text-purple-400 bg-purple-500/10",
      accentBg: "bg-purple-600 hover:bg-purple-700",
      glowBg: "from-purple-500/15 via-transparent to-transparent",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    sapphire: {
      card: "bg-background/40 border-blue-500/20 shadow-blue-500/5",
      accentText: "text-blue-400 bg-blue-500/10",
      accentBg: "bg-blue-600 hover:bg-blue-700",
      glowBg: "from-blue-500/15 via-transparent to-transparent",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    emerald: {
      card: "bg-background/40 border-emerald-500/20 shadow-emerald-500/5",
      accentText: "text-emerald-400 bg-emerald-500/10",
      accentBg: "bg-emerald-600 hover:bg-emerald-700",
      glowBg: "from-emerald-500/15 via-transparent to-transparent",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    minimalist: {
      card: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-zinc-500/5",
      accentText: "text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800",
      accentBg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
      glowBg: "from-zinc-500/5 via-transparent to-transparent",
      badge: "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700"
    }
  };

  const layoutClasses = {
    glass: "backdrop-blur-md border rounded-[2rem]",
    terminal: "font-mono border border-t-[24px] border-t-muted rounded-xl bg-black text-green-400",
    bold: "border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(var(--primary),1)] rounded-none"
  };

  return (
    <div className="bg-muted/10 min-h-screen pb-16">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Hero */}
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-4 w-4" />
            Developer Identity Builder
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Build your dynamic tech identity
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Design a custom dev portfolio. Customize layouts, themes, and details live in the sandbox.
          </p>
        </Reveal>

        {/* Sandbox Content Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Control Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="rounded-3xl border border-border/40 bg-background shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="font-bold text-lg">Configure Profile</h3>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => applyPreset('cloud')} 
                    className="text-[10px] font-bold px-2.5 py-1 bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                  >
                    Cloud
                  </button>
                  <button 
                    onClick={() => applyPreset('frontend')} 
                    className="text-[10px] font-bold px-2.5 py-1 bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                  >
                    Design
                  </button>
                  <button 
                    onClick={() => applyPreset('ml')} 
                    className="text-[10px] font-bold px-2.5 py-1 bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
                  >
                    ML
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Developer Name</label>
                  <Input 
                    value={devName} 
                    onChange={(e) => setDevName(e.target.value)} 
                    className="rounded-xl bg-muted/20 border-border/40 font-medium focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Professional Title</label>
                  <Input 
                    value={devTitle} 
                    onChange={(e) => setDevTitle(e.target.value)} 
                    className="rounded-xl bg-muted/20 border-border/40 font-medium focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Short Biography</label>
                  <textarea 
                    rows={3}
                    value={devBio} 
                    onChange={(e) => setDevBio(e.target.value)} 
                    className="w-full p-3.5 rounded-xl bg-muted/20 border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">GitHub Handle</label>
                  <Input 
                    value={devGithub} 
                    onChange={(e) => setDevGithub(e.target.value)} 
                    className="rounded-xl bg-muted/20 border-border/40 font-medium focus-visible:ring-primary"
                  />
                </div>
              </div>

              {/* Skills Tag Adder */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills Stack</label>
                <form onSubmit={addSkill} className="flex gap-2">
                  <Input 
                    placeholder="Add skill (e.g. AWS)" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="rounded-xl bg-muted/20 border-border/40 font-medium"
                  />
                  <Button type="submit" className="rounded-xl px-4 bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all">
                    <Plus className="h-5 w-5" />
                  </Button>
                </form>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <AnimatePresence>
                    {devSkills.map(skill => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="pl-3.5 pr-2 py-1 rounded-lg text-xs font-bold bg-muted text-foreground flex items-center gap-1 border border-border/20 group hover:border-destructive/30 hover:bg-destructive/5 transition-all"
                        >
                          {skill}
                          <button 
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-muted-foreground hover:text-destructive p-0.5 rounded"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Styles Customizer */}
              <div className="space-y-4 pt-4 border-t border-border/40">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Color Theme Glow</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'violet', label: 'Violet Glow', color: 'bg-purple-600' },
                      { id: 'sapphire', label: 'Sapphire', color: 'bg-blue-600' },
                      { id: 'emerald', label: 'Emerald', color: 'bg-emerald-600' },
                      { id: 'minimalist', label: 'Monochrome', color: 'bg-zinc-800 border dark:border-white/10' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTheme(t.id as any)}
                        className={`h-10 rounded-xl flex items-center justify-center gap-1.5 border transition-all text-[11px] font-bold ${theme === t.id ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-border/60 hover:bg-muted/30'}`}
                        title={t.label}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${t.color} shrink-0`} />
                        <span className="truncate max-w-[50px]">{t.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Layout Template</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'glass', label: 'Glassmorphic' },
                      { id: 'terminal', label: 'Terminal CLI' },
                      { id: 'bold', label: 'Cyber Bold' }
                    ].map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLayoutType(l.id as any)}
                        className={`h-10 rounded-xl font-bold border transition-all text-xs ${layoutType === l.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/15 border-border/60 text-muted-foreground hover:bg-muted/30 hover:text-foreground'}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Preview Card (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-background border border-border/40 p-3.5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-muted-foreground/80 font-bold ml-2">portfolio-preview.dev</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('desktop')} 
                  className={`h-8 w-8 rounded-lg ${viewMode === 'desktop' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                  title="Desktop View"
                >
                  <Laptop className="h-4.5 w-4.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode('mobile')} 
                  className={`h-8 w-8 rounded-lg ${viewMode === 'mobile' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                  title="Mobile View"
                >
                  <Smartphone className="h-4.5 w-4.5" />
                </Button>
                <div className="w-px h-5 bg-border mx-1" />
                <Button 
                  onClick={handleCopyLink}
                  className="h-8 rounded-lg text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} 
                  Copy URL
                </Button>
              </div>
            </div>

            {/* Preview Window Canvas */}
            <div className="bg-muted/30 border border-border/40 rounded-[2rem] p-6 flex items-center justify-center overflow-hidden min-h-[480px] shadow-inner relative">
              {/* Animated glow blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

              <motion.div 
                layout
                className={`w-full transition-all duration-500 relative ${viewMode === 'mobile' ? 'max-w-[340px] aspect-[9/16]' : 'max-w-none'}`}
              >
                {/* Dynamic Styled Sandbox Card */}
                <motion.div 
                  layout
                  className={`p-8 md:p-10 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full ${themeClasses[theme].card} ${layoutClasses[layoutType]}`}
                >
                  {/* Internal ambient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses[theme].glowBg} pointer-events-none`} />

                  <div className="space-y-6 relative z-10">
                    {/* Header profile */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <motion.h2 
                          layout="position"
                          className={`text-2xl font-black ${layoutType === 'terminal' ? 'text-green-400' : 'text-foreground'}`}
                        >
                          {devName || 'Name'}
                        </motion.h2>
                        <motion.p 
                          layout="position"
                          className={`text-xs font-bold uppercase tracking-wider mt-1 ${themeClasses[theme].accentText} px-2.5 py-0.5 rounded-full inline-block`}
                        >
                          {devTitle || 'Software Engineer'}
                        </motion.p>
                      </div>
                      
                      {layoutType !== 'bold' && (
                        <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center font-bold text-lg text-primary select-none shrink-0 shadow-inner">
                          {(devName || 'U').charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Bio details */}
                    <p className={`text-sm leading-relaxed ${layoutType === 'terminal' ? 'text-green-300' : 'text-muted-foreground'} font-medium`}>
                      {devBio || 'Developer biography details.'}
                    </p>

                    {/* Skills Badge Row */}
                    <div className="space-y-3 pt-2">
                      <h4 className={`text-xs font-bold uppercase tracking-widest ${layoutType === 'terminal' ? 'text-green-500' : 'text-muted-foreground'}`}>Skills stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {devSkills.length === 0 ? (
                          <span className="text-xs text-muted-foreground/60 italic font-medium">No skills configured.</span>
                        ) : (
                          devSkills.map(skill => (
                            <Badge 
                              key={skill} 
                              className={`px-3 py-1 rounded-lg text-xs font-bold border ${themeClasses[theme].badge} ${layoutType === 'bold' ? 'rounded-none border-2 border-foreground bg-white dark:bg-black text-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]' : ''}`}
                            >
                              {skill}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Simulated Repos section */}
                    <div className="space-y-3 pt-4 border-t border-muted/30">
                      <h4 className={`text-xs font-bold uppercase tracking-widest ${layoutType === 'terminal' ? 'text-green-500' : 'text-muted-foreground'} flex items-center gap-1.5`}>
                        <Code className="h-3.5 w-3.5 text-primary" /> Highlighted Repositories
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {devSkills.slice(0, 2).map((skill, index) => (
                          <div 
                            key={index}
                            className={`p-3.5 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between hover:bg-muted/50 transition-all ${layoutType === 'bold' ? 'rounded-none border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]' : ''}`}
                          >
                            <div>
                              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                <Code className="h-3 w-3 text-primary" /> {devName.split(' ')[0].toLowerCase()}-{skill.toLowerCase()}
                              </span>
                              <p className="text-[10px] text-muted-foreground mt-1 truncate">A robust framework configuration for {skill}.</p>
                            </div>
                            <span className="text-[9px] text-muted-foreground font-semibold flex items-center gap-1 pt-3.5">
                              ⭐ 14 • 🍴 2
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Footer URL link */}
                  <div className="flex justify-between items-center border-t border-muted/30 pt-6 mt-8 relative z-10 flex-wrap gap-3">
                    <span className={`text-xs font-semibold ${layoutType === 'terminal' ? 'text-green-500' : 'text-muted-foreground/80'}`}>
                      {devGithub || 'github.com'}
                    </span>
                    <Button 
                      className={`h-9 px-4 rounded-xl text-xs font-bold text-white transition-all ${themeClasses[theme].accentBg} ${layoutType === 'bold' ? 'rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}`}
                    >
                      Browse Profile <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
