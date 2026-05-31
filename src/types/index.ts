// Database types matching the Supabase schema
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  avatar_url?: string;
  streak: number;
  total_xp: number;
}

// Nav item type for sidebar
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

// Activity graph cell
export interface ActivityCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Supabase response wrappers
export type CoursesResponse = {
  data: Course[] | null;
  error: string | null;
};
