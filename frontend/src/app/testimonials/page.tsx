"use client";

import React, { useEffect, useState } from 'react';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialForm from '@/components/testimonials/TestimonialForm';
import { Reveal } from "@/components/motion/Reveal";
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

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch('/api/testimonials');
                if (res.ok) {
                    const data = await res.json();
                    setTestimonials(data);
                }
            } catch (err) {
                console.error('Failed to load testimonials', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0e1a] text-white py-16 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
                <Reveal className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0088ff]">
                        What People Say About Prolance
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Hear from professionals who have used our platform to build their career network.
                    </p>
                </Reveal>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-10 h-10 border-4 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <Reveal key={t._id} delay={Math.min(idx * 0.05, 0.25)}>
                                <TestimonialCard testimonial={t} />
                            </Reveal>
                        ))}
                        {testimonials.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                No testimonials to show right now. Be the first to leave one!
                            </div>
                        )}
                    </div>
                )}

                <Reveal className="max-w-2xl mx-auto pt-10">
                    <TestimonialForm />
                </Reveal>
            </div>
        </div>
    );
}
