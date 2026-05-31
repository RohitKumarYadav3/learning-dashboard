import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-8xl font-display font-bold gradient-text mb-4"
           style={{ fontFamily: "var(--font-display)" }}>
          404
        </p>
        <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Page not found
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="text-sm text-[var(--primary)] hover:underline"
        >
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
