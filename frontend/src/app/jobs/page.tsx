"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, DollarSign, Filter, BookmarkPlus, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 text-center lg:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Find your next big opportunity</h1>
                    <p className="text-muted-foreground text-lg">Explore thousands of jobs and internships from top tech companies.</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <Card className="rounded-3xl border-none shadow-md overflow-hidden bg-background/60 backdrop-blur-md">
                            <CardHeader className="pb-4 border-b bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold">Filters</CardTitle>
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-primary font-bold px-2">Reset</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">Job Type</h4>
                                    <div className="space-y-2">
                                        {['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'].map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox id={type} />
                                                <label htmlFor={type} className="text-sm font-medium leading-none cursor-pointer">{type}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">Location Type</h4>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="rounded-xl bg-muted/50 border-none">
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none">
                                            <SelectItem value="all">All Locations</SelectItem>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="onsite">On-site</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">Salary Range</h4>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="rounded-xl bg-muted/50 border-none">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-none">
                                            <SelectItem value="all">Any Salary</SelectItem>
                                            <SelectItem value="entry">$50k - $80k</SelectItem>
                                            <SelectItem value="mid">$80k - $120k</SelectItem>
                                            <SelectItem value="senior">$120k - $200k+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                            <h4 className="font-bold mb-2">Get personalized jobs</h4>
                            <p className="text-xs text-primary-foreground/80 mb-4 font-medium leading-relaxed">Let companies find you. Complete your profile to get matched with the best roles.</p>
                            <Button variant="secondary" className="w-full rounded-xl font-bold" size="sm">Complete Profile</Button>
                        </div>
                    </aside>

                    {/* Main Job List */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Job title, keywords, or company..."
                                    className="pl-10 h-12 rounded-2xl bg-background/60 backdrop-blur-md border-none shadow-sm focus-visible:ring-primary shadow-inner"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button className="h-12 rounded-2xl px-8 shadow-lg shadow-primary/20 font-bold transition-transform hover:scale-[1.02]">
                                Search Jobs
                            </Button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {jobs.map((job: any) => (
                                    <Card key={job._id} className="group overflow-hidden rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-background/70 backdrop-blur-sm">
                                        <CardContent className="p-8">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                                <div className="flex gap-6 items-start">
                                                    <div className="h-16 w-16 rounded-[1.25rem] bg-muted/50 flex items-center justify-center flex-shrink-0 animate-pulse-subtle group-hover:bg-primary/10 transition-colors">
                                                        <Briefcase className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors mb-1">{job.title}</h3>
                                                        <p className="font-medium text-muted-foreground mb-3">{job.company}</p>
                                                        <div className="flex flex-wrap gap-4 text-sm font-medium">
                                                            <div className="flex items-center gap-1.5 text-muted-foreground/80 bg-muted/40 px-3 py-1 rounded-full">
                                                                <MapPin className="h-3.5 w-3.5" />
                                                                {job.location}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-muted-foreground/80 bg-muted/40 px-3 py-1 rounded-full">
                                                                <DollarSign className="h-3.5 w-3.5" />
                                                                {job.salary || 'Competitive'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 w-full md:w-auto">
                                                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl shrink-0 group-hover:border-primary/30 group-hover:text-primary transition-all">
                                                        <BookmarkPlus className="h-5 w-5" />
                                                    </Button>
                                                    <Button className="flex-1 md:flex-none h-12 px-8 rounded-2xl shadow-lg shadow-primary/10 font-bold transition-transform group-hover:scale-[1.05]">
                                                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-muted/50">
                                                <div className="flex flex-wrap gap-2">
                                                    {job.skillsRequired?.map((skill: string) => (
                                                        <Badge key={skill} variant="secondary" className="px-4 py-1.5 rounded-xl text-xs font-bold tracking-tight bg-muted/30 group-hover:bg-primary/5 group-hover:text-primary transition-colors border-none uppercase">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    );
}
