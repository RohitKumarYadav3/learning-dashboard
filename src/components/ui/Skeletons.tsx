export function CourseCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-4 min-h-[160px] overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Icon skeleton */}
      <div className="w-10 h-10 rounded-xl skeleton" />

      {/* Text skeletons */}
      <div className="flex-1 space-y-2">
        <div className="h-4 rounded-lg skeleton w-3/4" />
        <div className="h-3 rounded-lg skeleton w-1/3" />
      </div>

      {/* Progress bar skeleton */}
      <div className="h-1 rounded-full skeleton w-full" />
    </div>
  );
}

export function HeroTileSkeleton() {
  return (
    <div
      className="col-span-2 rounded-2xl border border-[var(--border)] p-6 md:p-8 min-h-[200px] flex items-center gap-6"
      style={{ background: "var(--surface)" }}
    >
      <div className="flex-1 space-y-3">
        <div className="h-3 w-24 rounded skeleton" />
        <div className="h-10 w-56 rounded-lg skeleton" />
        <div className="h-4 w-80 rounded skeleton" />
      </div>
      <div className="space-y-3 hidden md:block">
        <div className="h-14 w-32 rounded-xl skeleton" />
        <div className="h-14 w-32 rounded-xl skeleton" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6 lg:p-8">
      <HeroTileSkeleton />
      <div className="h-40 rounded-2xl skeleton" />
      <div className="h-40 rounded-2xl skeleton" />
      {[...Array(4)].map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
      <div className="col-span-2 h-48 rounded-2xl skeleton" />
    </div>
  );
}
