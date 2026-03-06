"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    Briefcase,
    ExternalLink,
    Filter,
} from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface JobItem {
    _id: string;
    title: string;
    company: string;
    location: string;
    jobType: string;
    salary?: string;
    applyLink: string;
    postedBy?: { name: string; email: string; username: string };
    createdAt: string;
}

const JOB_TYPES = ["", "Full-time", "Part-time", "Contract", "Internship", "Freelance"];

const jobTypeBadgeColor: Record<string, string> = {
    "Full-time": "rgba(16,185,129,0.13)",
    "Part-time": "rgba(99,102,241,0.13)",
    Contract: "rgba(245,158,11,0.13)",
    Internship: "rgba(236,72,153,0.13)",
    Freelance: "rgba(6,182,212,0.13)",
};
const jobTypeTextColor: Record<string, string> = {
    "Full-time": "#34d399",
    "Part-time": "#a78bfa",
    Contract: "#fbbf24",
    Internship: "#f472b6",
    Freelance: "#22d3ee",
};

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<JobItem[]>([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const fetchJobs = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("adminToken");
                const res = await api.get(
                    `/admin/jobs?page=${page}&limit=${pagination.limit}&search=${debouncedSearch}&jobType=${jobTypeFilter}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setJobs(res.data.data);
                setPagination((p) => ({ ...p, ...res.data.pagination }));
            } catch (err: any) {
                toast.error(err.response?.data?.error || "Failed to load jobs");
            } finally {
                setLoading(false);
            }
        },
        [debouncedSearch, jobTypeFilter, pagination.limit]
    );

    useEffect(() => {
        fetchJobs(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, jobTypeFilter]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete job "${title}"? This cannot be undone.`)) return;
        setActionId(id);
        try {
            const token = localStorage.getItem("adminToken");
            await api.delete(`/admin/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`Job "${title}" deleted`);
            fetchJobs(pagination.page);
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Delete failed");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <h1 className="mgmt-title">Job & Internship Management</h1>
                    <p className="mgmt-subtitle">
                        {pagination.total} total postings — manage and moderate job listings
                    </p>
                </div>
                <button onClick={() => fetchJobs(pagination.page)} className="mgmt-refresh-btn">
                    <RefreshCw size={15} />
                </button>
            </div>

            {/* Search + Filter */}
            <div className="jobs-filters">
                <div className="mgmt-search-wrapper" style={{ flex: 1 }}>
                    <Search size={16} className="mgmt-search-icon" />
                    <input
                        id="job-search"
                        type="text"
                        placeholder="Search by title or company…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mgmt-search-input"
                        style={{ maxWidth: "100%" }}
                    />
                </div>
                <div className="jobs-filter-wrapper">
                    <Filter size={15} className="jobs-filter-icon" />
                    <select
                        id="job-type-filter"
                        value={jobTypeFilter}
                        onChange={(e) => setJobTypeFilter(e.target.value)}
                        className="jobs-filter-select"
                    >
                        {JOB_TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t || "All Types"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="mgmt-table-card">
                {loading ? (
                    <div className="mgmt-loading">
                        <Loader2 size={28} className="mgmt-spinner" />
                        <p>Loading jobs…</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="mgmt-empty">
                        <Briefcase size={40} strokeWidth={1} />
                        <p>No jobs found</p>
                    </div>
                ) : (
                    <div className="mgmt-table-wrapper">
                        <table className="mgmt-table">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Type</th>
                                    <th>Location</th>
                                    <th>Posted By</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>
                                            <div className="job-title-cell">
                                                <div className="job-icon">
                                                    <Briefcase size={14} strokeWidth={1.8} />
                                                </div>
                                                <div>
                                                    <p className="job-title">{job.title}</p>
                                                    <p className="job-company">{job.company}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="type-badge"
                                                style={{
                                                    background: jobTypeBadgeColor[job.jobType] || "rgba(100,116,139,0.12)",
                                                    color: jobTypeTextColor[job.jobType] || "#94a3b8",
                                                }}
                                            >
                                                {job.jobType}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="date-cell">{job.location}</span>
                                        </td>
                                        <td>
                                            {job.postedBy ? (
                                                <div>
                                                    <p className="user-name" style={{ margin: 0, fontSize: "0.85rem" }}>
                                                        {job.postedBy.name}
                                                    </p>
                                                    <p className="user-email" style={{ margin: 0 }}>
                                                        {job.postedBy.email}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="date-cell">—</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="date-cell">
                                                {new Date(job.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <a
                                                    href={job.applyLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="action-btn action-btn-view"
                                                    title="View apply link"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                                <button
                                                    id={`delete-job-${job._id}`}
                                                    title="Delete job"
                                                    onClick={() => handleDelete(job._id, job.title)}
                                                    disabled={actionId === job._id}
                                                    className="action-btn action-btn-delete"
                                                >
                                                    {actionId === job._id ? (
                                                        <Loader2 size={14} className="mgmt-spinner-sm" />
                                                    ) : (
                                                        <Trash2 size={14} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {pagination.pages > 1 && (
                <div className="mgmt-pagination">
                    <button
                        onClick={() => fetchJobs(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="mgmt-page-btn"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="mgmt-page-info">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                        onClick={() => fetchJobs(pagination.page + 1)}
                        disabled={pagination.page >= pagination.pages}
                        className="mgmt-page-btn"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <style>{`
        .jobs-filters { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .jobs-filter-wrapper {
          position: relative; display: flex; align-items: center;
        }
        .jobs-filter-icon {
          position: absolute; left: 12px; color: #64748b; pointer-events: none;
        }
        .jobs-filter-select {
          padding: 11px 14px 11px 36px;
          background: rgba(15,20,40,0.7);
          border: 1.5px solid rgba(100,116,139,0.2);
          border-radius: 12px; color: #f1f5f9; font-size: 0.875rem;
          outline: none; cursor: pointer; transition: border-color 0.2s;
          appearance: none; -webkit-appearance: none;
          min-width: 150px;
        }
        .jobs-filter-select:focus { border-color: rgba(99,102,241,0.5); }
        .jobs-filter-select option { background: #0f1629; }

        .job-title-cell { display: flex; align-items: center; gap: 12px; }
        .job-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(99,102,241,0.12); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .job-title { font-size: 0.9rem; font-weight: 600; color: #f1f5f9; margin: 0; }
        .job-company { font-size: 0.775rem; color: #64748b; margin: 0; }

        .type-badge {
          padding: 3px 10px; border-radius: 100px;
          font-size: 0.73rem; font-weight: 600;
        }

        .action-btn-view {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(6,182,212,0.1); color: #22d3ee;
          border: 1px solid rgba(6,182,212,0.2); text-decoration: none;
          transition: background 0.2s;
        }
        .action-btn-view:hover { background: rgba(6,182,212,0.2); }

        /* Re-use shared styles */
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
          display: flex; align-items: center; padding: 8px;
          background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px; color: #a78bfa; cursor: pointer;
          transition: background 0.2s;
        }
        .mgmt-refresh-btn:hover { background: rgba(99,102,241,0.18); }
        .mgmt-search-wrapper { position: relative; display: flex; align-items: center; }
        .mgmt-search-icon { position: absolute; left: 14px; color: #64748b; pointer-events: none; }
        .mgmt-search-input {
          width: 100%; padding: 11px 14px 11px 42px;
          background: rgba(15,20,40,0.7); border: 1.5px solid rgba(100,116,139,0.2);
          border-radius: 12px; color: #f1f5f9; font-size: 0.9rem; outline: none;
          transition: border-color 0.2s;
        }
        .mgmt-search-input::placeholder { color: #475569; }
        .mgmt-search-input:focus { border-color: rgba(99,102,241,0.5); }
        .mgmt-table-card {
          background: rgba(15,20,40,0.7); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden; backdrop-filter: blur(8px);
        }
        .mgmt-table-wrapper { overflow-x: auto; }
        .mgmt-table { width: 100%; border-collapse: collapse; min-width: 650px; }
        .mgmt-table thead tr {
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mgmt-table th {
          padding: 14px 20px; font-size: 0.75rem; font-weight: 600;
          color: #475569; text-align: left; white-space: nowrap;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .mgmt-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .mgmt-table tbody tr:last-child { border-bottom: none; }
        .mgmt-table tbody tr:hover { background: rgba(255,255,255,0.03); }
        .mgmt-table td { padding: 14px 20px; vertical-align: middle; }
        .date-cell { font-size: 0.825rem; color: #64748b; }
        .user-name { font-size: 0.875rem; font-weight: 600; color: #f1f5f9; }
        .user-email { font-size: 0.75rem; color: #64748b; }
        .action-btns { display: flex; gap: 8px; }
        .action-btn {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px; border: none;
          cursor: pointer; transition: background 0.2s, transform 0.1s;
        }
        .action-btn:hover:not(:disabled) { transform: scale(1.05); }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .action-btn-delete {
          background: rgba(239,68,68,0.12); color: #fca5a5;
          border: 1px solid rgba(239,68,68,0.2);
        }
        .action-btn-delete:hover:not(:disabled) { background: rgba(239,68,68,0.25); }
        .mgmt-pagination {
          display: flex; align-items: center; justify-content: center; gap: 16px;
        }
        .mgmt-page-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(15,20,40,0.7); border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8; cursor: pointer; transition: background 0.2s;
        }
        .mgmt-page-btn:hover:not(:disabled) { background: rgba(99,102,241,0.12); color: #a78bfa; }
        .mgmt-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .mgmt-page-info { font-size: 0.875rem; color: #64748b; }
        .mgmt-loading, .mgmt-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 240px; gap: 12px;
          color: #475569; font-size: 0.9rem;
        }
        .mgmt-spinner { animation: mgmtSpin 0.8s linear infinite; color: #6366f1; }
        .mgmt-spinner-sm { animation: mgmtSpin 0.8s linear infinite; }
        @keyframes mgmtSpin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
