"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Users,
    Briefcase,
    BookOpen,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Loader2,
    RefreshCw,
} from "lucide-react";
import api from "@/lib/api";

interface Stats {
    totalUsers: number;
    totalJobs: number;
    totalPosts: number;
    totalEvents: number;
    internships: number;
    userGrowth: { month: string; users: number }[];
    jobGrowth: { month: string; jobs: number }[];
}

// Simple bar chart component
function BarChart({
    data,
    valueKey,
    color,
}: {
    data: Record<string, string | number | boolean>[];
    valueKey: string;
    color: string;
}) {
    const maxVal = Math.max(...data.map((d) => d[valueKey]), 1);
    return (
        <div className="chart-container">
            <div className="chart-bars">
                {data.map((item, i) => (
                    <div key={i} className="chart-bar-group">
                        <div className="chart-bar-wrapper">
                            <div
                                className="chart-bar"
                                style={{
                                    height: `${(item[valueKey] / maxVal) * 100}%`,
                                    background: color,
                                }}
                            >
                                <span className="chart-bar-tooltip">{item[valueKey]}</span>
                            </div>
                        </div>
                        <span className="chart-bar-label">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const statCards = (stats: Stats) => [
    {
        title: "Total Users",
        value: stats.totalUsers,
        icon: Users,
        color: "#6366f1",
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        change: "+12%",
    },
    {
        title: "Total Resources",
        value: stats.totalPosts,
        icon: BookOpen,
        color: "#06b6d4",
        gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
        change: "+8%",
    },
    {
        title: "Job Opportunities",
        value: stats.totalJobs - stats.internships,
        icon: Briefcase,
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981, #059669)",
        change: "+5%",
    },
    {
        title: "Internships",
        value: stats.internships,
        icon: TrendingUp,
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
        change: "+3%",
    },
    {
        title: "Total Events",
        value: stats.totalEvents,
        icon: Calendar,
        color: "#ec4899",
        gradient: "linear-gradient(135deg, #ec4899, #a855f7)",
        change: "+15%",
    },
];

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStats = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("adminToken");
            const res = await api.get("/admin/stats", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStats(res.data.data);
        } catch (error) {
            const err = error as { response?: { data?: { error?: string; message?: string } } };
            setError(err.response?.data?.error || "Failed to load stats");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading) {
        return (
            <div className="dash-loading">
                <Loader2 size={32} className="dash-spinner" />
                <p>Loading dashboard data…</p>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="dash-error">
                <p>{error || "Stats not available"}</p>
                <button onClick={fetchStats} className="dash-retry-btn">
                    <RefreshCw size={16} /> Retry
                </button>
            </div>
        );
    }

    const cards = statCards(stats);

    return (
        <div className="dash-page">
            {/* Header */}
            <div className="dash-header">
                <div>
                    <h1 className="dash-title">Dashboard</h1>
                    <p className="dash-subtitle">
                        Welcome back, Admin &mdash; here&apos;s what&apos;s happening today.
                    </p>
                </div>
                <button onClick={fetchStats} className="dash-refresh-btn">
                    <RefreshCw size={15} />
                    Refresh
                </button>
            </div>

            {/* Stat Cards */}
            <div className="dash-cards-grid">
                {cards.map(({ title, value, icon: Icon, gradient, change }, i) => (
                    <div key={i} className="dash-card">
                        <div className="dash-card-top">
                            <p className="dash-card-label">{title}</p>
                            <div
                                className="dash-card-icon"
                                style={{ background: gradient }}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                            </div>
                        </div>
                        <p className="dash-card-value">{value.toLocaleString()}</p>
                        <div className="dash-card-change">
                            <ArrowUpRight size={13} />
                            <span>{change} from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="dash-charts-grid">
                <div className="dash-chart-card">
                    <div className="dash-chart-header">
                        <h2 className="dash-chart-title">User Growth</h2>
                        <p className="dash-chart-subtitle">Last 6 months</p>
                    </div>
                    {stats.userGrowth.length > 0 ? (
                        <BarChart
                            data={stats.userGrowth}
                            valueKey="users"
                            color="linear-gradient(180deg, #6366f1, #8b5cf6)"
                        />
                    ) : (
                        <div className="dash-chart-empty">No data yet</div>
                    )}
                </div>

                <div className="dash-chart-card">
                    <div className="dash-chart-header">
                        <h2 className="dash-chart-title">Job Postings</h2>
                        <p className="dash-chart-subtitle">Last 6 months</p>
                    </div>
                    {stats.jobGrowth.length > 0 ? (
                        <BarChart
                            data={stats.jobGrowth}
                            valueKey="jobs"
                            color="linear-gradient(180deg, #10b981, #059669)"
                        />
                    ) : (
                        <div className="dash-chart-empty">No data yet</div>
                    )}
                </div>
            </div>

            {/* Quick stats summary */}
            <div className="dash-summary-card">
                <h2 className="dash-summary-title">Platform Summary</h2>
                <div className="dash-summary-grid">
                    <div className="dash-summary-item">
                        <span className="dash-summary-dot" style={{ background: "#6366f1" }} />
                        <span className="dash-summary-key">Registered Users</span>
                        <span className="dash-summary-val">{stats.totalUsers}</span>
                    </div>
                    <div className="dash-summary-item">
                        <span className="dash-summary-dot" style={{ background: "#10b981" }} />
                        <span className="dash-summary-key">Full-time / Contract Jobs</span>
                        <span className="dash-summary-val">
                            {stats.totalJobs - stats.internships}
                        </span>
                    </div>
                    <div className="dash-summary-item">
                        <span className="dash-summary-dot" style={{ background: "#f59e0b" }} />
                        <span className="dash-summary-key">Internship Postings</span>
                        <span className="dash-summary-val">{stats.internships}</span>
                    </div>
                    <div className="dash-summary-item">
                        <span className="dash-summary-dot" style={{ background: "#06b6d4" }} />
                        <span className="dash-summary-key">Community Resources</span>
                        <span className="dash-summary-val">{stats.totalPosts}</span>
                    </div>
                    <div className="dash-summary-item">
                        <span className="dash-summary-dot" style={{ background: "#ec4899" }} />
                        <span className="dash-summary-key">Events / Hackathons</span>
                        <span className="dash-summary-val">{stats.totalEvents}</span>
                    </div>
                </div>
            </div>

            <style>{`
        .dash-page {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Header */
        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .dash-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 4px;
          letter-spacing: -0.03em;
        }
        .dash-subtitle { font-size: 0.9rem; color: #64748b; margin: 0; }

        .dash-refresh-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 10px;
          color: #a78bfa;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dash-refresh-btn:hover { background: rgba(99,102,241,0.18); }

        /* Cards */
        .dash-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .dash-card {
          background: rgba(15, 20, 40, 0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: transform 0.2s, border-color 0.2s;
          backdrop-filter: blur(8px);
        }
        .dash-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99,102,241,0.2);
        }

        .dash-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .dash-card-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        .dash-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }

        .dash-card-value {
          font-size: 2rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .dash-card-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #34d399;
        }

        /* Charts */
        .dash-charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .dash-charts-grid { grid-template-columns: 1fr; }
        }

        .dash-chart-card {
          background: rgba(15, 20, 40, 0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(8px);
        }

        .dash-chart-header { margin-bottom: 24px; }
        .dash-chart-title {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
          margin: 0 0 4px;
        }
        .dash-chart-subtitle { font-size: 0.8rem; color: #64748b; margin: 0; }

        /* Bar chart */
        .chart-container { height: 180px; }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 100%;
          padding-bottom: 24px;
        }
        .chart-bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          gap: 6px;
        }
        .chart-bar-wrapper {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .chart-bar {
          width: 70%;
          min-height: 4px;
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: opacity 0.2s;
        }
        .chart-bar:hover { opacity: 0.8; }
        .chart-bar-tooltip {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 600;
          color: #e2e8f0;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .chart-bar:hover .chart-bar-tooltip { opacity: 1; }
        .chart-bar-label { font-size: 0.7rem; color: #475569; white-space: nowrap; }
        .dash-chart-empty {
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          font-size: 0.875rem;
        }

        /* Summary card */
        .dash-summary-card {
          background: rgba(15, 20, 40, 0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(8px);
        }
        .dash-summary-title {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
          margin: 0 0 20px;
        }
        .dash-summary-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .dash-summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
        }
        .dash-summary-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dash-summary-key {
          flex: 1;
          font-size: 0.9rem;
          color: #94a3b8;
        }
        .dash-summary-val {
          font-size: 1rem;
          font-weight: 700;
          color: #f1f5f9;
        }

        /* Loading/error */
        .dash-loading, .dash-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
          color: #64748b;
          font-size: 0.9rem;
        }
        .dash-spinner { animation: adminSpin 0.8s linear infinite; color: #6366f1; }
        @keyframes adminSpin { to { transform: rotate(360deg); } }
        .dash-retry-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 8px;
          color: #a78bfa;
          font-size: 0.875rem;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
}
