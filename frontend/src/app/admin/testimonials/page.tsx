"use client";

import React, { useEffect, useState } from 'react';
export interface Testimonial {
    _id: string;
    full_name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}
import { Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    // Check auth on mount
    useEffect(() => {
        fetchAdminTestimonials();
    }, []);

    const fetchAdminTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/testimonials');
            if (res.status === 401) {
                setAuthenticated(false);
            } else if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
                setAuthenticated(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            setAuthenticated(true);
            fetchAdminTestimonials();
        } else {
            setError('Invalid password');
        }
    };

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const url = `/api/admin/testimonials/${id}`;
            const method = action === 'reject' ? 'DELETE' : 'PATCH';
            const body = action === 'approve' ? JSON.stringify({ status: 'approved' }) : undefined;

            const res = await fetch(url, {
                method,
                headers: body ? { 'Content-Type': 'application/json' } : undefined,
                body,
            });

            if (res.ok) {
                fetchAdminTestimonials(); // refresh
            } else {
                alert('Action failed');
            }
        } catch (err) {
            console.error(err);
            alert('Action failed');
        }
    };

    if (loading && !authenticated) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
                <div className="bg-[#111827] border border-gray-800 p-8 rounded-xl shadow-[0_0_25px_rgba(0,212,255,0.05)] max-w-md w-full">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
                    {error && <div className="text-red-400 text-sm mb-4 bg-red-400/10 p-3 rounded">{error}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#00d4ff] text-[#0a0e1a] font-bold py-2 rounded-lg hover:bg-[#00b3e6] transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center bg-[#111827] border border-gray-800 p-6 rounded-xl">
                    <h1 className="text-3xl font-extrabold text-[#00d4ff]">Admin Testimonial Panel</h1>
                    <button
                        onClick={async () => {
                            await fetch('/api/admin/logout', { method: 'POST' });
                            setAuthenticated(false);
                            setTestimonials([]);
                        }}
                        className="px-4 py-2 rounded border border-gray-600 hover:border-gray-400 transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="space-y-4">
                        {testimonials.length === 0 && (
                            <p className="text-gray-500 text-center py-10">No testimonials found.</p>
                        )}

                        {testimonials.map((t) => (
                            <div key={t._id} className="bg-[#111827] border border-gray-800 p-6 rounded-xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-lg">{t.full_name}</span>
                                        <span className="text-gray-400 text-sm">{t.role} @ {t.company}</span>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${t.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {t.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < t.rating ? "fill-[#00d4ff] text-[#00d4ff]" : "text-gray-600"} />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic text-sm">"{t.message}"</p>
                                    <p className="text-gray-500 text-xs">{new Date(t.createdAt).toLocaleString()}</p>
                                </div>

                                <div className="flex flex-row md:flex-col lg:flex-row gap-3">
                                    {t.status === 'pending' && (
                                        <button
                                            onClick={() => handleAction(t._id, 'approve')}
                                            className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleAction(t._id, 'reject')}
                                        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {t.status === 'pending' ? 'Reject & Delete' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
