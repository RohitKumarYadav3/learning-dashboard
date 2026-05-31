"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Clock, Award } from "lucide-react";
import BentoTile from "@/components/ui/BentoTile";

interface StatItem {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  delta?: string;
}

const STATS: StatItem[] = [
  {
    label: "Courses Active",
    value: 4,
    unit: "",
    icon: Target,
    color: "var(--primary)",
    bg: "rgba(99,190,255,0.1)",
    delta: "+1 this week",
  },
  {
    label: "Hours Learned",
    value: 127,
    unit: "h",
    icon: Clock,
    color: "var(--secondary)",
    bg: "rgba(155,125,255,0.1)",
    delta: "18h this month",
  },
  {
    label: "Certificates",
    value: 3,
    unit: "",
    icon: Award,
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    delta: "+1 pending",
  },
  {
    label: "Weekly Goal",
    value: 86,
    unit: "%",
    icon: TrendingUp,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    delta: "On track",
  },
];

function AnimatedNumber({ target, delay }: { target: number; delay: number }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (started.current) return;
      started.current = true;

      const duration = 1200;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return <>{count}</>;
}

export default function StatsTile({ delay = 0 }: { delay?: number }) {
  return (
    <BentoTile
      delay={delay}
      glowColor="blue"
      className="p-5 md:p-6"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 0% 0%, rgba(99,190,255,0.5) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <h2
          className="text-sm font-semibold text-[var(--text-secondary)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your Progress
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-xl p-3 border border-[var(--border)]"
              style={{ background: stat.bg }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.1 + i * 0.07, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={13} color={stat.color} strokeWidth={2} />
                <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-end gap-0.5">
                <span
                  className="text-2xl font-display font-bold leading-none"
                  style={{ color: stat.color, fontFamily: "var(--font-display)" }}
                >
                  <AnimatedNumber target={stat.value} delay={delay + 0.2 + i * 0.07} />
                </span>
                <span
                  className="text-sm font-bold mb-0.5 ml-0.5"
                  style={{ color: stat.color }}
                >
                  {stat.unit}
                </span>
              </div>
              {stat.delta && (
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  {stat.delta}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </BentoTile>
  );
}
