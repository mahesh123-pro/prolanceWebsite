"use client";

import React from "react";
import { Shield, Mail, Lock, Info } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <h1 className="mgmt-title">Settings</h1>
                    <p className="mgmt-subtitle">Admin account and platform configuration</p>
                </div>
            </div>

            <div className="settings-grid">
                {/* Admin Info */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-icon" style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa" }}>
                            <Shield size={18} />
                        </div>
                        <div>
                            <h2 className="settings-card-title">Admin Account</h2>
                            <p className="settings-card-subtitle">Your administrator profile details</p>
                        </div>
                    </div>
                    <div className="settings-field-list">
                        <div className="settings-field">
                            <span className="settings-field-label">Name</span>
                            <span className="settings-field-value">Mahesh</span>
                        </div>
                        <div className="settings-field">
                            <span className="settings-field-label">Email</span>
                            <span className="settings-field-value">kolim5263@gmail.com</span>
                        </div>
                        <div className="settings-field">
                            <span className="settings-field-label">Role</span>
                            <span className="role-pill">Administrator</span>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-icon" style={{ background: "rgba(16,185,129,0.12)", color: "#34d399" }}>
                            <Lock size={18} />
                        </div>
                        <div>
                            <h2 className="settings-card-title">Security</h2>
                            <p className="settings-card-subtitle">Authentication and access controls</p>
                        </div>
                    </div>
                    <div className="settings-field-list">
                        <div className="settings-field">
                            <span className="settings-field-label">Authentication</span>
                            <span className="settings-badge settings-badge-green">JWT Active</span>
                        </div>
                        <div className="settings-field">
                            <span className="settings-field-label">Password Hashing</span>
                            <span className="settings-badge settings-badge-green">bcrypt (salt: 10)</span>
                        </div>
                        <div className="settings-field">
                            <span className="settings-field-label">Role Access</span>
                            <span className="settings-badge settings-badge-indigo">Admin Only</span>
                        </div>
                        <div className="settings-field">
                            <span className="settings-field-label">Token Expiry</span>
                            <span className="settings-field-value">30 days</span>
                        </div>
                    </div>
                </div>

                {/* API Info */}
                <div className="settings-card settings-card-full">
                    <div className="settings-card-header">
                        <div className="settings-icon" style={{ background: "rgba(6,182,212,0.12)", color: "#22d3ee" }}>
                            <Info size={18} />
                        </div>
                        <div>
                            <h2 className="settings-card-title">Protected API Endpoints</h2>
                            <p className="settings-card-subtitle">All admin routes require a valid admin JWT token</p>
                        </div>
                    </div>
                    <div className="api-table">
                        {[
                            { method: "POST", path: "/api/admin/login", desc: "Admin login — public" },
                            { method: "GET", path: "/api/admin/me", desc: "Admin profile — protected" },
                            { method: "GET", path: "/api/admin/stats", desc: "Platform analytics — protected" },
                            { method: "GET", path: "/api/admin/users", desc: "List users — protected" },
                            { method: "DELETE", path: "/api/admin/users/:id", desc: "Delete user — protected" },
                            { method: "PUT", path: "/api/admin/users/:id/suspend", desc: "Suspend user — protected" },
                            { method: "GET", path: "/api/admin/jobs", desc: "List jobs — protected" },
                            { method: "DELETE", path: "/api/admin/jobs/:id", desc: "Delete job — protected" },
                            { method: "GET", path: "/api/admin/posts", desc: "List resources — protected" },
                            { method: "DELETE", path: "/api/admin/posts/:id", desc: "Delete resource — protected" },
                            { method: "GET", path: "/api/admin/events", desc: "List events — protected" },
                            { method: "DELETE", path: "/api/admin/events/:id", desc: "Delete event — protected" },
                        ].map(({ method, path, desc }) => (
                            <div key={path} className="api-row">
                                <span className={`method-badge method-${method.toLowerCase()}`}>{method}</span>
                                <code className="api-path">{path}</code>
                                <span className="api-desc">{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .mgmt-page { display: flex; flex-direction: column; gap: 24px; }
        .mgmt-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .mgmt-title { font-size: 1.6rem; font-weight: 700; color: #f1f5f9; margin: 0 0 4px; letter-spacing: -0.02em; }
        .mgmt-subtitle { font-size: 0.875rem; color: #64748b; margin: 0; }

        .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }

        .settings-card {
          background: rgba(15,20,40,0.7); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px; backdrop-filter: blur(8px);
        }
        .settings-card-full { grid-column: 1 / -1; }

        .settings-card-header {
          display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px;
          padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .settings-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .settings-card-title { font-size: 1rem; font-weight: 600; color: #f1f5f9; margin: 0 0 4px; }
        .settings-card-subtitle { font-size: 0.8rem; color: #64748b; margin: 0; }

        .settings-field-list { display: flex; flex-direction: column; gap: 14px; }
        .settings-field {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 10px;
        }
        .settings-field-label { font-size: 0.875rem; color: #64748b; }
        .settings-field-value { font-size: 0.875rem; color: #e2e8f0; font-weight: 500; }

        .role-pill {
          padding: 3px 12px; border-radius: 100px;
          background: rgba(99,102,241,0.15); color: #a78bfa;
          border: 1px solid rgba(99,102,241,0.25);
          font-size: 0.78rem; font-weight: 600;
        }
        .settings-badge {
          padding: 3px 10px; border-radius: 100px;
          font-size: 0.75rem; font-weight: 600;
        }
        .settings-badge-green {
          background: rgba(16,185,129,0.12); color: #34d399;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .settings-badge-indigo {
          background: rgba(99,102,241,0.12); color: #a78bfa;
          border: 1px solid rgba(99,102,241,0.2);
        }

        /* API table */
        .api-table { display: flex; flex-direction: column; gap: 6px; }
        .api-row {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.025);
          transition: background 0.15s;
          flex-wrap: wrap;
        }
        .api-row:hover { background: rgba(255,255,255,0.04); }
        .method-badge {
          padding: 2px 8px; border-radius: 6px; font-size: 0.7rem;
          font-weight: 700; letter-spacing: 0.04em; flex-shrink: 0; min-width: 58px;
          text-align: center;
        }
        .method-get { background: rgba(16,185,129,0.15); color: #34d399; }
        .method-post { background: rgba(99,102,241,0.15); color: #a78bfa; }
        .method-put { background: rgba(245,158,11,0.15); color: #fbbf24; }
        .method-delete { background: rgba(239,68,68,0.15); color: #fca5a5; }
        .api-path {
          font-family: 'Courier New', monospace; font-size: 0.825rem;
          color: #94a3b8; flex: 1; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; min-width: 200px;
        }
        .api-desc { font-size: 0.8rem; color: #475569; flex-shrink: 0; }
        @media (max-width: 600px) { .api-desc { display: none; } }
      `}</style>
        </div>
    );
}
