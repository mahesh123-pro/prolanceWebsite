"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, MapPin, Briefcase, DollarSign, BookmarkPlus, 
  ArrowRight, MessageSquare, Upload, FileText, CheckCircle2, 
  Loader2, Sparkles, X, Star, Heart
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from 'framer-motion';

export default function JobsPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
    const [locationFilter, setLocationFilter] = useState('all');
    const [salaryFilter, setSalaryFilter] = useState('all');

    // Applied jobs tracker
    const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
    // Bookmarked jobs tracker
    const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>([]);

    // Application Modal state
    const [applyingJob, setApplyingJob] = useState<any | null>(null);
    const [applyStep, setApplyStep] = useState<number>(1); // 1 = Resume, 2 = Pitch, 3 = Success
    const [resumeFile, setResumeFile] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [coverLetter, setCoverLetter] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDragActive, setIsDragActive] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock data for initial fill if backend has no jobs yet
    const mockJobs = [
        {
            _id: '1',
            title: 'Senior Frontend Engineer',
            company: 'InnovateTech',
            location: 'San Francisco, CA (Remote)',
            jobType: 'Full-time',
            salary: '$140k - $180k',
            skillsRequired: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
            description: 'We are looking for a Senior Frontend Engineer to join our core team...',
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            title: 'Product Design Intern',
            company: 'CreativeFlow',
            location: 'New York, NY',
            jobType: 'Internship',
            salary: '$30/hr',
            skillsRequired: ['Figma', 'UI/UX', 'Prototyping'],
            description: 'Apply your design skills to real-world products in our summer internship program...',
            createdAt: new Date().toISOString()
        },
        {
            _id: '3',
            title: 'Backend Developer (Go)',
            company: 'CloudStream',
            location: 'Austin, TX',
            jobType: 'Contract',
            salary: '$90 - $120 /hr',
            skillsRequired: ['Go', 'Kubernetes', 'gRPC', 'PostgreSQL'],
            description: 'Help us scale our streaming infrastructure using Go and cloud native tools...',
            createdAt: new Date().toISOString()
        },
        {
            _id: '4',
            title: 'Full-Stack Developer (Next.js & Node)',
            company: 'ApexLabs',
            location: 'Remote (US/Canada)',
            jobType: 'Full-time',
            salary: '$110k - $140k',
            skillsRequired: ['Next.js', 'Node.js', 'MongoDB', 'GraphQL'],
            description: 'Join our rapidly growing startup to build the future of collaborative workspace dashboards...',
            createdAt: new Date().toISOString()
        },
        {
            _id: '5',
            title: 'Machine Learning Engineer',
            company: 'NeuroAI',
            location: 'Seattle, WA (Hybrid)',
            jobType: 'Full-time',
            salary: '$160k - $210k',
            skillsRequired: ['Python', 'PyTorch', 'Transformers', 'AWS'],
            description: 'Work on edge-of-the-art agentic AI pipelines and custom fine-tuned models...',
            createdAt: new Date().toISOString()
        }
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs');
                if (res.data.success && res.data.data.length > 0) {
                    setJobs(res.data.data);
                } else {
                    setJobs(mockJobs);
                }
            } catch (err) {
                console.error(err);
                setJobs(mockJobs);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Drag and drop handlers
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startMockUpload(e.dataTransfer.files[0].name);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            startMockUpload(e.target.files[0].name);
        }
    };

    const startMockUpload = (filename: string) => {
        setResumeFile(filename);
        setIsUploading(true);
        setUploadProgress(0);
        
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
    };

    const handleApplySubmit = () => {
        if (!resumeFile) {
            toast.error("Please upload your resume first!");
            return;
        }
        setIsSubmitting(true);
        
        // Simulate API network latency
        setTimeout(() => {
            setIsSubmitting(false);
            setApplyStep(3); // Go to success step
            setAppliedJobIds(prev => [...prev, applyingJob._id]);
            toast.success("Application sent successfully!");
        }, 1500);
    };

    const toggleBookmark = (id: string) => {
        if (bookmarkedJobIds.includes(id)) {
            setBookmarkedJobIds(prev => prev.filter(jobId => jobId !== id));
            toast.success("Removed from bookmarks");
        } else {
            setBookmarkedJobIds(prev => [...prev, id]);
            toast.success("Added to bookmarks");
        }
    };

    // Filter logic
    const handleJobTypeChange = (type: string) => {
        setSelectedJobTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              job.skillsRequired.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);
        
        const matchesLocation = locationFilter === 'all' || 
            (locationFilter === 'remote' && job.location.toLowerCase().includes('remote')) ||
            (locationFilter === 'onsite' && !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid')) ||
            (locationFilter === 'hybrid' && job.location.toLowerCase().includes('hybrid'));

        const matchesSalary = salaryFilter === 'all' ||
            (salaryFilter === 'entry' && (job.salary.includes('$50k') || job.salary.includes('$80k') || job.salary.includes('$30/hr'))) ||
            (salaryFilter === 'mid' && (job.salary.includes('$90') || job.salary.includes('$110k') || job.salary.includes('$120k'))) ||
            (salaryFilter === 'senior' && (job.salary.includes('$140k') || job.salary.includes('$160k') || job.salary.includes('$180k') || job.salary.includes('$210k')));

        return matchesSearch && matchesType && matchesLocation && matchesSalary;
    });

    // Cover letter pitch quick templates
    const pitchTemplates = [
        {
            label: "🚀 Full-Stack Specialist",
            text: "Hi there! I am a Full-Stack Developer with extensive hands-on experience in React, Next.js, and Node.js backend pipelines. Having built similar modern interactive portals, I am confident I can hit the ground running at your team. I would love to hop on a call to talk about how I can contribute!"
        },
        {
            label: "✨ Frontend UI/UX Engineer",
            text: "Hello! Visual excellence and butter-smooth micro-animations are my absolute specialty. I design highly responsive, custom-stylized components that offer exceptional UX. I’ve reviewed your tech stack and see an excellent alignment with my core TypeScript & Next.js skills."
        },
        {
            label: "⚡ Ambitious Student/Intern",
            text: "Hello! I am a passionate Computer Science student looking to bring my drive, quick learning capacity, and clean coding practices to your internship program. I build production-ready side projects weekly and have active expertise with modern Git, database management, and hosting infrastructures."
        }
    ];

    return (
        <div className="bg-muted/10 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header Section */}
                <Reveal className="mb-12 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        Premium Opportunities
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      Find your next big opportunity
                    </h1>
                    <p className="text-muted-foreground text-lg mb-12">
                      Explore thousands of jobs and internships from top tech companies.
                    </p>

                    {/* What you get by joining section */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
                        {[
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                title: "Verified Startups",
                                desc: "Every company is vetted. No ghosting, no fake jobs. Apply with confidence to teams actively hiring."
                            },
                            {
                                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                                title: "Direct Founder Chat",
                                desc: "Skip the generic HR queue. Our platform lets you message technical hiring managers directly."
                            },
                            {
                                icon: <DollarSign className="h-6 w-6 text-primary" />,
                                title: "Transparent Salaries",
                                desc: "Upfront compensation and equity details on every single post. Never waste time on low-ball offers."
                            }
                        ].map((benefit, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="p-6 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-md hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Reveal>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <Reveal className="rounded-3xl">
                          <Card className="rounded-3xl border border-border/40 shadow-sm overflow-hidden bg-background/60 backdrop-blur-md">
                            <CardHeader className="pb-4 border-b bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Filters</h3>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 text-xs text-primary font-bold px-2 hover:bg-primary/5"
                                      onClick={() => {
                                        setSelectedJobTypes([]);
                                        setLocationFilter('all');
                                        setSalaryFilter('all');
                                      }}
                                    >
                                      Reset
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground/80">Job Type</h4>
                                    <div className="space-y-2">
                                        {['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'].map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox 
                                                  id={type} 
                                                  checked={selectedJobTypes.includes(type)}
                                                  onCheckedChange={() => handleJobTypeChange(type)}
                                                  className="rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                                />
                                                <label htmlFor={type} className="text-sm font-medium leading-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors">{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground/80">Location Type</h4>
                                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                                        <SelectTrigger className="rounded-xl bg-muted/40 border-none h-11 focus:ring-1 focus:ring-primary">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl">
                                            <SelectItem value="all">All Locations</SelectItem>
                                            <SelectItem value="remote">Remote Only</SelectItem>
                                            <SelectItem value="onsite">On-site Only</SelectItem>
                                            <SelectItem value="hybrid">Hybrid Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground/80">Salary Range</h4>
                                    <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                                        <SelectTrigger className="rounded-xl bg-muted/40 border-none h-11 focus:ring-1 focus:ring-primary">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border border-border/40 bg-background/95 backdrop-blur-xl">
                                            <SelectItem value="all">Any Salary</SelectItem>
                                            <SelectItem value="entry">$50k - $80k (Entry)</SelectItem>
                                            <SelectItem value="mid">$80k - $120k (Mid-level)</SelectItem>
                                            <SelectItem value="senior">$120k - $200k+ (Senior)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                          </Card>
                        </Reveal>

                        <Reveal delay={0.05} className="p-6 rounded-3xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                            <h4 className="font-extrabold mb-2 flex items-center gap-2 text-base">
                              <Sparkles className="h-4.5 w-4.5" />
                              Get matched instantly!
                            </h4>
                            <p className="text-xs text-primary-foreground/80 mb-4 font-medium leading-relaxed">Let companies find you. Access our AI developer-founder match engine.</p>
                            <Button variant="secondary" className="w-full rounded-xl font-bold bg-white text-primary hover:bg-white/95 hover:scale-[1.02] active:scale-95 transition-all shadow-sm" size="sm" asChild>
                              <Link href="/matching">Try AI Matcher</Link>
                            </Button>
                        </Reveal>
                    </aside>

                    {/* Main Job List */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search Bar */}
                        <Reveal className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Job title, keywords, or company..."
                                    className="pl-11 h-13 rounded-2xl bg-background border-border/40 shadow-sm focus-visible:ring-primary shadow-inner"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button className="h-13 rounded-2xl px-8 shadow-lg shadow-primary/10 font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] bg-primary text-primary-foreground">
                                Search Jobs
                            </Button>
                        </Reveal>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                <Loader2 className="animate-spin h-10 w-10 text-primary" />
                                <p className="text-muted-foreground font-semibold text-sm">Vetting roles...</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {filteredJobs.length === 0 ? (
                                    <div className="text-center py-20 bg-background/60 rounded-3xl border border-dashed p-8">
                                        <Briefcase className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold mb-2">No matching jobs found</h3>
                                        <p className="text-muted-foreground font-medium text-sm">Try broadening your search term or updating your filters.</p>
                                    </div>
                                ) : (
                                  <AnimatePresence mode="popLayout">
                                    {filteredJobs.map((job: any, idx: number) => {
                                        const isApplied = appliedJobIds.includes(job._id);
                                        const isBookmarked = bookmarkedJobIds.includes(job._id);

                                        return (
                                            <motion.div 
                                                key={job._id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <Card className="group overflow-hidden rounded-[2rem] border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 bg-background/70 backdrop-blur-sm relative">
                                                    {isApplied && (
                                                        <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-600 border-l border-b border-emerald-500/20 px-4 py-1.5 rounded-bl-2xl font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Applied
                                                        </div>
                                                    )}
                                                    <CardContent className="p-8">
                                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                            <div className="flex gap-6 items-start">
                                                                <div className="h-16 w-16 rounded-[1.25rem] bg-muted/60 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                                                    <Briefcase className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2.5 flex-wrap mb-1">
                                                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">{job.title}</h3>
                                                                        <Badge className="bg-primary/10 text-primary hover:bg-primary/15 border-none font-bold text-xs uppercase rounded-md px-2 py-0.5">{job.jobType}</Badge>
                                                                    </div>
                                                                    <p className="font-semibold text-muted-foreground/90 mb-3">{job.company}</p>
                                                                    <div className="flex flex-wrap gap-3 text-sm font-medium">
                                                                        <div className="flex items-center gap-1.5 text-muted-foreground/80 bg-muted/40 px-3.5 py-1 rounded-full">
                                                                            <MapPin className="h-3.5 w-3.5 text-primary/60" />
                                                                            {job.location}
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5 text-muted-foreground/80 bg-muted/40 px-3.5 py-1 rounded-full">
                                                                            <DollarSign className="h-3.5 w-3.5 text-emerald-500/60" />
                                                                            {job.salary || 'Competitive'}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="icon" 
                                                                    onClick={() => toggleBookmark(job._id)}
                                                                    className={`h-12 w-12 rounded-2xl shrink-0 transition-all border-border/40 ${isBookmarked ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20' : 'hover:border-primary/30 hover:text-primary'}`}
                                                                >
                                                                    <BookmarkPlus className={`h-5 w-5 ${isBookmarked ? 'fill-primary' : ''}`} />
                                                                </Button>
                                                                <Button 
                                                                    disabled={isApplied}
                                                                    onClick={() => {
                                                                        setApplyingJob(job);
                                                                        setApplyStep(1);
                                                                        setResumeFile(null);
                                                                        setCoverLetter('');
                                                                    }}
                                                                    className={`flex-1 md:flex-none h-12 px-8 rounded-2xl font-bold transition-all shadow-md ${isApplied ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none' : 'bg-primary text-primary-foreground hover:scale-[1.03] active:scale-[0.98] shadow-primary/10'}`}
                                                                >
                                                                    {isApplied ? "Applied" : "Apply Now"} {!isApplied && <ArrowRight className="ml-2 h-4 w-4" />}
                                                                </Button>
                                                            </div>
                                                        </div>

                                                        <div className="mt-8 pt-8 border-t border-muted/50">
                                                            <div className="flex flex-wrap gap-2">
                                                                {job.skillsRequired?.map((skill: string) => (
                                                                    <Badge key={skill} variant="secondary" className="px-3 py-1 rounded-lg text-xs font-bold tracking-tight bg-muted/40 hover:bg-primary/5 hover:text-primary transition-colors border-none uppercase">
                                                                        {skill}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                  </AnimatePresence>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Interactive Apply Job Dialog */}
            <Dialog open={applyingJob !== null} onOpenChange={(open) => { if (!open) setApplyingJob(null); }}>
                <DialogContent className="max-w-xl rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
                    <div className="relative">
                        {/* Soft ambient background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                        
                        <div className="p-8 pb-6 border-b border-border/40 relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setApplyingJob(null)}
                                className="absolute right-6 top-6 h-8 w-8 rounded-full hover:bg-muted/80 p-0 text-muted-foreground"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            
                            <DialogHeader className="text-left">
                                <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    Apply to {applyingJob?.company}
                                </DialogTitle>
                                <DialogDescription className="text-sm font-medium text-muted-foreground/80 mt-1">
                                    Position: <span className="text-foreground font-bold">{applyingJob?.title}</span> • {applyingJob?.location}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Step indicators */}
                            <div className="flex items-center gap-2 mt-6">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex-1 flex items-center gap-2">
                                        <div className={`h-2.5 rounded-full transition-all duration-300 ${applyStep === step ? 'w-10 bg-primary' : applyStep > step ? 'w-2.5 bg-emerald-500' : 'w-2.5 bg-muted/60'}`} />
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${applyStep === step ? 'text-primary' : applyStep > step ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                                            {step === 1 ? "Resume" : step === 2 ? "Pitch" : "Success"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dialog body with step animations */}
                        <div className="p-8 min-h-[300px] flex flex-col justify-between relative">
                            <AnimatePresence mode="wait">
                                {applyStep === 1 && (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6 flex-1"
                                    >
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-base">Submit your resume</h4>
                                            <p className="text-sm text-muted-foreground">Upload your latest PDF or DOCX resume. Recruiters verify details automatically.</p>
                                        </div>

                                        <div 
                                            onDragEnter={handleDrag}
                                            onDragOver={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-primary bg-primary/5' : 'border-border/60 bg-muted/20 hover:border-primary/50'}`}
                                        >
                                            <input 
                                                ref={fileInputRef}
                                                type="file" 
                                                accept=".pdf,.docx,.doc" 
                                                className="hidden" 
                                                onChange={handleFileChange}
                                            />
                                            
                                            {isUploading ? (
                                                <div className="space-y-4 py-4">
                                                    <Loader2 className="animate-spin h-10 w-10 text-primary mx-auto" />
                                                    <div className="space-y-2 max-w-[200px] mx-auto">
                                                        <p className="text-sm font-bold">Uploading File...</p>
                                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : resumeFile ? (
                                                <div className="space-y-4 py-2">
                                                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground truncate max-w-[250px] mx-auto">{resumeFile}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">Mock Resume Selected</p>
                                                    </div>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="text-xs text-destructive hover:bg-destructive/5 font-bold rounded-lg"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setResumeFile(null);
                                                        }}
                                                    >
                                                        Remove File
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-3 py-4">
                                                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                                        <Upload className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground">Drag and drop file here</p>
                                                        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or DOC up to 10MB</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="rounded-xl font-bold border-border/60 mt-2">
                                                        Browse Files
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <div className="text-xs text-muted-foreground font-semibold">Step 1 of 3</div>
                                            <Button 
                                                disabled={!resumeFile || isUploading}
                                                onClick={() => setApplyStep(2)}
                                                className="rounded-xl px-6 font-bold flex items-center gap-1 bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-transform"
                                            >
                                                Continue <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {applyStep === 2 && (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6 flex-1"
                                    >
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-base">Write a quick founder pitch</h4>
                                            <p className="text-sm text-muted-foreground">Outline why you are a great match. Tap a template below to prefill.</p>
                                        </div>

                                        {/* Pitch quick templates */}
                                        <div className="flex flex-wrap gap-2">
                                            {pitchTemplates.map((tpl, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setCoverLetter(tpl.text)}
                                                    className="px-3.5 py-1.5 rounded-full border border-border/40 bg-muted/40 hover:bg-primary/5 hover:border-primary/30 transition-all text-xs font-semibold text-muted-foreground hover:text-primary"
                                                >
                                                    {tpl.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <textarea
                                                rows={5}
                                                placeholder="Introduce yourself and outline your top highlights..."
                                                className="w-full p-4 rounded-2xl bg-muted/30 border border-border/40 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent font-medium"
                                                value={coverLetter}
                                                onChange={(e) => setCoverLetter(e.target.value)}
                                            />
                                            <div className="text-right text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                                                {coverLetter.length} chars
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => setApplyStep(1)}
                                                className="rounded-xl font-bold hover:bg-muted"
                                            >
                                                Back
                                            </Button>
                                            <Button 
                                                disabled={isSubmitting}
                                                onClick={handleApplySubmit}
                                                className="rounded-xl px-6 font-bold flex items-center gap-1.5 bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-transform"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="animate-spin h-4 w-4" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Application <CheckCircle2 className="h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {applyStep === 3 && (
                                    <motion.div 
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="space-y-8 flex-1 flex flex-col items-center justify-center py-6 text-center"
                                    >
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [0, 1.2, 1] }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10"
                                        >
                                            <CheckCircle2 className="h-10 w-10" />
                                        </motion.div>

                                        <div className="space-y-2 max-w-sm">
                                            <h4 className="text-2xl font-extrabold text-foreground">Application Sent!</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Awesome! Your resume and pitch have been submitted directly to the hiring founder at <span className="font-bold text-foreground">{applyingJob?.company}</span>.
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 w-full max-w-sm text-left flex items-start gap-3.5">
                                            <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-foreground">Direct founder link open</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">The founder can now initiate a secure chat. Keep an eye on your messages inbox!</p>
                                            </div>
                                        </div>

                                        <Button 
                                            onClick={() => setApplyingJob(null)}
                                            className="rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform"
                                        >
                                            Back to Jobs
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
