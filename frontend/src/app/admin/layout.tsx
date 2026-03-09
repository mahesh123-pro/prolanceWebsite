"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/resources", label: "Resources", icon: BookOpen },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth guard — skip when on the login route itself
  useEffect(() => {
    if (pathname === "/admin/login") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthChecked(true);
      return;
    }
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");
    if (!token || !user) {
      router.replace("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(user));
    setAuthChecked(true);
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out from admin panel");
    router.push("/admin/login");
  };

  // Close sidebar on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [pathname]);

  if (!authChecked) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  // Login page renders without the sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "admin-sidebar-open" : ""}`}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <div className="admin-logo-icon">
            <Shield size={20} strokeWidth={1.5} />
          </div>
          <div className="admin-logo-text">
            <span className="admin-logo-name">Prolance</span>
            <span className="admin-logo-badge">Admin</span>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="admin-nav">
          <p className="admin-nav-section-label">Main Menu</p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`admin-nav-item ${active ? "admin-nav-item-active" : ""}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <ChevronRight size={14} className="admin-nav-chevron" />}
              </Link>
            );
          })}
        </nav>

        {/* Admin user info */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {adminUser?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="admin-user-details">
              <p className="admin-user-name">{adminUser?.name || "Admin"}</p>
              <p className="admin-user-role">Administrator</p>
            </div>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="admin-topbar-right">
            <div className="admin-topbar-badge">
              <Shield size={14} />
              Admin Mode
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">{children}</main>
      </div>

      <style>{`
        /* ── Reset & base ── */
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #0b0f1a;
          color: #e2e8f0;
          font-family: inherit;
        }

        /* ── Loading ── */
        .admin-loading-screen {
          min-height: 100vh;
          background: #0b0f1a;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .admin-loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(99,102,241,0.2);
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: adminSpin 0.8s linear infinite;
        }
        @keyframes adminSpin {
          to { transform: rotate(360deg); }
        }

        /* ── Overlay (mobile) ── */
        .admin-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 40;
          backdrop-filter: blur(4px);
        }

        /* ── Sidebar ── */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 260px;
          background: rgba(13, 17, 35, 0.95);
          border-right: 1px solid rgba(99,102,241,0.12);
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(12px);
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar-open {
            transform: translateX(0);
          }
        }

        .admin-sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .admin-logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          flex-shrink: 0;
        }

        .admin-logo-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .admin-logo-name {
          font-size: 1rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1;
        }
        .admin-logo-badge {
          font-size: 0.6875rem;
          font-weight: 500;
          color: #a78bfa;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .admin-sidebar-close {
          display: none;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .admin-sidebar-close:hover { color: #94a3b8; }
        @media (max-width: 768px) {
          .admin-sidebar-close { display: flex; }
        }

        /* ── Navigation ── */
        .admin-nav {
          flex: 1;
          padding: 16px 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .admin-nav-section-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 8px 8px 4px;
          margin-bottom: 4px;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          position: relative;
        }

        .admin-nav-item:hover {
          background: rgba(99,102,241,0.08);
          color: #c4b5fd;
        }

        .admin-nav-item-active {
          background: rgba(99,102,241,0.15);
          color: #a78bfa;
        }

        .admin-nav-chevron {
          margin-left: auto;
          opacity: 0.6;
        }

        /* ── Sidebar footer ── */
        .admin-sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          flex-shrink: 0;
        }

        .admin-user-details { flex: 1; overflow: hidden; }
        .admin-user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .admin-user-role {
          font-size: 0.75rem;
          color: #a78bfa;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 9px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .admin-logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
        }

        /* ── Main content ── */
        .admin-main {
          flex: 1;
          margin-left: 260px;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .admin-main { margin-left: 0; }
        }

        /* ── Top bar ── */
        .admin-topbar {
          height: 64px;
          background: rgba(13, 17, 35, 0.85);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(12px);
        }

        .admin-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .admin-menu-btn:hover { background: rgba(255,255,255,0.06); color: #e2e8f0; }
        @media (max-width: 768px) {
          .admin-menu-btn { display: flex; }
        }

        .admin-topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-left: auto;
        }

        .admin-topbar-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: #a78bfa;
        }

        /* ── Page content ── */
        .admin-content {
          flex: 1;
          padding: 32px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .admin-content { padding: 16px; }
        }
      `}</style>
    </div>
  );
}
