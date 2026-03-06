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

export function Navbar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Hide the regular navbar on all admin routes
    if (pathname?.startsWith("/admin")) return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-primary">Prolance</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/jobs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Jobs
                        </Link>
                        <Link href="/events" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Events
                        </Link>
                        <Link href="/community" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Community
                        </Link>
                        <Link href="/resources" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Resources
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-10 w-10 border-none hover:bg-muted/50 transition-colors" asChild>
                        <Link href="/messages">
                            <MessageSquare className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 border-none hover:bg-muted/50 transition-colors relative" asChild>
                        <Link href="/notifications">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                        </Link>
                    </Button>

                    <ModeToggle />

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                                        <AvatarImage src={user.profilePicture} alt={user.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1 p-1">
                                        <p className="text-sm font-bold leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="rounded-xl cursor-pointer text-destructive focus:text-destructive"
                                    onClick={logout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <Button variant="ghost" asChild className="rounded-xl">
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button asChild className="rounded-xl px-5 shadow-lg">
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
