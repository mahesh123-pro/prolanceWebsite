"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    Calendar,
    ExternalLink,
    Wifi,
    MapPin,
} from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface EventItem {
    _id: string;
    title: string;
    organizer: string;
    date: string;
    time: string;
    location: string;
    isOnline: boolean;
    eventType: string;
    registrationLink: string;
    postedBy?: { name: string; email: string };
    attendees: Record<string, string | number | boolean>[];
    createdAt: string;
}

const eventTypeColors: Record<string, { bg: string; text: string }> = {
    Hackathon: { bg: "rgba(99,102,241,0.13)", text: "#a78bfa" },
    Workshop: { bg: "rgba(16,185,129,0.13)", text: "#34d399" },
    "Tech Talk": { bg: "rgba(6,182,212,0.13)", text: "#22d3ee" },
    Meetup: { bg: "rgba(245,158,11,0.13)", text: "#fbbf24" },
};

export default function AdminEventsPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const fetchEvents = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("adminToken");
                const res = await api.get(
                    `/admin/events?page=${page}&limit=${pagination.limit}&search=${debouncedSearch}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEvents(res.data.data);
                setPagination((p) => ({ ...p, ...res.data.pagination }));
            } catch (error) {
                const err = error as { response?: { data?: { error?: string; message?: string } } };
                toast.error(err.response?.data?.error || "Failed to load events");
            } finally {
                setLoading(false);
            }
        },
        [debouncedSearch, pagination.limit]
    );

    useEffect(() => {
        fetchEvents(1);
    }, [debouncedSearch, fetchEvents]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete event "${title}"? This cannot be undone.`)) return;
        setActionId(id);
        try {
            const token = localStorage.getItem("adminToken");
            await api.delete(`/admin/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`Event "${title}" deleted`);
            fetchEvents(pagination.page);
        } catch (error) {
            const err = error as { response?: { data?: { error?: string; message?: string } } };
            toast.error(err.response?.data?.error || "Delete failed");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <h1 className="mgmt-title">Event Management</h1>
                    <p className="mgmt-subtitle">
                        {pagination.total} events and hackathons
                    </p>
                </div>
                <button onClick={() => fetchEvents(pagination.page)} className="mgmt-refresh-btn">
                    <RefreshCw size={15} />
                </button>
            </div>

            <div className="mgmt-search-wrapper">
                <Search size={16} className="mgmt-search-icon" />
                <input
                    id="event-search"
                    type="text"
                    placeholder="Search by title or organizer…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mgmt-search-input"
                />
            </div>

            <div className="mgmt-table-card">
                {loading ? (
                    <div className="mgmt-loading">
                        <Loader2 size={28} className="mgmt-spinner" />
                        <p>Loading events…</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="mgmt-empty">
                        <Calendar size={40} strokeWidth={1} />
                        <p>No events found</p>
                    </div>
                ) : (
                    <div className="mgmt-table-wrapper">
                        <table className="mgmt-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Attendees</th>
                                    <th>Posted By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((ev) => {
                                    const tc = eventTypeColors[ev.eventType] || { bg: "rgba(100,116,139,0.12)", text: "#94a3b8" };
                                    return (
                                        <tr key={ev._id}>
                                            <td>
                                                <div className="res-title-cell">
                                                    <div className="ev-icon">
                                                        <Calendar size={14} strokeWidth={1.8} />
                                                    </div>
                                                    <div>
                                                        <p className="job-title">{ev.title}</p>
                                                        <p className="job-company">{ev.organizer}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="type-badge" style={{ background: tc.bg, color: tc.text }}>
                                                    {ev.eventType}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="date-cell">
                                                    {new Date(ev.date).toLocaleDateString("en-IN", {
                                                        day: "numeric", month: "short", year: "numeric",
                                                    })}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="ev-location">
                                                    {ev.isOnline ? (
                                                        <><Wifi size={12} /> <span>Online</span></>
                                                    ) : (
                                                        <><MapPin size={12} /> <span className="date-cell">{ev.location}</span></>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="date-cell">{ev.attendees.length}</span>
                                            </td>
                                            <td>
                                                {ev.postedBy ? (
                                                    <div>
                                                        <p className="user-name" style={{ margin: 0, fontSize: "0.85rem" }}>{ev.postedBy.name}</p>
                                                        <p className="user-email" style={{ margin: 0 }}>{ev.postedBy.email}</p>
                                                    </div>
                                                ) : (
                                                    <span className="date-cell">—</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <a
                                                        href={ev.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-btn action-btn-view"
                                                        title="View registration link"
                                                    >
                                                        <ExternalLink size={14} />
                                                    </a>
                                                    <button
                                                        id={`delete-event-${ev._id}`}
                                                        title="Delete event"
                                                        onClick={() => handleDelete(ev._id, ev.title)}
                                                        disabled={actionId === ev._id}
                                                        className="action-btn action-btn-delete"
                                                    >
                                                        {actionId === ev._id ? (
                                                            <Loader2 size={14} className="mgmt-spinner-sm" />
                                                        ) : (
                                                            <Trash2 size={14} />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {pagination.pages > 1 && (
                <div className="mgmt-pagination">
                    <button onClick={() => fetchEvents(pagination.page - 1)} disabled={pagination.page <= 1} className="mgmt-page-btn">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="mgmt-page-info">Page {pagination.page} of {pagination.pages}</span>
                    <button onClick={() => fetchEvents(pagination.page + 1)} disabled={pagination.page >= pagination.pages} className="mgmt-page-btn">
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <style>{`
        .res-title-cell { display: flex; align-items: center; gap: 12px; }
        .ev-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(236,72,153,0.12); color: #f472b6;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .job-title { font-size: 0.9rem; font-weight: 600; color: #f1f5f9; margin: 0; }
        .job-company { font-size: 0.775rem; color: #64748b; margin: 0; }
        .type-badge { padding: 3px 10px; border-radius: 100px; font-size: 0.73rem; font-weight: 600; }
        .ev-location { display: flex; align-items: center; gap: 5px; font-size: 0.825rem; color: #94a3b8; }
        .action-btn-view {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(6,182,212,0.1); color: #22d3ee;
          border: 1px solid rgba(6,182,212,0.2); text-decoration: none; transition: background 0.2s;
        }
        .action-btn-view:hover { background: rgba(6,182,212,0.2); }
        /* Shared */
        .mgmt-page { display: flex; flex-direction: column; gap: 24px; }
        .mgmt-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .mgmt-title { font-size: 1.6rem; font-weight: 700; color: #f1f5f9; margin: 0 0 4px; letter-spacing: -0.02em; }
        .mgmt-subtitle { font-size: 0.875rem; color: #64748b; margin: 0; }
        .mgmt-refresh-btn { display: flex; align-items: center; padding: 8px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); border-radius: 10px; color: #a78bfa; cursor: pointer; transition: background 0.2s; }
        .mgmt-refresh-btn:hover { background: rgba(99,102,241,0.18); }
        .mgmt-search-wrapper { position: relative; display: flex; align-items: center; }
        .mgmt-search-icon { position: absolute; left: 14px; color: #64748b; pointer-events: none; }
        .mgmt-search-input { width: 100%; max-width: 420px; padding: 11px 14px 11px 42px; background: rgba(15,20,40,0.7); border: 1.5px solid rgba(100,116,139,0.2); border-radius: 12px; color: #f1f5f9; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .mgmt-search-input::placeholder { color: #475569; }
        .mgmt-search-input:focus { border-color: rgba(99,102,241,0.5); }
        .mgmt-table-card { background: rgba(15,20,40,0.7); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; backdrop-filter: blur(8px); }
        .mgmt-table-wrapper { overflow-x: auto; }
        .mgmt-table { width: 100%; border-collapse: collapse; min-width: 700px; }
        .mgmt-table thead tr { background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mgmt-table th { padding: 14px 20px; font-size: 0.75rem; font-weight: 600; color: #475569; text-align: left; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.06em; }
        .mgmt-table tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
        .mgmt-table tbody tr:last-child { border-bottom: none; }
        .mgmt-table tbody tr:hover { background: rgba(255,255,255,0.03); }
        .mgmt-table td { padding: 14px 20px; vertical-align: middle; }
        .date-cell { font-size: 0.825rem; color: #64748b; }
        .user-name { font-size: 0.875rem; font-weight: 600; color: #f1f5f9; }
        .user-email { font-size: 0.75rem; color: #64748b; }
        .action-btns { display: flex; gap: 8px; }
        .action-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: none; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .action-btn:hover:not(:disabled) { transform: scale(1.05); }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .action-btn-delete { background: rgba(239,68,68,0.12); color: #fca5a5; border: 1px solid rgba(239,68,68,0.2); }
        .action-btn-delete:hover:not(:disabled) { background: rgba(239,68,68,0.25); }
        .mgmt-pagination { display: flex; align-items: center; justify-content: center; gap: 16px; }
        .mgmt-page-btn { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; background: rgba(15,20,40,0.7); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; cursor: pointer; transition: background 0.2s; }
        .mgmt-page-btn:hover:not(:disabled) { background: rgba(99,102,241,0.12); color: #a78bfa; }
        .mgmt-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .mgmt-page-info { font-size: 0.875rem; color: #64748b; }
        .mgmt-loading, .mgmt-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px; gap: 12px; color: #475569; font-size: 0.9rem; }
        .mgmt-spinner { animation: mgmtSpin 0.8s linear infinite; color: #6366f1; }
        .mgmt-spinner-sm { animation: mgmtSpin 0.8s linear infinite; }
        @keyframes mgmtSpin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
