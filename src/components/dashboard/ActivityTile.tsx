"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import BentoTile from "@/components/ui/BentoTile";
import { generateActivityData } from "@/lib/activity";
import type { ActivityCell } from "@/types";

const LEVEL_COLORS: Record<ActivityCell["level"], string> = {
  0: "rgba(255,255,255,0.04)",
  1: "rgba(99,190,255,0.2)",
  2: "rgba(99,190,255,0.45)",
  3: "rgba(99,190,255,0.7)",
  4: "rgba(99,190,255,0.95)",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function ActivityTile({ delay = 0 }: { delay?: number }) {
  const [mounted, setMounted] = useState(false);
  const data = useMemo(() => mounted ? generateActivityData() : [], [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Group into weeks (columns)
  const weeks: ActivityCell[][] = [];
  let week: ActivityCell[] = [];

  data.forEach((cell, i) => {
    week.push(cell);
    if (week.length === 7 || i === data.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  // Get month labels (show month name on first week it appears)
  const monthLabels: { weekIdx: number; label: string }[] = [];
  weeks.forEach((w, wi) => {
    const firstDate = new Date(w[0].date);
    if (wi === 0 || firstDate.getDate() <= 7) {
      const m = firstDate.getMonth();
      if (!monthLabels.find((ml) => ml.label === MONTHS[m])) {
        monthLabels.push({ weekIdx: wi, label: MONTHS[m] });
      }
    }
  });

  const totalContributions = data.reduce((sum, c) => sum + c.count, 0);

  return (
    <BentoTile
      delay={delay}
      glowColor="purple"
      className="col-span-2 lg:col-span-1 p-5 md:p-6"
    >
      {/* Gradient bg */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(155,125,255,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(155,125,255,0.15)" }}
            >
              <Activity size={14} className="text-[var(--secondary)]" />
            </div>
            <h2
              className="text-sm font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Activity
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono" suppressHydrationWarning>
            {totalContributions.toLocaleString()} actions
          </span>
        </div>

        {/* Graph */}
        <div className="overflow-x-auto pb-1">
          <div className="min-w-max">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-1 pl-0">
              {weeks.map((_, wi) => {
                const label = monthLabels.find((ml) => ml.weekIdx === wi);
                return (
                  <div key={wi} className="w-[10px] flex-shrink-0">
                    {label && (
                      <span className="text-[9px] text-[var(--text-muted)] font-mono">
                        {label.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell, di) => (
                    <motion.div
                      key={`${wi}-${di}`}
                      title={`${cell.date}: ${cell.count} actions`}
                      className="w-[10px] h-[10px] rounded-[2px] flex-shrink-0 cursor-pointer"
                      style={{ background: LEVEL_COLORS[cell.level] }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: delay + (wi * 0.003),
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 1.6,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        },
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-[10px] text-[var(--text-muted)]">Less</span>
          {([0, 1, 2, 3, 4] as ActivityCell["level"][]).map((level) => (
            <div
              key={level}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ background: LEVEL_COLORS[level] }}
            />
          ))}
          <span className="text-[10px] text-[var(--text-muted)]">More</span>
        </div>
      </div>
    </BentoTile>
  );
}
