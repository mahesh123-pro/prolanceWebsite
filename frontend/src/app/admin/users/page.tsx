"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Search,
    Trash2,
    ShieldOff,
    Shield,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    User,
} from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface UserItem {
    _id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
    profilePicture?: string;
    headline?: string;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 15,
        total: 0,
        pages: 1,
    });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const fetchUsers = useCallback(
        async (page = 1) => {
            setLoading(true);
            try {
                const token = localStorage.getItem("adminToken");
                const res = await api.get(
                    `/admin/users?page=${page}&limit=${pagination.limit}&search=${debouncedSearch}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUsers(res.data.data);
                setPagination((p) => ({ ...p, ...res.data.pagination }));
            } catch (error) {
                const err = error as { response?: { data?: { error?: string; message?: string } } };
                toast.error(err.response?.data?.error || "Failed to load users");
            } finally {
                setLoading(false);
            }
        },
        [debouncedSearch, pagination.limit]
    );

    useEffect(() => {
        fetchUsers(1);
    }, [debouncedSearch, fetchUsers]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
        setActionId(id);
        try {
            const token = localStorage.getItem("adminToken");
            await api.delete(`/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(`User "${name}" deleted`);
            fetchUsers(pagination.page);
        } catch (error) {
            const err = error as { response?: { data?: { error?: string; message?: string } } };
            toast.error(err.response?.data?.error || "Delete failed");
        } finally {
            setActionId(null);
        }
    };

    const handleSuspend = async (id: string, role: string, name: string) => {
        const action = role === "guest" ? "unsuspend" : "suspend";
        if (!confirm(`${action === "suspend" ? "Suspend" : "Unsuspend"} user "${name}"?`)) return;
        setActionId(id);
        try {
            const token = localStorage.getItem("adminToken");
            const res = await api.put(`/admin/users/${id}/suspend`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(res.data.message);
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? { ...u, role: res.data.data.role } : u))
            );
        } catch (error) {
            const err = error as { response?: { data?: { error?: string; message?: string } } };
            toast.error(err.response?.data?.error || "Action failed");
        } finally {
            setActionId(null);
        }
    };

    const roleBadge = (role: string) => {
        const map: Record<string, string> = {
            admin: "badge-admin",
            user: "badge-user",
            guest: "badge-guest",
        };
        return map[role] || "badge-user";
    };

    return (
        <div className="mgmt-page">
            {/* Header */}
            <div className="mgmt-header">
                <div>
                    <h1 className="mgmt-title">User Management</h1>
                    <p className="mgmt-subtitle">
                        {pagination.total} registered users on the platform
                    </p>
                </div>
                <button
                    onClick={() => fetchUsers(pagination.page)}
                    className="mgmt-refresh-btn"
                >
                    <RefreshCw size={15} />
                </button>
            </div>

            {/* Search */}
            <div className="mgmt-search-wrapper">
                <Search size={16} className="mgmt-search-icon" />
                <input
                    id="user-search"
                    type="text"
                    placeholder="Search by name, email, or username…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mgmt-search-input"
                />
            </div>

            {/* Table */}
            <div className="mgmt-table-card">
                {loading ? (
                    <div className="mgmt-loading">
                        <Loader2 size={28} className="mgmt-spinner" />
                        <p>Loading users…</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="mgmt-empty">
                        <User size={40} strokeWidth={1} />
                        <p>No users found</p>
                    </div>
                ) : (
                    <div className="mgmt-table-wrapper">
                        <table className="mgmt-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar">
                                                    {u.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="user-name">{u.name}</p>
                                                    <p className="user-email">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="user-username">@{u.username}</span>
                                        </td>
                                        <td>
                                            <span className={`role-badge ${roleBadge(u.role)}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="date-cell">
                                                {new Date(u.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button
                                                    id={`suspend-${u._id}`}
                                                    title={u.role === "guest" ? "Unsuspend" : "Suspend"}
                                                    onClick={() => handleSuspend(u._id, u.role, u.name)}
                                                    disabled={actionId === u._id}
                                                    className={`action-btn ${u.role === "guest"
                                                        ? "action-btn-unsuspend"
                                                        : "action-btn-suspend"
                                                        }`}
                                                >
                                                    {actionId === u._id ? (
                                                        <Loader2 size={14} className="mgmt-spinner-sm" />
                                                    ) : u.role === "guest" ? (
                                                        <Shield size={14} />
                                                    ) : (
                                                        <ShieldOff size={14} />
                                                    )}
                                                </button>
                                                <button
                                                    id={`delete-user-${u._id}`}
                                                    title="Delete user"
                                                    onClick={() => handleDelete(u._id, u.name)}
                                                    disabled={actionId === u._id}
                                                    className="action-btn action-btn-delete"
                                                >
                                                    {actionId === u._id ? (
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

            {/* Pagination */}
            {pagination.pages > 1 && (
                <div className="mgmt-pagination">
                    <button
                        onClick={() => fetchUsers(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="mgmt-page-btn"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="mgmt-page-info">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                        onClick={() => fetchUsers(pagination.page + 1)}
                        disabled={pagination.page >= pagination.pages}
                        className="mgmt-page-btn"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            <style>{`
        ${sharedMgmtStyles}
        .user-cell { display: flex; align-items: center; gap: 12px; }
        .user-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.875rem; color: #fff;
          flex-shrink: 0;
        }
        .user-name { font-size: 0.9rem; font-weight: 600; color: #f1f5f9; margin: 0; }
        .user-email { font-size: 0.775rem; color: #64748b; margin: 0; }
        .user-username { font-size: 0.85rem; color: #94a3b8; font-family: monospace; }
        .role-badge {
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        .badge-admin { background: rgba(99,102,241,0.15); color: #a78bfa; border: 1px solid rgba(99,102,241,0.25); }
        .badge-user { background: rgba(16,185,129,0.12); color: #34d399; border: 1px solid rgba(16,185,129,0.2); }
        .badge-guest { background: rgba(239,68,68,0.12); color: #fca5a5; border: 1px solid rgba(239,68,68,0.2); }
      `}</style>
        </div>
    );
}

// Shared styles for management pages
const sharedMgmtStyles = `
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

  .mgmt-search-wrapper {
    position: relative; display: flex; align-items: center;
  }
  .mgmt-search-icon {
    position: absolute; left: 14px; color: #64748b; pointer-events: none;
  }
  .mgmt-search-input {
    width: 100%; max-width: 420px;
    padding: 11px 14px 11px 42px;
    background: rgba(15,20,40,0.7);
    border: 1.5px solid rgba(100,116,139,0.2);
    border-radius: 12px; color: #f1f5f9; font-size: 0.9rem;
    outline: none; transition: border-color 0.2s;
  }
  .mgmt-search-input::placeholder { color: #475569; }
  .mgmt-search-input:focus { border-color: rgba(99,102,241,0.5); }

  .mgmt-table-card {
    background: rgba(15,20,40,0.7);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; overflow: hidden;
    backdrop-filter: blur(8px);
  }
  .mgmt-table-wrapper { overflow-x: auto; }
  .mgmt-table {
    width: 100%; border-collapse: collapse; min-width: 600px;
  }
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

  .action-btns { display: flex; gap: 8px; }
  .action-btn {
    display: flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px; border: none;
    cursor: pointer; transition: background 0.2s, transform 0.1s;
  }
  .action-btn:hover:not(:disabled) { transform: scale(1.05); }
  .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .action-btn-suspend {
    background: rgba(245,158,11,0.12); color: #fbbf24;
    border: 1px solid rgba(245,158,11,0.2);
  }
  .action-btn-suspend:hover:not(:disabled) { background: rgba(245,158,11,0.25); }
  .action-btn-unsuspend {
    background: rgba(16,185,129,0.12); color: #34d399;
    border: 1px solid rgba(16,185,129,0.2);
  }
  .action-btn-unsuspend:hover:not(:disabled) { background: rgba(16,185,129,0.25); }
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
`;
