"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
  Bell,
  Search,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 4 },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "achievements", label: "Achievements", icon: Trophy, badge: 2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 5 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* ─── Desktop Sidebar ─────────────────────────────────────────── */}
      <motion.nav
        aria-label="Primary navigation"
        className="hidden md:flex flex-col h-screen sticky top-0 border-r border-[var(--border)] overflow-hidden z-40"
        initial={false}
        animate={{ width: isCollapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        style={{ background: "var(--surface)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)]">
          <div className="relative flex-shrink-0 w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={18} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <span
                  className="text-[15px] font-display font-800 tracking-tight text-[var(--text-primary)] whitespace-nowrap"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Learn<span className="gradient-text">OS</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3 py-3"
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-glow)] transition-all duration-200 text-sm"
                style={{ background: "var(--background)" }}
              >
                <Search size={14} />
                <span>Quick search…</span>
                <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">
                  ⌘K
                </kbd>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Items */}
        <ul className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} role="listitem">
              <button
                onClick={() => setActiveItem(item.id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 group"
                style={{
                  color:
                    activeItem === item.id
                      ? "var(--primary)"
                      : "var(--text-secondary)",
                }}
                aria-current={activeItem === item.id ? "page" : undefined}
              >
                {/* Active bg highlight with layoutId */}
                {activeItem === item.id && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--primary-muted)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                {/* Hover bg */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ background: "var(--surface-elevated)" }} />

                {/* Icon */}
                <span className="relative flex-shrink-0">
                  <item.icon size={18} strokeWidth={activeItem === item.id ? 2.2 : 1.8} />
                </span>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {item.badge && !isCollapsed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative ml-auto text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "var(--primary-muted)",
                      color: "var(--primary)",
                    }}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* User pill */}
        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              }}
            >
              AL
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0"
                >
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    Alex Learner
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    Pro plan
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-5 -right-3 w-6 h-6 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--border-glow)] transition-colors duration-200 z-50"
          style={{ background: "var(--surface)" }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={12} className="text-[var(--text-muted)]" />
          ) : (
            <ChevronLeft size={12} className="text-[var(--text-muted)]" />
          )}
        </button>
      </motion.nav>

      {/* ─── Mobile Bottom Nav ──────────────────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] flex items-center justify-around px-2 py-2"
        style={{ background: "var(--surface)" }}
      >
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150"
            style={{
              color:
                activeItem === item.id
                  ? "var(--primary)"
                  : "var(--text-muted)",
            }}
            aria-label={item.label}
            aria-current={activeItem === item.id ? "page" : undefined}
          >
            {activeItem === item.id && (
              <motion.div
                layoutId="mobile-nav-highlight"
                className="absolute inset-0 rounded-lg"
                style={{ background: "var(--primary-muted)" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <item.icon size={20} strokeWidth={activeItem === item.id ? 2.2 : 1.8} className="relative" />
            <span className="relative text-[10px] font-medium">{item.label.split(" ")[0]}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
