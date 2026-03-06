"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, Globe, Github, Linkedin, Twitter, Lock, ShieldCheck, Heart, Camera, Save, X, Plus, Info } from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user, loading: authLoading, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        username: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        bio: '',
        headline: '',
        locationDetails: {
            country: '',
            state: '',
            city: '',
            postalCode: '',
            address: '',
        },
        skills: [],
        currentRole: '',
        yearsOfExperience: 0,
        portfolioWebsite: '',
        socialLinks: {
            linkedin: '',
            github: '',
            twitter: '',
            website: '',
        },
        workPreferences: {
            availableForWork: false,
            workType: [],
            hourlyRate: 0,
        },
        recoveryEmail: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
                gender: user.gender || '',
                bio: user.bio || '',
                headline: user.headline || '',
                locationDetails: {
                    country: user.locationDetails?.country || '',
                    state: user.locationDetails?.state || '',
                    city: user.locationDetails?.city || '',
                    postalCode: user.locationDetails?.postalCode || '',
                    address: user.locationDetails?.address || '',
                },
                skills: user.skills || [],
                currentRole: user.currentRole || '',
                yearsOfExperience: user.yearsOfExperience || 0,
                portfolioWebsite: user.portfolioWebsite || '',
                socialLinks: {
                    linkedin: user.socialLinks?.linkedin || '',
                    github: user.socialLinks?.github || '',
                    twitter: user.socialLinks?.twitter || '',
                    website: user.socialLinks?.website || '',
                },
                workPreferences: {
                    availableForWork: user.workPreferences?.availableForWork || false,
                    workType: user.workPreferences?.workType || [],
                    hourlyRate: user.workPreferences?.hourlyRate || 0,
                },
                recoveryEmail: user.recoveryEmail || '',
            });
        }
    }, [user]);

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        const numberFields = ['yearsOfExperience', 'workPreferences.hourlyRate'];
        const parsedValue = numberFields.includes(id) ? (value === '' ? 0 : Number(value)) : value;

        if (id.includes('.')) {
            const [parent, child] = id.split('.');
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: parsedValue }
            });
        } else {
            setFormData({ ...formData, [id]: parsedValue });
        }
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData({
            ...formData,
            workPreferences: { ...formData.workPreferences, availableForWork: checked }
        });
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.put('/auth/updateprofile', formData);
            if (res.data.success) {
                // Refresh in-memory user state with the newly saved data
                updateUser(res.data.data);
                toast.success('Profile updated successfully!');
            } else {
                toast.error('Failed to update profile. Please try again.');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
                gender: user.gender || '',
                bio: user.bio || '',
                headline: user.headline || '',
                locationDetails: {
                    country: user.locationDetails?.country || '',
                    state: user.locationDetails?.state || '',
                    city: user.locationDetails?.city || '',
                    postalCode: user.locationDetails?.postalCode || '',
                    address: user.locationDetails?.address || '',
                },
                skills: user.skills || [],
                currentRole: user.currentRole || '',
                yearsOfExperience: user.yearsOfExperience || 0,
                portfolioWebsite: user.portfolioWebsite || '',
                socialLinks: {
                    linkedin: user.socialLinks?.linkedin || '',
                    github: user.socialLinks?.github || '',
                    twitter: user.socialLinks?.twitter || '',
                    website: user.socialLinks?.website || '',
                },
                workPreferences: {
                    availableForWork: user.workPreferences?.availableForWork || false,
                    workType: user.workPreferences?.workType || [],
                    hourlyRate: user.workPreferences?.hourlyRate || 0,
                },
                recoveryEmail: user.recoveryEmail || '',
            });
            toast.success('Changes discarded.');
        }
    };

    if (authLoading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

    return (
        <div className="bg-muted/30 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header with quick stats */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-28 w-28 rounded-[2rem] border-4 border-background shadow-xl ring-2 ring-primary/5 transition-transform group-hover:scale-105">
                                <AvatarImage src={user?.profilePicture} className="object-cover" />
                                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-black">{formData.name ? formData.name[0] : 'P'}</AvatarFallback>
                            </Avatar>
                            <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full shadow-lg border-2 border-background">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">{formData.name || 'Set your name'}</h1>
                            <p className="text-muted-foreground font-medium">@{formData.username || 'username'}</p>
                            <div className="flex gap-2 mt-3">
                                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 rounded-lg text-[10px] font-black uppercase">Professional</Badge>
                                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none px-3 rounded-lg text-[10px] font-black uppercase">Active</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleDiscard} className="h-12 px-6 rounded-2xl font-bold border-muted-foreground/20 hover:bg-muted group">
                            <X className="mr-2 h-5 w-5 opacity-50 group-hover:rotate-90 transition-transform" /> Discard
                        </Button>
                        <Button onClick={handleSave} disabled={loading} className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 transition-transform hover:scale-[1.05]">
                            <Save className="mr-2 h-5 w-5" /> {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="basic" className="w-full">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Navigation Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="p-2 space-y-1 bg-background/50 backdrop-blur-md rounded-[2.5rem] border border-muted-foreground/10 shadow-sm sticky top-24">
                                <TabsList className="bg-transparent flex flex-col h-auto w-full p-0">
                                    <TabsTrigger value="basic" className="w-full justify-start h-14 rounded-2xl gap-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                        <User className="h-5 w-5" /> <span>Basic Info</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="professional" className="w-full justify-start h-14 rounded-2xl gap-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                        <Briefcase className="h-5 w-5" /> <span>Work Details</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="location" className="w-full justify-start h-14 rounded-2xl gap-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                        <MapPin className="h-5 w-5" /> <span>Location</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="social" className="w-full justify-start h-14 rounded-2xl gap-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                        <Globe className="h-5 w-5" /> <span>Social Links</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="security" className="w-full justify-start h-14 rounded-2xl gap-3 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                        <ShieldCheck className="h-5 w-5" /> <span>Security</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="lg:col-span-3">
                            <TabsContent value="basic" className="mt-0 focus-visible:ring-0">
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-background/80 backdrop-blur-md space-y-8">
                                    <div>
                                        <CardTitle className="text-2xl font-black mb-1">Identity Information</CardTitle>
                                        <CardDescription className="text-sm font-medium">Update your core personal details.</CardDescription>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="name" value={formData.name} onChange={handleInputChange} className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Username</Label>
                                            <div className="relative">
                                                <Info className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="username" value={formData.username} onChange={handleInputChange} className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="email" value={formData.email} onChange={handleInputChange} disabled className="h-12 pl-10 rounded-xl border-none bg-muted/20 font-bold cursor-not-allowed opacity-60" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phoneNumber" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dateOfBirth" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Date of Birth</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Gender</Label>
                                            <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
                                                <SelectTrigger className="h-12 rounded-xl border-none bg-muted/40 font-bold">
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-none shadow-xl">
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Short Bio (Max 300 chars)</Label>
                                        <textarea id="bio" suppressHydrationWarning value={formData.bio} onChange={handleInputChange} maxLength={300} className="w-full min-h-[120px] p-4 rounded-2xl border-none bg-muted/40 font-medium resize-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Tell us about yourself..." />
                                        <p className="text-[10px] text-right text-muted-foreground font-black uppercase">{formData.bio?.length || 0}/300 Characters</p>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="professional" className="mt-0 focus-visible:ring-0">
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-background/80 backdrop-blur-md space-y-8">
                                    <div>
                                        <CardTitle className="text-2xl font-black mb-1">Professional Snapshot</CardTitle>
                                        <CardDescription className="text-sm font-medium">Showcase your expert credentials.</CardDescription>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentRole" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Current Role / Profession</Label>
                                            <Input id="currentRole" value={formData.currentRole} onChange={handleInputChange} placeholder="e.g. UX Designer" className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="yearsOfExperience" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Years of Experience</Label>
                                            <Input id="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-muted">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight">Work Availability</h4>
                                                <p className="text-xs text-muted-foreground font-medium">Are you actively looking for new opportunities?</p>
                                            </div>
                                            <Switch checked={formData.workPreferences.availableForWork} onCheckedChange={handleSwitchChange} className="data-[state=checked]:bg-primary" />
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="workPreferences.hourlyRate" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Target Hourly Rate ($)</Label>
                                                <Input id="workPreferences.hourlyRate" type="number" value={formData.workPreferences.hourlyRate} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="location" className="mt-0 focus-visible:ring-0">
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-background/80 backdrop-blur-md space-y-8">
                                    <div>
                                        <CardTitle className="text-2xl font-black mb-1">Location Details</CardTitle>
                                        <CardDescription className="text-sm font-medium">Help us find opportunities near you.</CardDescription>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="locationDetails.country" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Country</Label>
                                            <Input id="locationDetails.country" value={formData.locationDetails.country} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="locationDetails.state" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">State / Region</Label>
                                            <Input id="locationDetails.state" value={formData.locationDetails.state} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="locationDetails.city" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">City</Label>
                                            <Input id="locationDetails.city" value={formData.locationDetails.city} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="locationDetails.postalCode" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Postal Code</Label>
                                            <Input id="locationDetails.postalCode" value={formData.locationDetails.postalCode} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="locationDetails.address" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Full Address (Private)</Label>
                                        <Input id="locationDetails.address" value={formData.locationDetails.address} onChange={handleInputChange} className="h-12 px-4 rounded-xl border-none bg-muted/40 font-bold" />
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="social" className="mt-0 focus-visible:ring-0">
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-background/80 backdrop-blur-md space-y-8">
                                    <div>
                                        <CardTitle className="text-2xl font-black mb-1">Web Presence</CardTitle>
                                        <CardDescription className="text-sm font-medium">Connect your professional profiles.</CardDescription>
                                    </div>
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">LinkedIn Profile</Label>
                                            <div className="relative">
                                                <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                                                <Input id="socialLinks.linkedin" value={formData.socialLinks.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/..." className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">GitHub Profile</Label>
                                            <div className="relative">
                                                <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                                                <Input id="socialLinks.github" value={formData.socialLinks.github} onChange={handleInputChange} placeholder="https://github.com/..." className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Twitter / X Profile</Label>
                                            <div className="relative">
                                                <Twitter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                                                <Input id="socialLinks.twitter" value={formData.socialLinks.twitter} onChange={handleInputChange} placeholder="https://twitter.com/..." className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 focus-within:text-primary">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Personal Website / Portfolio</Label>
                                            <div className="relative">
                                                < Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input id="socialLinks.website" value={formData.socialLinks.website} onChange={handleInputChange} placeholder="https://yourportfolio.com" className="h-12 pl-10 rounded-xl border-none bg-muted/40 font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="mt-0 focus-visible:ring-0">
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-background/80 backdrop-blur-md space-y-8">
                                    <div>
                                        <CardTitle className="text-2xl font-black mb-1">Account & Security</CardTitle>
                                        <CardDescription className="text-sm font-medium">Protect your personal data.</CardDescription>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-6 rounded-3xl bg-muted/30 border border-muted flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <Lock className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold">Password</h5>
                                                    <p className="text-xs text-muted-foreground font-medium">Last changed 3 months ago</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="rounded-xl border-muted-foreground/20 font-bold">Change Password</Button>
                                        </div>

                                        <div className="p-6 rounded-3xl bg-muted/30 border border-muted flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                                                    <Mail className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold">Recovery Email</h5>
                                                    <p className="text-xs text-muted-foreground font-medium">{formData.recoveryEmail || 'No recovery email set'}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="rounded-xl border-muted-foreground/20 font-bold">Update</Button>
                                        </div>

                                        <div className="pt-8 border-t border-muted">
                                            <h4 className="font-black text-sm uppercase tracking-tighter text-destructive mb-4">Danger Zone</h4>
                                            <Button variant="destructive" className="rounded-xl font-bold bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all border-none shadow-none px-6">Delete Account</Button>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>
                        </main>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}

