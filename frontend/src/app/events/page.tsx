"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, MapPin, Search, Plus, Users, Video, 
  Trophy, Sparkles, X, CheckCircle2, Loader2, Link as LinkIcon
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from 'next/image';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Reveal } from "@/components/motion/Reveal";
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // State for RSVP Flow
    const [rsvpingEvent, setRsvpingEvent] = useState<any | null>(null);
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpEmail, setRsvpEmail] = useState('');
    const [rsvpInterest, setRsvpInterest] = useState('developer');
    const [isRsvping, setIsRsvping] = useState(false);
    const [rsvpSuccess, setRsvpSuccess] = useState(false);

    // State for Creating Event
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newOrganizer, setNewOrganizer] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newType, setNewType] = useState('Workshop');
    const [newPrice, setNewPrice] = useState('Free');
    const [newTags, setNewTags] = useState('');
    const [newBanner, setNewBanner] = useState('/images/events.png');
    const [isCreating, setIsCreating] = useState(false);

    const mockEvents = [
        {
            _id: '1',
            title: 'Global Tech Summit 2026',
            organizer: 'TechConnect',
            date: '2026-03-15',
            time: '10:00 AM',
            location: 'Online',
            type: 'Workshop',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
            attendees: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            price: 'Free',
            tags: ['AI', 'Future Tech'],
            hasRsvped: false
        },
        {
            _id: '2',
            title: 'DevScale Hackathon 2026',
            organizer: 'DevScale Community',
            date: '2026-04-02',
            time: '09:00 AM',
            location: 'New York, NY',
            type: 'Hackathon',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
            attendees: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            price: '$10',
            tags: ['Open Source', 'Frontend'],
            hasRsvped: false
        },
        {
            _id: '3',
            title: 'UI/UX Interactive Workshop',
            organizer: 'Prolance Design Hub',
            date: '2026-05-18',
            time: '02:00 PM',
            location: 'Online / Figma Live',
            type: 'Workshop',
            image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
            attendees: [1, 2, 3, 4, 5, 6, 7, 8],
            price: 'Free',
            tags: ['Figma', 'UI/UX'],
            hasRsvped: false
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

    // Tab categories
    const categories = ['All', 'Workshops', 'Hackathons', 'Meetups', 'Tech Talks'];

    // Handle RSVP Action
    const handleRsvpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rsvpName || !rsvpEmail) {
            toast.error("Please fill in your details!");
            return;
        }

        setIsRsvping(true);

        setTimeout(() => {
            // Update the state locally to show registered
            setEvents(prev => prev.map(evt => {
                if (evt._id === rsvpingEvent._id) {
                    return {
                        ...evt,
                        attendees: [...(evt.attendees || []), Date.now()],
                        hasRsvped: true
                    };
                }
                return evt;
            }));
            setIsRsvping(false);
            setRsvpSuccess(true);
            toast.success("RSVP registration successful!");
        }, 1500);
    };

    // Handle Event Creation
    const handleCreateEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newOrganizer || !newDate || !newTime || !newLocation) {
            toast.error("Please fill in all required fields!");
            return;
        }

        setIsCreating(true);

        setTimeout(() => {
            const formattedTags = newTags 
                ? newTags.split(',').map(tag => tag.trim()) 
                : ['General'];

            const createdEvent = {
                _id: String(Date.now()),
                title: newTitle,
                organizer: newOrganizer,
                date: newDate,
                time: newTime,
                location: newLocation,
                type: newType,
                image: newBanner,
                attendees: [1, 2, 3], // start with 3 mock people
                price: newPrice === 'Free' ? 'Free' : `$${newPrice}`,
                tags: formattedTags,
                hasRsvped: false
            };

            setEvents(prev => [createdEvent, ...prev]);
            
            // Clean fields
            setNewTitle('');
            setNewOrganizer('');
            setNewDate('');
            setNewTime('');
            setNewLocation('');
            setNewTags('');
            setNewType('Workshop');
            setNewPrice('Free');
            
            setIsCreating(false);
            setShowCreateModal(false);
            toast.success("Event posted successfully!");
        }, 1500);
    };

    // Filter events
    const filteredEvents = events.filter(evt => {
        const matchesCategory = activeTab === 'all' || evt.type.toLowerCase() === activeTab.replace('s', '').toLowerCase() || 
            (activeTab === 'tech talks' && evt.type.toLowerCase() === 'tech talk');
        
        const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            evt.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const bannerPresets = [
        { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', label: 'Tech Summit Blue' },
        { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', label: 'Hackathon Cyber' },
        { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', label: 'UI/UX Orange' },
        { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', label: 'Meetup Network' }
    ];

    return (
        <div className="bg-background min-h-screen pb-16">
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
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                            <Button 
                                onClick={() => setShowCreateModal(true)}
                                className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                            >
                                Post an Event <Plus className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" className="h-14 px-10 rounded-2xl text-lg font-bold border-muted-foreground/20 hover:bg-muted group">
                                My Calendar <Calendar className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                            </Button>
                        </div>
                    </div>
                    <div className="hidden lg:block relative w-[400px] aspect-square rounded-[2.5rem] overflow-hidden border-8 border-background shadow-2xl transition-transform duration-700 group-hover:scale-[1.03] group-hover:-rotate-2">
                        <Image src="/images/events.png" fill className="object-cover" alt="Event preview" priority />
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
                                className={`rounded-xl h-10 px-6 font-bold shadow-sm transition-all ${activeTab === cat.toLowerCase() ? 'scale-105 bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/60'}`}
                                onClick={() => setActiveTab(cat.toLowerCase())}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-[350px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search events, tags, organizer..."
                            className="h-14 pl-12 rounded-2xl border-none bg-muted/40 font-medium focus-visible:ring-primary shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </Reveal>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <Loader2 className="animate-spin h-10 w-10 text-primary" />
                        <p className="text-muted-foreground font-semibold text-sm">Vetting community events...</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredEvents.map((event: any, idx: number) => {
                                const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                });

                                return (
                                    <motion.div 
                                        key={event._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Card className="group relative rounded-[2.5rem] overflow-hidden border border-border/40 shadow-sm hover:shadow-2xl transition-all duration-500 bg-background/50 hover:bg-background h-full flex flex-col justify-between">
                                            <div>
                                                <div className="relative h-64 overflow-hidden">
                                                    <img
                                                        src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                                                        alt={event.title}
                                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
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
                                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                                                </div>

                                                <CardHeader className="p-8 pb-0">
                                                    <div className="flex items-center gap-2 text-primary text-sm font-bold mb-3">
                                                        <Calendar className="h-4 w-4" />
                                                        {formattedDate} • {event.time}
                                                    </div>
                                                    <CardTitle className="text-2xl font-black mb-2 leading-tight group-hover:text-primary transition-colors">
                                                        {event.title}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm mb-1">
                                                        <span>Organizer: <span className="text-foreground">{event.organizer}</span></span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                                                        <MapPin className="h-4 w-4 text-primary/60" />
                                                        {event.location}
                                                    </div>
                                                </CardHeader>
                                            </div>

                                            <CardContent className="p-8 pt-6">
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {event.tags?.map((tag: string) => (
                                                        <Badge key={tag} variant="secondary" className="bg-muted/50 rounded-lg px-2.5 py-1 text-xs font-bold border-none uppercase tracking-tighter">#{tag}</Badge>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between border-t border-muted pt-6 mt-auto">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden flex items-center justify-center">
                                                                <Users className="h-4.5 w-4.5 text-muted-foreground" />
                                                            </div>
                                                        ))}
                                                        <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary animate-pulse">
                                                            +{event.attendees?.length || 0}
                                                        </div>
                                                    </div>
                                                    <Button 
                                                        disabled={event.hasRsvped}
                                                        onClick={() => {
                                                            setRsvpingEvent(event);
                                                            setRsvpSuccess(false);
                                                            setRsvpName('');
                                                            setRsvpEmail('');
                                                        }}
                                                        className={`rounded-xl h-11 px-6 font-bold shadow-lg transition-transform ${event.hasRsvped ? 'bg-emerald-500 hover:bg-emerald-500 text-white cursor-default scale-100 shadow-none' : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/10'}`}
                                                    >
                                                        {event.hasRsvped ? (
                                                            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4.5 w-4.5" /> RSVP'd</span>
                                                        ) : "Register Now"}
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* RSVP Modal Flow */}
            <Dialog open={rsvpingEvent !== null} onOpenChange={(open) => { if (!open) setRsvpingEvent(null); }}>
                <DialogContent className="max-w-md rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                        
                        <div className="p-8 pb-5 border-b border-border/40 relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setRsvpingEvent(null)}
                                className="absolute right-6 top-6 h-8 w-8 rounded-full hover:bg-muted"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            
                            <DialogHeader className="text-left">
                                <DialogTitle className="text-2xl font-black flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    Reserve Your Spot
                                </DialogTitle>
                                <DialogDescription className="text-sm font-semibold text-muted-foreground/80 mt-1">
                                    Event: <span className="text-foreground font-bold">{rsvpingEvent?.title}</span>
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {!rsvpSuccess ? (
                                    <motion.form 
                                        key="rsvp-form"
                                        onSubmit={handleRsvpSubmit}
                                        className="space-y-5"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</label>
                                            <Input
                                                required
                                                placeholder="e.g. Mahesh Kumar"
                                                className="rounded-xl h-11 bg-muted/30 border-border/60"
                                                value={rsvpName}
                                                onChange={(e) => setRsvpName(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                            <Input
                                                required
                                                type="email"
                                                placeholder="e.g. mahesh@prolance.dev"
                                                className="rounded-xl h-11 bg-muted/30 border-border/60"
                                                value={rsvpEmail}
                                                onChange={(e) => setRsvpEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">I am attending as a...</label>
                                            <Select value={rsvpInterest} onValueChange={setRsvpInterest}>
                                                <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/60">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl border border-border/40">
                                                    <SelectItem value="developer">Student / Developer</SelectItem>
                                                    <SelectItem value="founder">Startup Founder / Co-Founder</SelectItem>
                                                    <SelectItem value="recruiter">Recruiter / Employer</SelectItem>
                                                    <SelectItem value="mentor">Technical Mentor / Guest</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="pt-4 border-t flex justify-end">
                                            <Button 
                                                type="submit"
                                                disabled={isRsvping}
                                                className="rounded-xl px-8 h-11 font-bold bg-primary text-primary-foreground flex items-center gap-1.5"
                                            >
                                                {isRsvping ? (
                                                    <>
                                                        <Loader2 className="animate-spin h-4 w-4" />
                                                        Reserving...
                                                    </>
                                                ) : "Confirm RSVP"}
                                            </Button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="rsvp-success"
                                        className="text-center py-6 space-y-6"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                                            <CheckCircle2 className="h-9 w-9" />
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-extrabold text-foreground">RSVP Confirmed!</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                                Fantastic, <span className="font-bold text-foreground">{rsvpName}</span>! An calendar invitation and event entry token has been dispatched to <span className="font-bold text-foreground">{rsvpEmail}</span>.
                                            </p>
                                        </div>
                                        <Button 
                                            onClick={() => setRsvpingEvent(null)}
                                            className="rounded-xl px-8 font-bold bg-primary text-primary-foreground"
                                        >
                                            Done
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Create Event Modal */}
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogContent className="max-w-xl rounded-3xl border border-border/50 bg-background/95 backdrop-blur-xl p-0 overflow-hidden shadow-2xl">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                        
                        <div className="p-8 pb-5 border-b border-border/40 relative">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setShowCreateModal(false)}
                                className="absolute right-6 top-6 h-8 w-8 rounded-full hover:bg-muted"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            
                            <DialogHeader className="text-left">
                                <DialogTitle className="text-2xl font-black flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    Post a New Event
                                </DialogTitle>
                                <DialogDescription className="text-sm font-medium text-muted-foreground/80 mt-1">
                                    Broadcast your workshop, hackathon, or talk to the community.
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <form onSubmit={handleCreateEventSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Title *</label>
                                    <Input
                                        required
                                        placeholder="e.g. Zero to Production with Next.js"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Organizer Name *</label>
                                    <Input
                                        required
                                        placeholder="e.g. Mahesh Hub"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newOrganizer}
                                        onChange={(e) => setNewOrganizer(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Event Type</label>
                                    <Select value={newType} onValueChange={setNewType}>
                                        <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/60">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl border border-border/40">
                                            <SelectItem value="Workshop">Workshop</SelectItem>
                                            <SelectItem value="Hackathon">Hackathon</SelectItem>
                                            <SelectItem value="Meetup">Meetup</SelectItem>
                                            <SelectItem value="Tech Talk">Tech Talk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date *</label>
                                    <Input
                                        required
                                        type="date"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newDate}
                                        onChange={(e) => setNewDate(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time *</label>
                                    <Input
                                        required
                                        placeholder="e.g. 05:00 PM"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newTime}
                                        onChange={(e) => setNewTime(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location / Platform Link *</label>
                                    <Input
                                        required
                                        placeholder="e.g. Online (Zoom Link) or New York, NY"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</label>
                                    <Select value={newPrice} onValueChange={setNewPrice}>
                                        <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/60">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl border border-border/40">
                                            <SelectItem value="Free">Free</SelectItem>
                                            <SelectItem value="5">$5.00</SelectItem>
                                            <SelectItem value="10">$10.00</SelectItem>
                                            <SelectItem value="25">$25.00</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1.5 col-span-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tags (comma-separated)</label>
                                    <Input
                                        placeholder="e.g. Next.js, Vercel"
                                        className="rounded-xl h-11 bg-muted/30 border-border/60"
                                        value={newTags}
                                        onChange={(e) => setNewTags(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Banner Style Preset</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {bannerPresets.map((preset) => (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => setNewBanner(preset.url)}
                                                className={`relative h-12 rounded-xl overflow-hidden border-2 transition-all ${newBanner === preset.url ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-border/60 hover:border-primary/50'}`}
                                            >
                                                <img src={preset.url} alt={preset.label} className="object-cover w-full h-full" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t flex justify-end gap-3">
                                <Button 
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowCreateModal(false)}
                                    className="rounded-xl font-bold hover:bg-muted"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit"
                                    disabled={isCreating}
                                    className="rounded-xl px-8 h-11 font-bold bg-primary text-primary-foreground flex items-center gap-1.5"
                                >
                                    {isCreating ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 w-4" />
                                            Publishing...
                                        </>
                                    ) : "Publish Event"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
