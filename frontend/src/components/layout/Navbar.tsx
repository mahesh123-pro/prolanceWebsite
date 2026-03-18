"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, LayoutDashboard, Settings, Bell, MessageSquare } from "lucide-react";

import { useState, useEffect } from "react";

export function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hide the regular navbar on all admin routes
    if (pathname?.startsWith("/admin")) return null;

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? "pt-4 px-4 pointer-events-none" : "pt-0 px-0 pointer-events-auto"}`}>
            <div className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out pointer-events-auto max-w-7xl ${scrolled ? "h-14 px-4 md:px-6 bg-background/70 backdrop-blur-xl border border-border/60 rounded-full shadow-lg shadow-black/5 dark:shadow-primary/5" : "h-20 px-6 md:px-8 bg-transparent border-transparent border-b"}`}>
                {/* Logo Section */}
                <div className="flex items-center z-10">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                           <span className="text-primary-foreground font-extrabold text-sm tracking-tight">PR</span>
                        </div>
                        <span className="font-extrabold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 hidden sm:block">Prolance</span>
                    </Link>
                </div>

                {/* Centered Navigation */}
                <nav className={`hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-1 rounded-full px-1.5 py-1.5 border backdrop-blur-md transition-all duration-500 ${scrolled ? "bg-muted/40 border-border/50 shadow-sm" : "bg-transparent border-transparent"}`}>
                    <Link href="/jobs" className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-background/80 hover:text-foreground hover:shadow-sm text-foreground/70">
                        Jobs
                    </Link>
                    <Link href="/events" className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-background/80 hover:text-foreground hover:shadow-sm text-foreground/70">
                        Events
                    </Link>
                    <Link href="/community" className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-background/80 hover:text-foreground hover:shadow-sm text-foreground/70">
                        Community
                    </Link>
                    <Link href="/resources" className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-background/80 hover:text-foreground hover:shadow-sm text-foreground/70">
                        Resources
                    </Link>
                    <Link href="/testimonials" className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-background/80 hover:text-foreground hover:shadow-sm text-foreground/70">
                        Testimonials
                    </Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-1 md:gap-3 z-10">
                    <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-full border-none hover:bg-muted/80 transition-colors" asChild>
                        <Link href="/messages">
                            <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 rounded-full border-none hover:bg-muted/80 transition-colors relative" asChild>
                        <Link href="/notifications">
                            <Bell className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="absolute top-2 right-2 md:right-2.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                        </Link>
                    </Button>

                    <ModeToggle />

                    <div className="w-px h-6 bg-border/50 mx-1 md:mx-2" />

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 md:h-10 md:w-10 rounded-full hover:ring-2 ring-primary/20 transition-all p-0 overflow-hidden shadow-sm">
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src={user.profilePicture} alt={user.name} className="object-cover" />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-3 rounded-2xl p-2 shadow-xl border-border/40" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal mb-1">
                                    <div className="flex flex-col space-y-1 p-2 bg-muted/30 rounded-xl">
                                        <p className="text-sm font-bold leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground mt-1">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="opacity-50" />
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-primary/5 focus:bg-primary/10 transition-colors py-2.5">
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="mr-3 h-4 w-4 text-primary/70" />
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-primary/5 focus:bg-primary/10 transition-colors py-2.5">
                                    <Link href="/profile">
                                        <User className="mr-3 h-4 w-4 text-primary/70" />
                                        <span className="font-medium">Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer hover:bg-primary/5 focus:bg-primary/10 transition-colors py-2.5">
                                    <Link href="/settings">
                                        <Settings className="mr-3 h-4 w-4 text-primary/70" />
                                        <span className="font-medium">Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="opacity-50" />
                                <DropdownMenuItem
                                    className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/10 transition-colors py-2.5"
                                    onClick={logout}
                                >
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span className="font-medium">Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <Button variant="ghost" asChild className="rounded-full px-4 font-semibold hover:bg-primary/5">
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild className="rounded-full px-6 font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all">
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
