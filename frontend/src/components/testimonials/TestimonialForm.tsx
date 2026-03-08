"use client";

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function TestimonialForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        role: '',
        company: '',
        message: '',
        rating: 5,
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setRating = (rating: number) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.message.length < 20) {
            setError('Message must be at least 20 characters long.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to submit testimonial');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-[#111827] border border-[#00d4ff]/30 p-8 rounded-xl text-center shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-gray-300">
                    Your testimonial has been submitted successfully and is currently under review.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
                    className="mt-6 px-6 py-2 bg-transparent border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#0a0e1a] transition-colors rounded-lg font-medium"
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#111827] border border-gray-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50"></div>
            <h3 className="text-xl font-bold text-white mb-6">Leave a Review</h3>

            {error && <div className="mb-4 text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                    <input
                        required
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors focus:ring-1 focus:ring-[#00d4ff]/50"
                        placeholder="Jane Doe"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Role</label>
                        <input
                            required
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors focus:ring-1 focus:ring-[#00d4ff]/50"
                            placeholder="Software Engineer"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Company / College</label>
                        <input
                            required
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors focus:ring-1 focus:ring-[#00d4ff]/50"
                            placeholder="Tech Corp"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-1">Rating</label>
                    <div className="flex gap-1 py-1 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                onClick={() => setRating(star)}
                                size={24}
                                className={`transition-colors ${star <= formData.rating ? "fill-[#00d4ff] text-[#00d4ff]" : "text-gray-600 hover:text-gray-500"}`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-1">Message</label>
                    <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-[#0a0e1a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00d4ff] transition-colors focus:ring-1 focus:ring-[#00d4ff]/50 resize-none"
                        placeholder="Share your experience (min 20 chars)..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00d4ff] text-[#0a0e1a] font-bold py-3 rounded-lg hover:bg-[#00b3e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                >
                    {loading ? 'Submitting...' : 'Submit Testimonial'}
                </button>
            </form>
        </div>
    );
}
