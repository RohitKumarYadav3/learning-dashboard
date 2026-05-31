"use client";

import { motion } from "framer-motion";
import { Flame, Star, TrendingUp, Clock } from "lucide-react";
import BentoTile from "@/components/ui/BentoTile";

interface HeroTileProps {
  name?: string;
  streak?: number;
  totalXp?: number;
  todayMinutes?: number;
}

export default function HeroTile({
  name = "Alex",
  streak = 14,
  totalXp = 4820,
  todayMinutes = 47,
}: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <BentoTile
      delay={0.05}
      glowColor="blue"
      className="col-span-2 lg:col-span-2 row-span-1 min-h-[200px] p-6 md:p-8"
    >
      {/* Abstract gradient mesh background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 10% 50%, rgba(99,190,255,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 90% 20%, rgba(155,125,255,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <motion.p
            className="text-sm font-medium text-[var(--text-muted)] mb-1 tracking-wide uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            {greeting},
          </motion.p>
          <motion.h1
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[var(--text-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Welcome back,{" "}
            <span className="gradient-text">{name}</span> 👋
          </motion.h1>
          <motion.p
            className="text-sm text-[var(--text-secondary)] max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            You're on a roll! Keep learning to maintain your streak and unlock
            new achievements.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="flex flex-row md:flex-col gap-3 md:gap-3 flex-shrink-0"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
        >
          {/* Streak */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)]"
            style={{ background: "rgba(249,115,22,0.08)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
              <Flame size={16} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider leading-none mb-0.5">
                Streak
              </p>
              <p className="text-lg font-display font-bold text-orange-400 leading-none">
                {streak}d
              </p>
            </div>
          </div>

          {/* XP */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)]"
            style={{ background: "var(--primary-muted)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,190,255,0.15)" }}>
              <Star size={16} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider leading-none mb-0.5">
                Total XP
              </p>
              <p className="text-lg font-display font-bold text-[var(--primary)] leading-none">
                {totalXp.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Today */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)] hidden md:flex"
            style={{ background: "rgba(155,125,255,0.08)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(155,125,255,0.15)" }}>
              <Clock size={16} className="text-[var(--secondary)]" />
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider leading-none mb-0.5">
                Today
              </p>
              <p className="text-lg font-display font-bold text-[var(--secondary)] leading-none">
                {todayMinutes}m
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </BentoTile>
  );
}
