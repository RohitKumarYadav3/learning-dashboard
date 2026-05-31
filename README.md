# LearnOS — Student Dashboard

A futuristic, highly animated learning dashboard built with **Next.js 15 App Router**, **Supabase**, **Tailwind CSS**, and **Framer Motion**.

![LearnOS Dashboard](https://placehold.co/1200x630/080b10/63beff?text=LearnOS+Dashboard)



---

## 🏗 Architecture Overview

### Server / Client Component Split

The dashboard is deliberately split along the RSC boundary:

| Component | Type | Reason |
|---|---|---|
| `app/layout.tsx` | Server | Static shell; no interactivity needed |
| `app/page.tsx` | Server | Orchestrates Suspense boundaries |
| `components/dashboard/CoursesGrid.tsx` | **Server** | `await`s Supabase fetch securely |
| `components/dashboard/HeroTile.tsx` | Client | Framer Motion entrance animations |
| `components/dashboard/ActivityTile.tsx` | Client | Framer Motion cell animations |
| `components/dashboard/StatsTile.tsx` | Client | Animated counters via `useEffect` |
| `components/layout/Sidebar.tsx` | Client | `useState` for collapse/active item |
| `components/ui/BentoTile.tsx` | Client | `whileHover` spring physics |
| `components/ui/ProgressBar.tsx` | Client | `animate` on mount |

**Key principle:** Data fetching happens exclusively in Server Components; only UI that _must_ be interactive is `"use client"`. This avoids shipping unnecessary JS to the browser and keeps the bundle lean.

### Why `@supabase/ssr`?

The `@supabase/ssr` package creates a cookie-aware Supabase client that works in the Next.js App Router environment. On the server, it reads cookies from `next/headers` — this is important for auth scenarios where RLS policies check the user's JWT. Even for a public `SELECT`, using `@supabase/ssr` keeps the pattern consistent and ready for auth extension.

### Suspense Strategy

`CoursesGrid` is wrapped in `<Suspense>` with `CourseCardSkeleton` fallbacks. This means:
1. The shell (Hero, Stats, Activity) renders immediately
2. Course tiles show shimmer skeletons while the Supabase query is in flight
3. Once data resolves, cards stagger in via Framer Motion entrance animations

An additional `app/loading.tsx` covers the initial full-page load for the route.

---

## ✨ Animation Decisions

### Staggered Entrance
Each `BentoTile` receives a `delay` prop that staggers the `opacity + translateY` entrance. Delays are computed as `0.05 + index * 0.08s` — fast enough to feel snappy, slow enough to perceive the cascade.

### Spring Physics for Hover
`BentoTile` uses `whileHover={{ scale: 1.012 }}` with `type: "spring", stiffness: 300, damping: 20`. This gives a natural, slightly bouncy feel — not a linear CSS transition.

### Zero Layout Shifts
All hover animations use **`transform: scale()`** — this runs on the GPU compositor thread and never triggers layout recalculation. No `width`, `height`, `padding`, or `margin` values change on hover.

### Sidebar `layoutId`
The active nav highlight uses `layoutId="nav-highlight"`. Framer Motion automatically animates the highlight between nav items when `activeItem` changes, creating a smooth "pill slides to new position" effect without any manual `left`/`top` calculations.

---

## 🗄 Database Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/seed.sql`
3. Copy your Project URL and anon key from **Settings → API**

### Schema

```sql
CREATE TABLE public.courses (
  id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text         NOT NULL,
  progress    integer      NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text         NOT NULL DEFAULT 'BookOpen',
  created_at  timestamptz  NOT NULL DEFAULT now()
);
```

`icon_name` maps to a Lucide icon component name (e.g. `"Atom"`, `"Network"`, `"Code2"`). The `DynamicIcon` component resolves these at render time.

---

## 🛠 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/your-username/learning-dashboard.git
cd learning-dashboard

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📦 Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Set these environment variables in your Vercel project dashboard:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

> **Note:** Never commit `.env` or `.env.local`. Only `.env.example` (with placeholder values) is committed.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Server Component)
│   ├── page.tsx            # Dashboard page with Suspense
│   ├── loading.tsx         # Full-page skeleton loader
│   └── not-found.tsx       # 404 page
├── components/
│   ├── dashboard/
│   │   ├── CoursesGrid.tsx # Server Component — fetches from Supabase
│   │   ├── CourseCard.tsx  # Individual course tile
│   │   ├── HeroTile.tsx    # Welcome greeting + streak
│   │   ├── ActivityTile.tsx# Contribution graph
│   │   └── StatsTile.tsx   # Animated stats grid
│   ├── layout/
│   │   └── Sidebar.tsx     # Collapsible nav with layoutId
│   └── ui/
│       ├── BentoTile.tsx   # Base tile with spring hover
│       ├── ProgressBar.tsx # Animated progress bar
│       ├── DynamicIcon.tsx # Lucide icon resolver
│       ├── Skeletons.tsx   # Loading skeleton components
│       └── ErrorCard.tsx   # Graceful error display
├── lib/
│   ├── supabase/
│   │   ├── server.ts       # SSR Supabase client
│   │   └── client.ts       # Browser Supabase client
│   ├── data.ts             # getCourses() + demo fallback
│   ├── activity.ts         # Activity graph data generator
│   └── utils.ts            # cn() helper
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🧩 Challenges & Solutions

**Challenge:** Framer Motion requires `"use client"`, but data fetching needs Server Components.  
**Solution:** `CoursesGrid` is a Server Component that fetches data and renders `CourseCard` (a client component). RSC composition allows this cleanly — the data flows as props.

**Challenge:** `icon_name` stored as a string in DB needs to map to actual Lucide components.  
**Solution:** `DynamicIcon` maintains an explicit allow-list of icon names mapped to imported components. This avoids `eval()` and keeps tree-shaking intact.

**Challenge:** Activity graph with 365 cells could be slow to animate.  
**Solution:** Stagger delay is kept minimal (`wi * 0.003s`), so the total stagger across ~52 weeks is only ~156ms. Each cell is a simple `opacity + scale` — GPU-only transforms.

---

## 📋 Tech Stack

| Tool | Version | Role |
|---|---|---|
| Next.js | 15 | Framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Supabase | 2.x | PostgreSQL BaaS |
| @supabase/ssr | 0.5.x | Server-side Supabase client |
| Framer Motion | 11 | Animations |
| Tailwind CSS | 3.4 | Styling |
| Lucide React | 0.5x | Icons |
