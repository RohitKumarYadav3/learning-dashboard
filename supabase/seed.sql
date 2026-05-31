-- ============================================================
-- LearnOS — Supabase Setup Script
-- Run this in your Supabase SQL editor
-- ============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text          NOT NULL,
  progress    integer       NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text          NOT NULL DEFAULT 'BookOpen',
  created_at  timestamptz   NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security (allow public read for this demo)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON public.courses
  FOR SELECT
  USING (true);

-- 3. Seed with demo data
INSERT INTO public.courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',          75,  'Atom'),
  ('System Design Fundamentals',       42,  'Network'),
  ('TypeScript Deep Dive',             91,  'Code2'),
  ('Data Structures & Algorithms',     28,  'BrainCircuit');
