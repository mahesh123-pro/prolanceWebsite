"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Star, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

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

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAdminTestimonials = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/testimonials', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            } else {
                toast.error('Failed to fetch testimonials');
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdminTestimonials();
    }, [fetchAdminTestimonials]);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const token = localStorage.getItem('adminToken');
            const url = `/api/admin/testimonials/${id}`;
            const method = action === 'reject' ? 'DELETE' : 'PATCH';
            const body = action === 'approve' ? JSON.stringify({ status: 'approved' }) : undefined;

            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...(body ? { 'Content-Type': 'application/json' } : {})
                },
                body,
            });

            if (res.ok) {
                toast.success(`Testimonial ${action}d!`);
                fetchAdminTestimonials();
            } else {
                toast.error('Action failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('Action failed');
        }
    };

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <h1 className="mgmt-title">Testimonials</h1>
                    <p className="mgmt-subtitle">Manage and review user testimonials</p>
                </div>
                <button
                    onClick={() => fetchAdminTestimonials()}
                    className="mgmt-refresh-btn"
                >
                    <RefreshCw size={15} />
                </button>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#64748b' }}>
                    <Loader2 size={32} className="animate-spin" style={{ marginBottom: '16px', color: '#6366f1' }} />
                    <p>Loading testimonials...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {testimonials.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No testimonials found.</p>
                    )}

                    {testimonials.map((t) => (
                        <div key={t._id} style={{ background: 'rgba(15, 20, 40, 0.7)', border: '1px solid rgba(255,255,255,0.07)', padding: '24px', borderRadius: '16px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#f1f5f9' }}>{t.full_name}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t.role} @ {t.company}</span>
                                    <span style={{
                                        padding: '4px 12px',
                                        fontSize: '0.75rem',
                                        borderRadius: '100px',
                                        fontWeight: 600,
                                        background: t.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                                        color: t.status === 'pending' ? '#fcd34d' : '#34d399',
                                        border: `1px solid ${t.status === 'pending' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`
                                    }}>
                                        {t.status.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < t.rating ? "#6366f1" : "transparent"} color={i < t.rating ? "#6366f1" : "#475569"} />
                                    ))}
                                </div>
                                <p style={{ color: '#cbd5e1', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.5 }}>&quot;{t.message}&quot;</p>
                                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{new Date(t.createdAt).toLocaleString()}</p>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                {t.status === 'pending' && (
                                    <button
                                        onClick={() => handleAction(t._id, 'approve')}
                                        style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
                                    >
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleAction(t._id, 'reject')}
                                    style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
                                >
                                    {t.status === 'pending' ? 'Reject' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
            .mgmt-page { display: flex; flex-direction: column; gap: 24px; }
            .mgmt-header {
                display: flex; align-items: flex-start;
                justify-content: space-between; flex-wrap: wrap; gap: 12px;
            }
            .mgmt-title {
                font-size: 1.6rem; font-weight: 700; color: #f1f5f9;
                margin: 0 0 4px; letter-spacing: -0.02em;
            }
            .mgmt-subtitle { font-size: 0.875rem; color: #64748b; margin: 0; }
            .mgmt-refresh-btn {
                display: flex; align-items: center; gap: 8px;
                padding: 8px; background: rgba(99,102,241,0.1);
                border: 1px solid rgba(99,102,241,0.2); border-radius: 10px;
                color: #a78bfa; cursor: pointer; transition: background 0.2s;
            }
            .mgmt-refresh-btn:hover { background: rgba(99,102,241,0.18); }
            `}</style>
        </div>
    );
}
