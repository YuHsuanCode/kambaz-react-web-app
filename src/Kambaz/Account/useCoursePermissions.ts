import { useSelector } from "react-redux";

/**
 * ADMIN: full course management.
 * FACULTY / TA: manage courses, modules, and assignments.
 * STUDENT / USER: read-only in course content; STUDENT/USER dashboard enroll flow.
 */
export function useCoursePermissions() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const role = currentUser?.role ?? "";
  const canManageCourse =
    role === "ADMIN" || role === "FACULTY" || role === "TA";
  const isReadOnlyInCourse = role === "STUDENT" || role === "USER";
  const isStudentDashboard = role === "STUDENT" || role === "USER";
  const isAdmin = role === "ADMIN";

  return {
    canManageCourse,
    isReadOnlyInCourse,
    isStudentDashboard,
    isAdmin,
    role,
  };
}
