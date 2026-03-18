"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Search, Plus, Filter, Users, Video, Trophy, Sparkles } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Reveal } from "@/components/motion/Reveal";

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const mockEvents = [
        {
            _id: '1',
            title: 'Global Tech Summit 2026',
            organizer: 'TechConnect',
            date: 'March 15, 2026',
            time: '10:00 AM',
            location: 'Online',
            type: 'Workshop',
            image: '/images/events.png',
            attendees: [1, 2, 3],
            price: 'Free',
            tags: ['AI', 'Future Tech']
        },
        {
            _id: '2',
            title: 'DevScale Hackathon 2026',
            organizer: 'DevScale Community',
            date: 'April 02, 2026',
            time: '09:00 AM',
            location: 'New York, NY',
            type: 'Hackathon',
            image: '/images/hero.png',
            attendees: [1, 2, 3, 4, 5],
            price: '$10',
            tags: ['Open Source', 'Frontend']
        }
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                if (res.data.success && res.data.data.length > 0) {
                    setEvents(res.data.data);
                } else {
                    setEvents(mockEvents);
                }
            } catch (err) {
                console.error(err);
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const categories = ['All', 'Workshops', 'Hackathons', 'Meetups', 'Tech Talks'];

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                {/* Hero Section */}
                <Reveal className="relative rounded-[3rem] overflow-hidden mb-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-12 lg:p-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12 group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
                    <div className="flex-1 space-y-6 relative z-10">
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                            Next-Gen Experiences
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tighter">
                            Discover <span className="text-primary italic">Incredible</span> Tech Events
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-xl font-medium leading-relaxed">
                            Join workshops, hackathons, and global summits to amplify your skills and network with the world&apos;s best.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Button className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                Post an Event <Plus className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" className="h-14 px-10 rounded-2xl text-lg font-bold border-muted-foreground/20 hover:bg-muted group">
                                My Calendar <Calendar className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                            </Button>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-[400px] aspect-square rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl transition-transform duration-700 group-hover:scale-[1.03] group-hover:-rotate-2">
                        <Image src="/images/events.png" fill className="object-cover" alt="Event preview" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    </div>
                </Reveal>

                {/* What you get by joining section */}
                <div className="grid md:grid-cols-3 gap-6 mb-16 px-2">
                    {[
                        {
                            icon: <Users className="h-6 w-6 text-primary" />,
                            title: "Elite Networking",
                            desc: "Connect face-to-face with industry leaders and fellow builders. Find your next co-founder or technical mentor instantly."
                        },
                        {
                            icon: <Video className="h-6 w-6 text-primary" />,
                            title: "Exclusive Workshops",
                            desc: "Learn new frameworks directly from the creators. Get hands-on code experience you simply won't find in a tutorial."
                        },
                        {
                            icon: <Trophy className="h-6 w-6 text-primary" />,
                            title: "Hackathon Prizes",
                            desc: "Skip the generic HR queue. Win cash prizes, free deployment credits, and fast-track interviews by shipping cool projects."
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

                {/* Filter Section */}
                <Reveal className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex gap-2 p-2 bg-muted/40 rounded-[1.5rem] border overflow-x-auto w-full md:w-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeTab === cat.toLowerCase() ? 'default' : 'ghost'}
                                className={`rounded-xl h-10 px-6 font-bold shadow-sm transition-all ${activeTab === cat.toLowerCase() ? 'scale-105' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab(cat.toLowerCase())}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-[350px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search events near you..."
                            className="h-14 pl-12 rounded-2xl border-none bg-muted/40 font-medium focus-visible:ring-primary shadow-inner"
                        />
                    </div>
                </Reveal>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {events.map((event: any, idx: number) => (
                            <Reveal key={event._id} delay={Math.min(idx * 0.05, 0.25)}>
                                <Card className="group relative rounded-[2.5rem] overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-background/50 hover:bg-background">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={event.image || '/images/events.png'}
                                            alt={event.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <Badge className="bg-background/90 text-foreground backdrop-blur-md rounded-xl px-3 py-1.5 border-none font-bold shadow-lg">
                                                {event.type}
                                            </Badge>
                                            {(event.price === 'Free' || !event.price) && (
                                                <Badge className="bg-primary text-primary-foreground rounded-xl px-3 py-1.5 border-none font-bold shadow-lg">
                                                    FREE
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                                    </div>

                                    <CardHeader className="p-8 pb-0">
                                        <div className="flex items-center gap-2 text-primary text-sm font-bold mb-3">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(event.date).toLocaleDateString()} • {event.time}
                                        </div>
                                        <CardTitle className="text-2xl font-black mb-2 leading-tight group-hover:text-primary transition-colors">
                                            {event.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                                            <MapPin className="h-4 w-4 text-primary/60" />
                                            {event.location}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="p-8 pt-6">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {event.tags?.map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="bg-muted/50 rounded-lg px-2.5 py-1 text-xs font-bold border-none uppercase tracking-tighter">#{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between border-t border-muted pt-6">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                                                        <Users className="h-full w-full p-2 text-muted-foreground" />
                                                    </div>
                                                ))}
                                                <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">
                                                    +{event.attendees?.length || 0}
                                                </div>
                                            </div>
                                            <Button className="rounded-xl h-11 px-6 font-bold shadow-lg shadow-primary/10 transition-transform group-hover:scale-105 active:scale-95">
                                                Register Now
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Reveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
