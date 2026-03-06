"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { User, Mail, Lock, AtSign, Briefcase } from 'lucide-react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        headline: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const isPasswordStrong = (pass: string) => {
        return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordStrong(formData.password)) {
            return toast.error("Password must be at least 8 characters and include uppercase, number, and special character.");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords don't match");
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                username: formData.username,
                headline: formData.headline,
                password: formData.password,
            });

            if (res.data.success) {
                login(res.data.token, res.data.user);
                toast.success("Welcome aboard, " + formData.name + "!");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const passwordStrength = formData.password.length === 0 ? 0 :
        isPasswordStrong(formData.password) ? 3 :
            formData.password.length > 5 ? 2 : 1;

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-muted/20">
            <Card className="w-full max-w-2xl shadow-2xl rounded-[2.5rem] overflow-hidden border-none bg-background/80 backdrop-blur-xl">
                <div className="grid md:grid-cols-2">
                    {/* Left Side: Branding/Visual */}
                    <div className="hidden md:flex flex-col justify-center p-12 bg-primary text-primary-foreground relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-4xl font-black italic tracking-tighter">Ready to <br />elevate your <br />career?</h2>
                            <p className="text-primary-foreground/80 font-medium">Join thousand of professionals and students building their future on Prolance.</p>
                            <div className="pt-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Global Network</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Tech Resources</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Dream Jobs</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
                            <p className="text-muted-foreground font-medium text-sm">Fill in your details to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Username</Label>
                                    <div className="relative">
                                        <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="username" placeholder="johndoe123" value={formData.username} onChange={handleChange} required className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="headline" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Professional Headline</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="headline" placeholder="Software Engineer / Student" value={formData.headline} onChange={handleChange} className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                </div>
                                {formData.password.length > 0 && (
                                    <div className="space-y-1.5 px-1 mt-2">
                                        <div className="flex gap-1 h-1.5">
                                            <div className={`flex-1 rounded-full transition-all ${passwordStrength >= 1 ? 'bg-destructive' : 'bg-muted'}`} />
                                            <div className={`flex-1 rounded-full transition-all ${passwordStrength >= 2 ? 'bg-orange-500' : 'bg-muted'}`} />
                                            <div className={`flex-1 rounded-full transition-all ${passwordStrength >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                                        </div>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                            {passwordStrength <= 1 ? "Weak: Use symbols, numbers & uppercase" :
                                                passwordStrength === 2 ? "Better: Add special characters" : "That's a strong password"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="h-11 pl-10 rounded-xl border-none bg-muted/40 font-medium focus-visible:ring-primary" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 mt-4" disabled={loading}>
                                {loading ? 'Creating...' : 'Sign Up'}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-muted-foreground mt-8 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="font-black text-primary hover:underline hover:italic transition-all">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
