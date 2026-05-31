import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Course, CoursesResponse } from "@/types";

export async function getCourses(): Promise<CoursesResponse> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[getCourses] Supabase error:", error.message);
      return { data: null, error: error.message };
    }

    return { data: data as Course[], error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error fetching courses";
    console.error("[getCourses] Unexpected error:", message);
    return { data: null, error: message };
  }
}

// Fallback demo courses if DB is unavailable or empty
export const DEMO_COURSES: Course[] = [
  {
    id: "demo-1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Atom",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    title: "System Design Fundamentals",
    progress: 42,
    icon_name: "Network",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    title: "TypeScript Deep Dive",
    progress: 91,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    title: "Data Structures & Algorithms",
    progress: 28,
    icon_name: "BrainCircuit",
    created_at: new Date().toISOString(),
  },
];
