"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BentoTile from "@/components/ui/BentoTile";
import ProgressBar from "@/components/ui/ProgressBar";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  delay?: number;
  index?: number;
}

const GRADIENT_PRESETS = [
  "radial-gradient(ellipse 80% 80% at 0% 0%, rgba(99,190,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(155,125,255,0.12) 0%, transparent 60%)",
  "radial-gradient(ellipse 80% 80% at 100% 0%, rgba(155,125,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(99,190,255,0.12) 0%, transparent 60%)",
  "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(249,115,22,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 50% 100%, rgba(99,190,255,0.1) 0%, transparent 60%)",
  "radial-gradient(ellipse 80% 80% at 0% 100%, rgba(99,190,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 100% 0%, rgba(249,115,22,0.12) 0%, transparent 60%)",
];

const ICON_COLOR_PRESETS = [
  "var(--primary)",
  "var(--secondary)",
  "#f97316",
  "var(--primary)",
];

const ICON_BG_PRESETS = [
  "rgba(99,190,255,0.12)",
  "rgba(155,125,255,0.12)",
  "rgba(249,115,22,0.12)",
  "rgba(99,190,255,0.12)",
];

export default function CourseCard({
  course,
  delay = 0,
  index = 0,
}: CourseCardProps) {
  const gradientBg = GRADIENT_PRESETS[index % GRADIENT_PRESETS.length];
  const iconColor = ICON_COLOR_PRESETS[index % ICON_COLOR_PRESETS.length];
  const iconBg = ICON_BG_PRESETS[index % ICON_BG_PRESETS.length];

  return (
    <BentoTile
      delay={delay}
      glowColor={index % 3 === 1 ? "purple" : index % 3 === 2 ? "orange" : "blue"}
      className="group p-5 flex flex-col gap-4 min-h-[160px]"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-100" style={{ background: gradientBg }} />

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--border)]"
          style={{ background: iconBg }}
        >
          <DynamicIcon
            name={course.icon_name}
            size={18}
            color={iconColor}
            strokeWidth={1.8}
          />
        </div>

        {/* Arrow - visible on hover */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5"
          whileHover={{ x: 2, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowUpRight size={16} className="text-[var(--text-muted)]" />
        </motion.div>
      </div>

      {/* Title */}
      <div className="relative z-10 flex-1">
        <h2
          className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-1"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {course.title}
        </h2>
        <p className="text-xs text-[var(--text-muted)]">
          {course.progress}% complete
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10">
        <ProgressBar
          value={course.progress}
          color={iconColor}
          height={4}
          delay={delay + 0.3}
        />
      </div>
    </BentoTile>
  );
}
