"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Mail, Globe, Github, Linkedin, Briefcase, GraduationCap, Award, PenLine, Plus, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useAuth();

    // Mock data for profile details until backend provides it
    const profileDetails = {
        bio: "Senior Frontend Engineer & Open Source Contributor. Passionate about building accessible, performant, and beautiful web experiences.",
        location: "Bengaluru, India",
        website: "https://sarah.dev",
        github: "sarahchen",
        linkedin: "sarahchen-dev",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Three.js", "Node.js"],
        experience: [
            {
                id: 1,
                title: "Senior Software Engineer",
                company: "InnovateTech",
                period: "2023 - Present",
                description: "Leading the development of the core design system and migrating legacy apps to Next.js."
            },
            {
                id: 2,
                title: "Frontend Developer",
                company: "CreativeFlow",
                period: "2021 - 2023",
                description: "Built high-performance marketing sites and interactive product dashboards."
            }
        ],
        education: [
            {
                id: 1,
                degree: "B.Tech in Computer Science",
                school: "IIT Bombay",
                period: "2017 - 2021",
                description: "Focused on human-computer interaction and web technologies."
            }
        ],
        certifications: [
            { id: 1, name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2024" },
            { id: 2, name: "Google Cloud Architect", issuer: "Google", date: "2023" }
        ]
    };

    return (
        <div className="bg-muted/10 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-6xl">

                {/* Profile Hero Card */}
                <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden mb-12 bg-background">
                    <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
                        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
                    </div>
                    <CardContent className="px-8 pb-12 relative">
                        <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 mb-8 px-4">
                            <Avatar className="h-40 w-40 rounded-[2.5rem] border-8 border-background shadow-xl">
                                <AvatarImage src={user?.profilePicture} alt={user?.name} className="object-cover" />
                                <AvatarFallback className="bg-primary/10 text-primary text-5xl font-black">{user?.name ? user.name[0] : 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 pb-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-4xl font-black tracking-tight mb-1">{user?.name || 'Pro User'}</h1>
                                        <p className="text-muted-foreground font-semibold flex items-center gap-2">
                                            Full Stack Developer • <span className="flex items-center gap-1 font-medium"><MapPin className="h-3.5 w-3.5" /> {profileDetails.location}</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="rounded-xl font-bold gap-2">
                                            Share Profile <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button className="rounded-xl font-bold gap-2 shadow-lg shadow-primary/10">
                                            Edit Profile <PenLine className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12 mt-12 px-4">
                            {/* Left Column - Info & Social */}
                            <div className="lg:col-span-1 space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-muted-foreground/60 flex items-center gap-2">
                                        <Plus className="h-4 w-4" /> Professional Bio
                                    </h3>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        {profileDetails.bio}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-muted-foreground/60">Social Links</h3>
                                    <div className="flex flex-col gap-3">
                                        <Link href="#" className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-colors group">
                                            <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center border shadow-sm group-hover:border-primary/30">
                                                <Linkedin className="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="font-bold text-sm">LinkedIn</span>
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-colors group">
                                            <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center border shadow-sm group-hover:border-primary/30">
                                                <Github className="h-5 w-5 text-foreground" />
                                            </div>
                                            <span className="font-bold text-sm">GitHub</span>
                                        </Link>
                                        <Link href="#" className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-colors group">
                                            <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center border shadow-sm group-hover:border-primary/30">
                                                <Globe className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <span className="font-bold text-sm">Portfolio</span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-muted-foreground/60">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profileDetails.skills.map(skill => (
                                            <Badge key={skill} className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-default">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Experience & Education */}
                            <div className="lg:col-span-2 space-y-12">
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-black italic flex items-center gap-3">
                                        <Briefcase className="h-6 w-6 text-primary" /> Experience
                                    </h3>
                                    <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-0 before:w-0.5 before:bg-muted/50">
                                        {profileDetails.experience.map(exp => (
                                            <div key={exp.id} className="relative pl-16 group">
                                                <div className="absolute left-0 top-0 h-12 w-12 rounded-2xl bg-background border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors bg-white z-10">
                                                    <Briefcase className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-xl font-bold">{exp.title}</h4>
                                                        <span className="text-sm font-black text-primary/60 uppercase tracking-tighter bg-primary/5 px-3 py-1 rounded-full">{exp.period}</span>
                                                    </div>
                                                    <p className="font-black text-sm uppercase text-muted-foreground tracking-tight">{exp.company}</p>
                                                    <p className="text-muted-foreground font-medium leading-relaxed">{exp.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-2xl font-black italic flex items-center gap-3">
                                        <GraduationCap className="h-6 w-6 text-primary" /> Education
                                    </h3>
                                    <div className="space-y-8">
                                        {profileDetails.education.map(edu => (
                                            <div key={edu.id} className="flex gap-6 p-6 rounded-3xl bg-muted/20 border border-transparent hover:border-primary/10 transition-all">
                                                <div className="h-14 w-14 rounded-2xl bg-background border flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    <GraduationCap className="h-7 w-7 text-primary/40" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-bold">{edu.degree}</h4>
                                                    <p className="font-bold text-primary italic text-sm">{edu.school} • {edu.period}</p>
                                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{edu.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black italic flex items-center gap-3">
                                        <Award className="h-6 w-6 text-primary" /> Certifications
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {profileDetails.certifications.map(cert => (
                                            <Card key={cert.id} className="rounded-2xl border-none shadow-sm bg-muted/20 p-5 flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <Award className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-sm leading-tight">{cert.name}</h5>
                                                    <p className="text-xs text-muted-foreground font-medium">{cert.issuer} • {cert.date}</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
