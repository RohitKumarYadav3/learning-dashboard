import { Suspense } from "react";
import HeroTile from "@/components/dashboard/HeroTile";
import ActivityTile from "@/components/dashboard/ActivityTile";
import StatsTile from "@/components/dashboard/StatsTile";
import CoursesGrid from "@/components/dashboard/CoursesGrid";
import { CourseCardSkeleton } from "@/components/ui/Skeletons";

export default function DashboardPage() {
  return (
    <main
      className="flex-1 min-h-screen overflow-y-auto pb-24 md:pb-8"
      aria-label="Learning dashboard"
    >
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(99,190,255,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(155,125,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Page header */}
      <header className="px-4 md:px-6 lg:px-8 pt-6 pb-2">
        <p className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">
          Dashboard • Overview
        </p>
      </header>

      {/* Bento Grid */}
      <section
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 lg:p-8 pt-3"
        aria-label="Dashboard tiles"
      >
        {/* Hero — spans full width on mobile, 2 cols on md, 4 cols on xl */}
        <div className="col-span-2 lg:col-span-4">
          <HeroTile
            name="Alex"
            streak={14}
            totalXp={4820}
            todayMinutes={47}
          />
        </div>

        {/* Stats tile */}
        <div className="col-span-2 md:col-span-1">
          <StatsTile delay={0.12} />
        </div>

        {/* Activity tile */}
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <ActivityTile delay={0.18} />
        </div>

        {/* Section heading */}
        <div className="col-span-2 lg:col-span-4 flex items-center justify-between">
          <h2
            className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase"
          >
            Active Courses
          </h2>
          <a
            href="#"
            className="text-xs text-[var(--primary)] hover:text-[var(--text-primary)] transition-colors"
          >
            View all →
          </a>
        </div>

        {/* Courses — fetched from Supabase via Server Component */}
        <Suspense
          fallback={
            <>
              {[...Array(4)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </>
          }
        >
          <CoursesGrid />
        </Suspense>
      </section>
    </main>
  );
}
