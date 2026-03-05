"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Briefcase, Calendar, MessageSquare, Quote, Star, ArrowRight, CheckCircle2, MoreHorizontal } from 'lucide-react';

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'job',
            title: 'New Job Match!',
            desc: "Based on your skills in React and TypeScript, 'TechFlow Solutions' just posted a Frontend Lead role.",
            time: '10 mins ago',
            isNew: true,
            icon: Briefcase,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            id: 2,
            type: 'event',
            title: 'Event Reminder',
            desc: "The 'AI Agents Workshop' you registered for starts in 2 hours. Join the link to get early access.",
            time: '2 hours ago',
            isNew: true,
            icon: Calendar,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10'
        },
        {
            id: 3,
            type: 'comment',
            title: 'New Comment',
            desc: 'Sarah Chen replied to your discussion on Next.js Server Components.',
            time: '5 hours ago',
            isNew: false,
            icon: MessageSquare,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10'
        },
        {
            id: 4,
            type: 'reputation',
            title: 'Points Earned',
            desc: 'You earned 50 reputation points for helping a fellow developer in the forum!',
            time: 'Yesterday',
            isNew: false,
            icon: Star,
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        }
    ];

    return (
        <div className="bg-muted/10 min-h-screen pb-20">
            <div className="container mx-auto px-4 py-12 max-w-4xl">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black italic tracking-tighter">Notifications</h1>
                        <p className="text-muted-foreground font-medium">Stay updated with your career progress.</p>
                    </div>
                    <Button variant="outline" className="rounded-2xl font-bold border-muted-foreground/20 italic h-12 px-6">
                        Mark all as read <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* Categories */}
                <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'Jobs', 'Events', 'Community', 'System'].map((cat) => (
                        <Button key={cat} variant={cat === 'All' ? 'default' : 'secondary'} className="rounded-xl px-6 h-10 font-bold shadow-sm">
                            {cat}
                        </Button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <Card
                            key={notif.id}
                            className={`rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer ${notif.isNew ? 'bg-background ring-2 ring-primary/5' : 'bg-background/60'}`}
                        >
                            <CardContent className="p-8">
                                <div className="flex gap-6 items-start">
                                    <div className={`h-14 w-14 rounded-2xl ${notif.bg} flex items-center justify-center shrink-0 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                                        <notif.icon className={`h-7 w-7 ${notif.color}`} />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xl font-bold leading-none">{notif.title}</h4>
                                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{notif.time}</span>
                                        </div>
                                        <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">{notif.desc}</p>
                                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-muted/50">
                                            <div className="flex items-center gap-2">
                                                {notif.isNew && <Badge className="bg-primary rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter">New</Badge>}
                                                <span className="text-xs font-black uppercase text-primary tracking-tighter italic cursor-pointer">View Details</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State Mock */}
                {notifications.length === 0 && (
                    <div className="py-24 text-center space-y-6">
                        <div className="h-24 w-24 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
                            <Bell className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic">All caught up!</h3>
                            <p className="text-muted-foreground font-medium">New job alerts and updates will appear here.</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
