import { getCourses, DEMO_COURSES } from "@/lib/data";
import CourseCard from "@/components/dashboard/CourseCard";
import ErrorCard from "@/components/ui/ErrorCard";

export default async function CoursesGrid() {
  const { data, error } = await getCourses();

  // Fall back to demo data if DB unavailable
  const courses = data && data.length > 0 ? data : DEMO_COURSES;
  const hasError = !!error || !data || data.length === 0;

  return (
    <>
      {hasError && error && (
        <ErrorCard
          title="Database connection issue"
          message="Showing demo data. Check your Supabase env vars or connection."
        />
      )}

      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          index={index}
          delay={0.1 + index * 0.08}
        />
      ))}
    </>
  );
}
