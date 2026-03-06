"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    Shield,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2,
} from "lucide-react";
import api from "@/lib/api";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // Guard: redirect if already logged in as admin
    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            router.push("/admin/dashboard");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/admin/login", { email, password });
            if (res.data.success) {
                localStorage.setItem("adminToken", res.data.token);
                localStorage.setItem("adminUser", JSON.stringify(res.data.user));
                toast.success("Welcome back, Admin!");
                router.push("/admin/dashboard");
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.error || "Login failed. Please try again.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-bg min-h-screen flex items-center justify-center p-4">
            {/* Animated background blobs */}
            <div className="admin-blob admin-blob-1" />
            <div className="admin-blob admin-blob-2" />
            <div className="admin-blob admin-blob-3" />

            <div className="admin-login-card">
                {/* Header */}
                <div className="admin-login-header">
                    <div className="admin-shield-icon">
                        <Shield size={28} strokeWidth={1.5} />
                    </div>
                    <h1 className="admin-login-title">Admin Portal</h1>
                    <p className="admin-login-subtitle">
                        Secure access for authorized administrators only
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="admin-login-form">
                    {error && (
                        <div className="admin-error-banner">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="admin-field">
                        <label htmlFor="admin-email" className="admin-label">
                            Email Address
                        </label>
                        <div className="admin-input-wrapper">
                            <Mail size={16} className="admin-input-icon" />
                            <input
                                id="admin-email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="admin-input"
                            />
                        </div>
                    </div>

                    <div className="admin-field">
                        <label htmlFor="admin-password" className="admin-label">
                            Password
                        </label>
                        <div className="admin-input-wrapper">
                            <Lock size={16} className="admin-input-icon" />
                            <input
                                id="admin-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="admin-input admin-input-password"
                            />
                            <button
                                type="button"
                                className="admin-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        id="admin-login-btn"
                        type="submit"
                        disabled={loading}
                        className="admin-submit-btn"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="admin-spinner" />
                                Authenticating…
                            </>
                        ) : (
                            <>
                                <Shield size={18} />
                                Sign in to Admin Panel
                            </>
                        )}
                    </button>
                </form>

                <p className="admin-login-footer">
                    🔒 This area is restricted to authorized personnel only.
                    <br />
                    Unauthorized access attempts are logged and monitored.
                </p>
            </div>

            <style>{`
        .admin-login-bg {
          background: linear-gradient(135deg, #0d0d1a 0%, #0f1629 50%, #0d1117 100%);
          position: relative;
          overflow: hidden;
        }

        .admin-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: adminBlobFloat 8s ease-in-out infinite;
        }
        .admin-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #6366f1, #8b5cf6);
          top: -15%; left: -10%;
          animation-delay: 0s;
        }
        .admin-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #06b6d4, #3b82f6);
          bottom: -10%; right: -5%;
          animation-delay: 3s;
        }
        .admin-blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #a855f7, #ec4899);
          top: 40%; left: 60%;
          animation-delay: 6s;
        }

        @keyframes adminBlobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 20px) scale(0.95); }
        }

        .admin-login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(15, 20, 40, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px;
          padding: 40px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 20px 60px rgba(0,0,0,0.6),
            0 0 80px rgba(99,102,241,0.08);
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .admin-shield-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          margin-bottom: 16px;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }

        .admin-login-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
        }

        .admin-login-subtitle {
          font-size: 0.875rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.875rem;
        }

        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #cbd5e1;
          letter-spacing: 0.01em;
        }

        .admin-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-input-icon {
          position: absolute;
          left: 14px;
          color: #64748b;
          pointer-events: none;
        }

        .admin-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          background: rgba(30, 41, 59, 0.7);
          border: 1.5px solid rgba(100, 116, 139, 0.25);
          border-radius: 12px;
          color: #f1f5f9;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .admin-input::placeholder {
          color: #475569;
        }

        .admin-input:focus {
          border-color: rgba(99, 102, 241, 0.6);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
        }

        .admin-input-password {
          padding-right: 44px;
        }

        .admin-eye-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .admin-eye-btn:hover { color: #94a3b8; }

        .admin-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }

        .admin-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(99,102,241,0.55);
        }

        .admin-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .admin-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .admin-login-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.7;
        }
      `}</style>
        </div>
    );
}
