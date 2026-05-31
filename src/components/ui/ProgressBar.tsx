"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: number;
  delay?: number;
}

export default function ProgressBar({
  value,
  color = "var(--primary)",
  height = 4,
  delay = 0,
}: ProgressBarProps) {
  return (
    <div
      className="relative w-full rounded-full overflow-hidden"
      style={{
        height,
        background: "rgba(255,255,255,0.06)",
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}99 0%, ${color} 100%)`,
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{
          delay,
          duration: 1.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
      {/* Shimmer on top */}
      <motion.div
        className="absolute inset-y-0 w-16 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
        initial={{ left: "-10%" }}
        animate={{ left: "110%" }}
        transition={{
          delay: delay + 0.8,
          duration: 0.8,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
