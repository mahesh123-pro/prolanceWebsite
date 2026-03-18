"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Share2, Search, Plus, Filter, TrendingUp, Hash, Clock, MoreHorizontal } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function CommunityPage() {
    const [activeCategory, setActiveCategory] = useState('All Discussions');
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        { name: 'All Discussions', icon: MessageSquare },
        { name: 'Web Development', icon: Hash },
        { name: 'AI / ML', icon: TrendingUp },
        { name: 'Cloud Computing', icon: Clock },
        { name: 'Startups', icon: Sparkles },
        { name: 'Career Advice', icon: Users },
    ];

    const mockPosts = [
        {
            _id: '1',
            user: { name: 'Sarah Chen', profilePicture: '', role: 'Senior Dev' },
            title: 'How do you structure mid-sized Next.js apps in 2026?',
            content: "I've been looking at the latest patterns for server components and shared actions. I'm curious how everyone is handling state management between deep tree components now that...",
            category: 'Web Development',
            likes: [],
            comments: [],
            createdAt: new Date().toISOString()
        }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts');
                if (res.data.success && res.data.data.length > 0) {
                    setPosts(res.data.data);
                } else {
                    setPosts(mockPosts);
                }
            } catch (err) {
                console.error(err);
                setPosts(mockPosts);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="bg-muted/10 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                
                {/* Header & What you get */}
                <div className="mb-16">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-center lg:text-left">The Developer Community</h1>
                    <p className="text-muted-foreground text-lg mb-12 text-center lg:text-left">Ask questions, share breakthroughs, and join a vibrant network of builders.</p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <MessageSquare className="h-6 w-6 text-primary" />,
                                title: "Instant Feedback",
                                desc: "Get your code reviewed, debug architecture blockages, and gather opinions from Senior Engineers in minutes."
                            },
                            {
                                icon: <ThumbsUp className="h-6 w-6 text-primary" />,
                                title: "Reputation Building",
                                desc: "Earn upvotes for high-quality answers. Build a permanent public track record of your expertise and helpfulness."
                            },
                            {
                                icon: <TrendingUp className="h-6 w-6 text-primary" />,
                                title: "Trending Insights",
                                desc: "Stay ahead of the curve. Discover which frameworks, libraries, and design patterns are actually being adopted in production."
                            }
                        ].map((benefit, idx) => (
                            <div key={idx} className="p-6 rounded-3xl border border-border/50 bg-background/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-muted-foreground font-medium text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-10">

                    {/* Sidebar - Navigation */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-black px-4 uppercase tracking-tighter text-muted-foreground/60">Community</h2>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <Button
                                        key={cat.name}
                                        variant={activeCategory === cat.name ? 'secondary' : 'ghost'}
                                        className={`w-full justify-start rounded-2xl h-12 px-4 gap-3 font-bold transition-all ${activeCategory === cat.name ? 'bg-primary/10 text-primary shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}
                                        onClick={() => setActiveCategory(cat.name)}
                                    >
                                        <cat.icon className={`h-5 w-5 ${activeCategory === cat.name ? 'text-primary' : 'text-muted-foreground/60'}`} />
                                        {cat.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Card className="rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8">
                            <h3 className="text-2xl font-black mb-3">Share Your Insight</h3>
                            <p className="text-primary-foreground/80 font-medium text-sm mb-6 leading-relaxed">Have a question or a breakthrough? Join the discussion today.</p>
                            <Button variant="secondary" className="w-full rounded-xl h-12 font-bold shadow-lg">New Discussion <Plus className="ml-2 h-4 w-4" /></Button>
                        </Card>
                    </aside>

                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Search Header */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search discussions, ideas, or updates..."
                                className="h-16 pl-12 pr-6 rounded-[1.5rem] border-none bg-background shadow-lg shadow-black/5 focus-visible:ring-primary text-lg font-medium"
                            />
                            <Button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 rounded-xl font-bold shadow-md">Search</Button>
                        </div>

                        {/* Posts */}
                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post: any) => (
                                    <Card key={post._id} className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-background overflow-hidden border border-transparent hover:border-primary/10">
                                        <CardHeader className="p-8 pb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                                                        <AvatarImage src={post.user?.profilePicture} alt={post.user?.name} />
                                                        <AvatarFallback className="bg-primary/10 text-primary font-black">{post.user?.name ? post.user.name[0] : 'P'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-bold text-sm leading-none">{post.user?.name || 'Anonymous'}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1">{post.user?.role || 'Member'} • {new Date(post.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="rounded-full px-3 py-1 font-bold text-[10px] text-muted-foreground border-muted-foreground/20 uppercase">{post.category}</Badge>
                                            </div>
                                            <CardTitle className="text-2xl font-black tracking-tight leading-tight hover:text-primary transition-colors cursor-pointer">{post.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-8 pt-0">
                                            <p className="text-muted-foreground leading-relaxed font-medium mb-6 line-clamp-3">{post.content}</p>
                                            <div className="flex items-center gap-6 pt-6 border-t border-muted/50">
                                                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm group">
                                                    <ThumbsUp className="h-5 w-5 group-active:scale-125 transition-transform" /> {post.likes?.length || 0}
                                                </button>
                                                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm group">
                                                    <MessageSquare className="h-5 w-5" /> {post.comments?.length || 0}
                                                </button>
                                                <button className="ml-auto text-muted-foreground hover:text-primary transition-colors">
                                                    <Share2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Trending */}
                    <aside className="lg:col-span-1 space-y-8 hidden lg:block">
                        <Card className="rounded-[2rem] border-none shadow-lg bg-background p-8">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-lg font-black flex items-center gap-2 italic">
                                    <TrendingUp className="h-5 w-5 text-primary" /> Trending Tags
                                </CardTitle>
                            </CardHeader>
                            <div className="flex flex-wrap gap-2">
                                {['react', 'ai-agents', 'career-growth', 'web3', 'rust', 'product-design'].map(tag => (
                                    <Badge key={tag} className="bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-4 py-2 rounded-xl transition-all cursor-pointer font-bold lowercase border-none">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </Card>

                        <Card className="rounded-[2rem] border-none shadow-lg bg-background p-8">
                            <CardHeader className="p-0 mb-6">
                                <CardTitle className="text-lg font-black flex items-center gap-2 italic">
                                    <Users className="h-5 w-5 text-primary" /> Top Contributors
                                </CardTitle>
                            </CardHeader>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-muted border border-muted-foreground/10" />
                                            <div>
                                                <p className="text-sm font-bold">User_{i}42</p>
                                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter text-primary">Master Mentor</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6 rounded-xl font-bold border-muted-foreground/20 italic">View All Leaderboard</Button>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
    );
}

function Users({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
