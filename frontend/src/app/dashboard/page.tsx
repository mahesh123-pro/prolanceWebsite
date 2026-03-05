"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MessageSquare, BookOpen, Settings, User, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function DashboardPage() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [jobsRes, eventsRes] = await Promise.all([
                    api.get('/jobs'),
                    api.get('/events')
                ]);

                if (jobsRes.data.success) setJobs(jobsRes.data.data.slice(0, 3));
                if (eventsRes.data.success) setEvents(eventsRes.data.data.slice(0, 2));
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const stats = [
        { title: 'Job Matches', value: jobs.length > 0 ? jobs.length : '12', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Events Joined', value: events.length > 0 ? events.length : '3', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { title: 'Posts Created', value: '5', icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { title: 'Points Earned', value: '150', icon: BookOpen, color: 'text-green-500', bg: 'bg-green-500/10' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <header className="mb-10 animate-in fade-in slide-in-from-left duration-500">
                <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, {user?.name || 'Explorer'}! 👋</h1>
                <p className="text-muted-foreground text-lg">Here's what's happening with your career development today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-md bg-background/50 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-tight">{stat.title}</p>
                                    <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                                </div>
                                <div className={`p-4 rounded-2xl ${stat.bg} group-hover:rotate-12 transition-transform`}>
                                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-background/40 backdrop-blur-md">
                        <CardHeader className="bg-primary/5 pb-8 p-8 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-black">Recommended Jobs</CardTitle>
                                <CardDescription className="text-base font-medium">Based on your skills and interests</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="rounded-xl font-bold text-primary" asChild>
                                <Link href="/jobs">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-muted/50">
                                {loading ? (
                                    <div className="p-12 text-center text-muted-foreground font-medium animate-pulse">Loading matches...</div>
                                ) : (
                                    (jobs.length > 0 ? jobs : [1, 2, 3]).map((job: any, index: number) => (
                                        <div key={job._id || index} className="p-8 flex items-start gap-6 hover:bg-muted/30 transition-all group">
                                            <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <Briefcase className="h-7 w-7 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-xl hover:text-primary transition-colors cursor-pointer group-hover:translate-x-1 duration-200">
                                                    {job.title || 'Frontend Developer'}
                                                </h4>
                                                <p className="font-bold text-muted-foreground mb-3">{job.company || 'TechFlow Solutions'} • {job.location || 'Bengaluru'}</p>
                                                <div className="flex gap-2">
                                                    {(job.skillsRequired || ['React', 'TypeScript']).map((skill: string) => (
                                                        <span key={skill} className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-secondary text-secondary-foreground">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors mt-2" />
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-background/40 backdrop-blur-md">
                        <CardHeader className="bg-orange-500/5 pb-8 p-8">
                            <CardTitle className="text-2xl font-black">Community Spotlight</CardTitle>
                            <CardDescription className="text-base font-medium tracking-tight">Trending in your network</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-5">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-6 p-6 rounded-[2rem] bg-muted/20 border border-muted/50 hover:bg-muted/30 transition-all cursor-pointer group">
                                    <div className="flex-1">
                                        <h4 className="font-black text-lg mb-2 group-hover:text-primary transition-colors tracking-tight">How to prepare for FAANG interviews as a student?</h4>
                                        <p className="text-sm font-medium text-muted-foreground line-clamp-2 mb-4 leading-relaxed">I'm currently in my 3rd year and wanted to know the exact roadmap for mastering Data Structures and Algorithms while...</p>
                                        <div className="flex items-center gap-6 text-xs font-black text-muted-foreground/60 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> 18</span>
                                            <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-orange-500" /> 42</span>
                                            <span>2h ago</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden bg-background/60 backdrop-blur-md border border-primary/5">
                        <CardHeader className="bg-primary/10 border-b-0 p-8">
                            <CardTitle className="text-xl font-black italic">Quick Navigation</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-4 rounded-2xl h-14 font-black border-muted-foreground/10 hover:bg-muted/50 hover:border-primary/20 transition-all group" asChild>
                                <Link href="/profile">
                                    <User className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                    My Identity
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-4 rounded-2xl h-14 font-black border-muted-foreground/10 hover:bg-muted/50 hover:border-primary/20 transition-all group" asChild>
                                <Link href="/settings">
                                    <Settings className="h-5 w-5 text-primary group-hover:rotate-90 transition-transform" />
                                    Account Orbit
                                </Link>
                            </Button>
                            <Button className="w-full justify-start gap-4 rounded-2xl h-14 font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
                                <Link href="/jobs">
                                    <Briefcase className="h-5 w-5" />
                                    Rocket to Jobs
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-background/60 backdrop-blur-md">
                        <CardHeader className="p-8">
                            <CardTitle className="text-xl font-black italic flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" /> Upcoming Orbit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 space-y-8">
                            {loading ? (
                                <div className="text-muted-foreground animate-pulse">Scanning events...</div>
                            ) : (
                                (events.length > 0 ? events : [1, 2]).map((event: any, index: number) => (
                                    <div key={event._id || index} className="flex gap-4 items-center group cursor-pointer">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center font-black group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <span className="text-[10px] uppercase">{event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : 'MAR'}</span>
                                            <span className="text-lg leading-none">{event.date ? new Date(event.date).getDate() : (15 + index * 7)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-black group-hover:text-primary transition-colors line-clamp-1">{event.title || 'Tech Meetup 2026'}</h5>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">{event.location || 'Online'} • {event.time || '10 AM'}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <Button variant="ghost" className="w-full rounded-xl font-black text-xs uppercase tracking-widest text-primary hover:bg-primary/5" asChild>
                                <Link href="/events">Explore All Events</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
