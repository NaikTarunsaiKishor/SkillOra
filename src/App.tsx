
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CodingPage from "./pages/CodingPage";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AcademicCourses from "./pages/AcademicCourses";
import CodingTracks from "./pages/CodingTracks";
import Assignments from "./pages/Assignments";
import Assessments from "./pages/Assessments";
import Progress from "./pages/Progress";
import Calendar from "./pages/Calendar";
import FacultyCourses from "./pages/FacultyCourses";
import FacultyStudents from "./pages/FacultyStudents";
import FacultyContent from "./pages/FacultyContent";
import AdminFaculty from "./pages/AdminFaculty";
import AdminStudents from "./pages/AdminStudents";
import AdminReports from "./pages/AdminReports";
import StudentAttendance from "./pages/StudentAttendance";
import FacultyAttendance from "./pages/FacultyAttendance";
import StudentAiIDE from "./pages/StudentAiIDE";
import ClubActivities from "./pages/ClubActivities";
import LiveStudyRoom from "./pages/LiveStudyRoom";
import DoubtDiscussion from "./pages/DoubtDiscussion";
import Circulars from "./pages/Circulars";

const queryClient = new QueryClient();

const RequireAuth = ({ children, userType }: { children: JSX.Element, userType?: string }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUserType = localStorage.getItem('userType');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && currentUserType !== userType) {
    // Redirect to the appropriate dashboard based on user type
    if (currentUserType === 'student') {
      return <Navigate to="/dashboard" replace />;
    } else if (currentUserType === 'faculty') {
      return <Navigate to="/faculty" replace />;
    } else if (currentUserType === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }
  
  return children;
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading app resources
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-campus-600 border-r-campus-600 border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading SkillOra...</h2>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Student Routes - require student auth */}
            <Route path="/dashboard" element={
              <RequireAuth userType="student">
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/academic" element={
              <RequireAuth userType="student">
                <AcademicCourses />
              </RequireAuth>
            } />
            <Route path="/coding" element={
              <RequireAuth userType="student">
                <CodingTracks />
              </RequireAuth>
            } />
            <Route path="/coding/problem/:id" element={
              <RequireAuth userType="student">
                <CodingPage />
              </RequireAuth>
            } />
            <Route path="/assignments" element={
              <RequireAuth userType="student">
                <Assignments />
              </RequireAuth>
            } />
            <Route path="/assessments" element={
              <RequireAuth userType="student">
                <Assessments />
              </RequireAuth>
            } />
            <Route path="/progress" element={
              <RequireAuth userType="student">
                <Progress />
              </RequireAuth>
            } />
            <Route path="/calendar" element={
              <RequireAuth userType="student">
                <Calendar />
              </RequireAuth>
            } />
            <Route path="/attendance" element={
              <RequireAuth userType="student">
                <StudentAttendance />
              </RequireAuth>
            } />
            <Route path="/ai-ide" element={
              <RequireAuth userType="student">
                <StudentAiIDE />
              </RequireAuth>
            } />
            <Route path="/clubs" element={
              <RequireAuth userType="student">
                <ClubActivities />
              </RequireAuth>
            } />
            <Route path="/studyrooms" element={
              <RequireAuth userType="student">
                <LiveStudyRoom />
              </RequireAuth>
            } />
            <Route path="/discussions" element={
              <RequireAuth userType="student">
                <DoubtDiscussion />
              </RequireAuth>
            } />
            <Route path="/circulars" element={
              <RequireAuth userType="student">
                <Circulars />
              </RequireAuth>
            } />
            
            {/* Faculty Routes - require faculty auth */}
            <Route path="/faculty" element={
              <RequireAuth userType="faculty">
                <FacultyDashboard />
              </RequireAuth>
            } />
            <Route path="/faculty/courses" element={
              <RequireAuth userType="faculty">
                <FacultyCourses />
              </RequireAuth>
            } />
            <Route path="/faculty/students" element={
              <RequireAuth userType="faculty">
                <FacultyStudents />
              </RequireAuth>
            } />
            <Route path="/faculty/content" element={
              <RequireAuth userType="faculty">
                <FacultyContent />
              </RequireAuth>
            } />
            <Route path="/faculty/attendance" element={
              <RequireAuth userType="faculty">
                <FacultyAttendance />
              </RequireAuth>
            } />
            <Route path="/faculty/clubs" element={
              <RequireAuth userType="faculty">
                <ClubActivities />
              </RequireAuth>
            } />
            <Route path="/faculty/studyrooms" element={
              <RequireAuth userType="faculty">
                <LiveStudyRoom />
              </RequireAuth>
            } />
            <Route path="/faculty/discussions" element={
              <RequireAuth userType="faculty">
                <DoubtDiscussion />
              </RequireAuth>
            } />
            <Route path="/faculty/circulars" element={
              <RequireAuth userType="faculty">
                <Circulars />
              </RequireAuth>
            } />
            
            {/* Admin Routes - require admin auth */}
            <Route path="/admin" element={
              <RequireAuth userType="admin">
                <AdminDashboard />
              </RequireAuth>
            } />
            <Route path="/admin/faculty" element={
              <RequireAuth userType="admin">
                <AdminFaculty />
              </RequireAuth>
            } />
            <Route path="/admin/students" element={
              <RequireAuth userType="admin">
                <AdminStudents />
              </RequireAuth>
            } />
            <Route path="/admin/reports" element={
              <RequireAuth userType="admin">
                <AdminReports />
              </RequireAuth>
            } />
            <Route path="/admin/clubs" element={
              <RequireAuth userType="admin">
                <ClubActivities />
              </RequireAuth>
            } />
            <Route path="/admin/circulars" element={
              <RequireAuth userType="admin">
                <Circulars />
              </RequireAuth>
            } />
            
            {/* Catch All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
