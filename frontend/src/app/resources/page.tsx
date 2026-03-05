"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, ExternalLink, Bookmark, Share2, Filter, Zap, Book, Shield, Code, Cpu } from 'lucide-react';
import Image from 'next/image';

const resources = [
    {
        id: 1,
        title: 'Modern React Roadmap 2026',
        description: 'A comprehensive guide to mastering React, Next.js, and the modern web ecosystem.',
        category: 'Web Dev',
        type: 'Roadmap',
        author: 'Prolance Guru',
        image: '/images/resources.png',
        link: '#',
        bookmarks: 1200
    },
    {
        id: 2,
        title: 'Cloud Architecture Essentials',
        description: 'Learn how to build scalable and resilient applications on AWS and Azure.',
        category: 'Cloud',
        type: 'Course',
        author: 'Cloud Experts',
        image: '/images/hero.png',
        link: '#',
        bookmarks: 850
    },
    {
        id: 3,
        title: 'Introduction to AI Agents',
        description: 'The definitive guide to building and deploying autonomous AI agents.',
        category: 'AI',
        type: 'Guide',
        author: 'AI Research Lab',
        image: '/images/community.png',
        link: '#',
        bookmarks: 2300
    },
    {
        id: 4,
        title: 'Cybersecurity Best Practices',
        description: 'Protect your applications from modern threats with these industry-standard practices.',
        category: 'Cybersecurity',
        type: 'Documentation',
        author: 'SecOps Team',
        image: '/images/jobs.png',
        link: '#',
        bookmarks: 640
    },
    {
        id: 5,
        title: 'DevOps Lifecycle Mastery',
        description: 'Master CI/CD, Infrastructure as Code, and monitoring for modern software.',
        category: 'DevOps',
        type: 'Roadmap',
        author: 'DevOps Hub',
        image: '/images/events.png',
        link: '#',
        bookmarks: 920
    }
];

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState('All');

    const categories = [
        { name: 'All', icon: Zap },
        { name: 'Web Dev', icon: Code },
        { name: 'Cloud', icon: Cpu },
        { name: 'AI', icon: Cpu },
        { name: 'DevOps', icon: Shield },
        { name: 'Cybersecurity', icon: Shield }
    ];

    const filteredResources = activeTab === 'All'
        ? resources
        : resources.filter(r => r.category === activeTab);

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-20 max-w-7xl">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 space-y-4">
                    <Badge variant="outline" className="px-4 py-1 rounded-full text-primary border-primary/20 bg-primary/5 font-bold uppercase tracking-widest text-[10px]">
                        Learning Lab
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
                        Scale your <span className="text-primary italic">knowledge</span> instantly.
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium max-w-xl">
                        Access curated roadmaps, deep-dive tutorials, and premium courses designed by industry veterans.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex gap-2 p-1.5 bg-muted/30 rounded-[1.25rem] border overflow-x-auto w-full md:w-auto">
                        {categories.map((cat) => (
                            <Button
                                key={cat.name}
                                variant={activeTab === cat.name ? 'default' : 'ghost'}
                                className={`rounded-xl h-10 px-5 font-bold gap-2 transition-all ${activeTab === cat.name ? 'shadow-md scale-105' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab(cat.name)}
                            >
                                <cat.icon className="h-4 w-4" />
                                {cat.name}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-[300px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search resources..."
                            className="h-12 pl-12 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary"
                        />
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="group flex flex-col rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-background">
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={resource.image}
                                    alt={resource.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                                <div className="absolute top-6 left-6">
                                    <Badge className="bg-background/90 text-foreground backdrop-blur-md px-3 py-1.5 rounded-xl border-none font-bold shadow-xl">
                                        {resource.type}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="p-8 pb-4 flex-1">
                                <Badge variant="outline" className="w-fit mb-4 rounded-lg px-2 text-[10px] font-black border-primary/20 text-primary uppercase">
                                    {resource.category}
                                </Badge>
                                <CardTitle className="text-2xl font-black leading-tight group-hover:text-primary transition-colors mb-2">
                                    {resource.title}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground font-medium text-sm leading-relaxed line-clamp-2">
                                    {resource.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-8 pb-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60">
                                    <Book className="h-4 w-4" />
                                    By {resource.author}
                                </div>
                            </CardContent>

                            <CardFooter className="p-8 pt-4 flex items-center justify-between border-t border-muted/50">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                    <Bookmark className="h-4 w-4 fill-primary/10 text-primary" />
                                    {resource.bookmarks.toLocaleString()} SAVES
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/5 hover:text-primary">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button className="rounded-xl h-10 px-5 font-bold shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform">
                                        Open <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Newsletter / CTA */}
                <section className="mt-24 p-12 lg:p-20 rounded-[3.5rem] bg-primary text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-black leading-tight italic">
                                Weekly curated <br />growth hacks.
                            </h2>
                            <p className="text-primary-foreground/80 text-lg font-medium">
                                Join 10,000+ developers getting the latest tech roadmaps and industry secrets delivered to their inbox.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Enter your email"
                                className="h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white text-lg px-6"
                            />
                            <Button className="h-14 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 text-lg font-black shadow-xl">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
