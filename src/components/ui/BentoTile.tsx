"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoTileProps extends Omit<HTMLMotionProps<"article">, "ref"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "orange" | "none";
  delay?: number;
}

const glowMap = {
  blue: "hover:shadow-[0_0_30px_rgba(99,190,255,0.12),0_0_80px_rgba(99,190,255,0.04)] hover:border-[rgba(99,190,255,0.25)]",
  purple: "hover:shadow-[0_0_30px_rgba(155,125,255,0.12),0_0_80px_rgba(155,125,255,0.04)] hover:border-[rgba(155,125,255,0.25)]",
  orange: "hover:shadow-[0_0_30px_rgba(249,115,22,0.12),0_0_80px_rgba(249,115,22,0.04)] hover:border-[rgba(249,115,22,0.25)]",
  none: "",
};

export default function BentoTile({
  children,
  className,
  glowColor = "blue",
  delay = 0,
  ...props
}: BentoTileProps) {
  return (
    <motion.article
      className={cn(
        "relative rounded-2xl border border-[var(--border)] overflow-hidden noise-overlay",
        "transition-[border-color,box-shadow] duration-300",
        glowMap[glowColor],
        className
      )}
      style={{ background: "var(--surface)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.012,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
