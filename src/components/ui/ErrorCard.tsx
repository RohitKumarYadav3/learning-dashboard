"use client";

import { AlertTriangle } from "lucide-react";

interface ErrorCardProps {
  message?: string;
  title?: string;
}

export default function ErrorCard({
  title = "Failed to load courses",
  message = "Unable to connect to the database. Showing demo data instead.",
}: ErrorCardProps) {
  return (
    <div
      className="col-span-2 rounded-2xl border border-orange-500/20 p-5 flex items-start gap-3"
      style={{ background: "rgba(249,115,22,0.05)" }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(249,115,22,0.15)" }}
      >
        <AlertTriangle size={16} className="text-orange-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-orange-300 mb-0.5">{title}</p>
        <p className="text-xs text-[var(--text-muted)]">{message}</p>
      </div>
    </div>
  );
}
