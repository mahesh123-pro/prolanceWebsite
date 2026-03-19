"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    // Hide the footer on all admin and dashboard routes for a cleaner app feel
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/messages")) return null;

    return (
        <footer className="relative border-t bg-background/50 backdrop-blur-xl overflow-hidden mt-auto">
            {/* Soft background accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container px-4 md:px-8 mx-auto pt-16 pb-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block group">
                            <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover:to-primary">Prolance</span>
                            <div className="h-1 w-8 bg-primary mt-2 rounded-full transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-sm font-medium">
                            The exclusive networking hub bridging the gap between student developers, early-career engineers, and innovative tech startups.
                        </p>
                        <div className="flex items-center space-x-4 pt-2">
                            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm"><Twitter className="h-4 w-4" /></a>
                            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm"><Linkedin className="h-4 w-4" /></a>
                            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-sm"><Github className="h-4 w-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-foreground tracking-wide uppercase text-sm">Platform</h3>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/jobs" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Jobs</Link></li>
                            <li><Link href="/events" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Events</Link></li>
                            <li><Link href="/community" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Community</Link></li>
                            <li><Link href="/resources" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Resources</Link></li>
                            <li><Link href="/testimonials" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Testimonials</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-foreground tracking-wide uppercase text-sm">Company</h3>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="/about" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Our Story</Link></li>
                            <li><Link href="#contact" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Contact Us</Link></li>
                            <li><Link href="#careers" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-foreground tracking-wide uppercase text-sm">Legal</h3>
                        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                            <li><Link href="#privacy" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Privacy Policy</Link></li>
                            <li><Link href="#terms" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Terms of Service</Link></li>
                            <li><Link href="#cookies" className="inline-flex items-center group hover:text-primary transition-colors duration-300"><span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 group-hover:mr-1">›</span>Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground font-medium">
                    <p className="mb-4 md:mb-0 text-center md:text-left">© {new Date().getFullYear()} Prolance Network. All rights reserved.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                        <p className="flex items-center">
                            Built with <span className="text-destructive mx-1 animate-pulse">❤</span> for developers
                        </p>
                        <span className="hidden sm:inline-block text-border">|</span>
                        <p className="flex items-center text-center">
                            Developed by 
                            <a 
                                href="https://mahessh.me/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ml-1.5 font-semibold text-foreground hover:text-primary transition-colors group flex items-center"
                                title="Mahesh | Full-Stack Developer & Cloud Engineer"
                            >
                                Mahesh
                                <span className="ml-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wider hidden lg:inline-block group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    Full-Stack & Cloud
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
