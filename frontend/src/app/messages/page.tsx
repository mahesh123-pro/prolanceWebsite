"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Plus, MoreVertical, Phone, Video, Info, Image as ImageIcon, Smile, Paperclip } from 'lucide-react';

export default function MessagesPage() {
    const { user } = useAuth();
    const [activeChat, setActiveChat] = useState(1);
    const [message, setMessage] = useState('');

    const contacts = [
        { id: 1, name: 'Sarah Chen', status: 'online', avatar: '', lastMsg: 'The design system looks great!', time: '12:45 PM', unread: 2 },
        { id: 2, name: 'Alex Rivera', status: 'offline', avatar: '', lastMsg: 'When is the next sync?', time: 'Yesterday', unread: 0 },
        { id: 3, name: 'TechFlow HR', status: 'online', avatar: '', lastMsg: 'Sent you the offer details.', time: 'Monday', unread: 0 },
        { id: 4, name: 'Innovate Community', status: 'online', avatar: '', lastMsg: 'New post in Web Dev group', time: '2 mins ago', unread: 5 },
    ];

    const messages = [
        { id: 1, senderId: 1, text: "Hey! Have you had a chance to look at the new React components?", time: "12:30 PM", isMe: false },
        { id: 2, senderId: 'me', text: "Yes, I just went through them. The consistency is much better now.", time: "12:35 PM", isMe: true },
        { id: 3, senderId: 1, text: "The design system looks great!", time: "12:45 PM", isMe: false },
    ];

    return (
        <div className="bg-muted/10 h-[calc(100vh-4rem)] overflow-hidden">
            <div className="container mx-auto px-4 h-full py-6 max-w-7xl">
                <div className="bg-background rounded-[2.5rem] shadow-2xl h-full flex overflow-hidden border">

                    {/* Contacts Sidebar */}
                    <div className="w-full md:w-80 lg:w-96 border-r flex flex-col bg-muted/5">
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black italic text-primary">Messages</h2>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-primary/5 text-primary">
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search chats..."
                                    className="pl-9 h-11 rounded-xl border-none bg-muted/40 focus-visible:ring-primary shadow-inner"
                                />
                            </div>
                        </div>

                        <ScrollArea className="flex-1">
                            <div className="px-3 pb-6">
                                {contacts.map((contact) => (
                                    <button
                                        key={contact.id}
                                        onClick={() => setActiveChat(contact.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 mb-1 group ${activeChat === contact.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-muted'}`}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                <AvatarFallback className={activeChat === contact.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary font-bold'}>
                                                    {contact.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {contact.status === 'online' && (
                                                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 border-2 border-background rounded-full" />
                                            )}
                                        </div>
                                        <div className="flex-1 text-left overflow-hidden">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="font-bold truncate">{contact.name}</p>
                                                <span className={`text-[10px] uppercase font-black tracking-widest ${activeChat === contact.id ? 'text-white/60' : 'text-muted-foreground'}`}>{contact.time}</span>
                                            </div>
                                            <p className={`text-xs truncate ${activeChat === contact.id ? 'text-white/80' : 'text-muted-foreground/80'}`}>{contact.lastMsg}</p>
                                        </div>
                                        {contact.unread > 0 && activeChat !== contact.id && (
                                            <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center shadow-lg shadow-primary/20">
                                                {contact.unread}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-background relative">
                        {/* Chat Header */}
                        <div className="p-6 border-b flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-sm">
                                    <AvatarFallback className="bg-primary/10 text-primary font-black">S</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">Sarah Chen</h3>
                                    <p className="text-green-500 text-xs font-black uppercase tracking-widest mt-1">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground"><Phone className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground"><Video className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground"><Info className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground"><MoreVertical className="h-5 w-5" /></Button>
                            </div>
                        </div>

                        {/* Message Area */}
                        <ScrollArea className="flex-1 p-8">
                            <div className="space-y-8">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex flex-col max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-4 rounded-[1.5rem] shadow-sm font-medium text-sm leading-relaxed ${msg.isMe ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted/50 rounded-tl-none'}`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] font-black tracking-widest text-muted-foreground mt-2 uppercase">{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-6 bg-background">
                            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-[1.75rem] border border-muted-foreground/10 group focus-within:border-primary transition-all">
                                <div className="flex items-center gap-1 pl-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                                        <Paperclip className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors">
                                        <Smile className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Input
                                    placeholder="Type your message..."
                                    className="flex-1 border-none bg-transparent focus-visible:ring-0 shadow-none text-base font-medium h-12"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Button
                                    size="icon"
                                    className="h-12 w-12 rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-90"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
