"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const { user } = useAuth();
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            toast.success("Settings updated successfully!");
            setSaving(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <header className="mb-10">
                <h1 className="text-4xl font-black tracking-tight mb-2">Settings</h1>
                <p className="text-muted-foreground text-lg italic">Tailor your Prolance experience to your workflow.</p>
            </header>

            <Tabs defaultValue="account" className="space-y-8">
                <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                    <TabsList className="bg-muted/40 p-1.5 rounded-2xl border h-14 w-full md:w-auto justify-start">
                        <TabsTrigger value="account" className="rounded-xl px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <User className="h-4 w-4 mr-2" /> Account
                        </TabsTrigger>
                        <TabsTrigger value="security" className="rounded-xl px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Lock className="h-4 w-4 mr-2" /> Security
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="rounded-xl px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Bell className="h-4 w-4 mr-2" /> Notifications
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="rounded-xl px-6 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Palette className="h-4 w-4 mr-2" /> Appearance
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="account" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-background/50 backdrop-blur-md p-6">
                        <CardHeader className="p-4 pt-0">
                            <CardTitle className="text-2xl font-black">Personal Information</CardTitle>
                            <CardDescription className="text-base">Update your public profile and email address.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                                    <Input id="name" defaultValue={user?.name} className="h-12 rounded-xl bg-muted/30 border-none font-medium text-base focus-visible:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                                    <Input id="email" defaultValue={user?.email} className="h-12 rounded-xl bg-muted/30 border-none font-medium text-base focus-visible:ring-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Bio</Label>
                                <textarea
                                    id="bio"
                                    className="w-full min-h-[120px] rounded-2xl bg-muted/30 border-none p-4 font-medium text-base focus:ring-2 focus:ring-primary outline-none transition-all"
                                    placeholder="Tell the world what you do..."
                                />
                            </div>
                            <div className="pt-4">
                                <Button onClick={handleSave} disabled={saving} className="h-12 px-8 rounded-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                    {saving ? 'Syncing...' : 'Save Changes'} <Save className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-background/50 backdrop-blur-md p-6">
                        <CardHeader className="p-4 pt-0">
                            <CardTitle className="text-2xl font-black">Authentication & Access</CardTitle>
                            <CardDescription className="text-base">Manage your password and security protocols.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Current Password</Label>
                                    <Input id="current" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">New Password</Label>
                                    <Input id="new" type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/30 border-none focus-visible:ring-primary" />
                                </div>
                            </div>

                            <div className="border-t border-muted pt-8">
                                <div className="flex items-center justify-between group">
                                    <div className="flex gap-4 items-center">
                                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Two-Factor Authentication</h4>
                                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                        </div>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-background/50 backdrop-blur-md p-6">
                        <CardHeader className="p-4 pt-0">
                            <CardTitle className="text-2xl font-black">Notification Preferences</CardTitle>
                            <CardDescription className="text-base">Choose when and how you want to be alerted.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-10 pt-4">
                            <div className="space-y-6">
                                {[
                                    { title: 'Job Suggestions', desc: 'Alerts when a new job matches your skills.' },
                                    { title: 'Community Mentions', desc: 'When someone tags you in a discussion.' },
                                    { title: 'Event Reminders', desc: 'Be notified 24h before your registered events.' },
                                    { title: 'Marketing Emails', desc: 'Updates on new features and global summits.' }
                                ].map((pref, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="max-w-[80%]">
                                            <h4 className="font-bold text-lg mb-1">{pref.title}</h4>
                                            <p className="text-sm text-muted-foreground font-medium">{pref.desc}</p>
                                        </div>
                                        <Switch defaultChecked={i < 2} className="data-[state=checked]:bg-primary" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-background/50 backdrop-blur-md p-6">
                        <CardHeader className="p-4 pt-0">
                            <CardTitle className="text-2xl font-black">Visual Experience</CardTitle>
                            <CardDescription className="text-base">Customize the look and feel of the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="p-6 rounded-[2rem] border-2 border-primary/20 bg-background flex items-center justify-between group cursor-pointer hover:bg-muted/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <Globe className="h-6 w-6 text-primary" />
                                        <span className="font-bold text-lg">System Theme</span>
                                    </div>
                                    <div className="h-4 w-4 rounded-full bg-primary" />
                                </div>
                                <div className="p-6 rounded-[2rem] border-2 border-transparent bg-muted/40 flex items-center justify-between group cursor-pointer hover:bg-muted/60 transition-all">
                                    <div className="flex items-center gap-4">
                                        <Palette className="h-6 w-6 text-muted-foreground" />
                                        <span className="font-bold text-lg">High Contrast</span>
                                    </div>
                                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
