"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    // Hide the footer on all admin and dashboard routes for a cleaner app feel
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/messages")) return null;

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12 mt-auto">
            <div className="container px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-primary">Prolance</span>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        The exclusive networking hub bridging the gap between student developers, early-career tech professionals, and innovative startups.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/jobs" className="hover:text-primary transition-colors">Jobs</Link></li>
                        <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
                        <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
                        <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="#careers" className="hover:text-primary transition-colors">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="#cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container px-4 md:px-8 mx-auto mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Prolance. All rights reserved.</p>
                <div className="flex space-x-5 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                    <Link href="#" className="hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
                </div>
            </div>
        </footer>
    );
}
