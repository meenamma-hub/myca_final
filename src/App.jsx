import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout";
import JointSecretaryLayout from "./layouts/JointSecretaryLayout";
import StudentLayout from "./layouts/StudentLayout";

import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Welcome from "./pages/public/Welcome";
import Description from "./pages/public/Description";
import Home from "./pages/public/Home";
import Favorites from "./pages/public/Favorites";
import Details from "./pages/public/Details";
import Register from "./pages/public/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import Students from "./pages/admin/Students";
import JointSecretaries from "./pages/admin/JointSecretaries";
import Societies from "./pages/admin/Societies";
import AdminEvents from "./pages/admin/Events";
import AdminAnnouncements from "./pages/admin/Announcements";
import Reports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

import JointSecretaryDashboard from "./pages/jointSecretary/Dashboard";
import Members from "./pages/jointSecretary/Members";
import JoinRequests from "./pages/jointSecretary/JoinRequests";
import JointEvents from "./pages/jointSecretary/Events";
import JointAnnouncements from "./pages/jointSecretary/Announcements";
import JointProfile from "./pages/jointSecretary/Profile";
import JointSettings from "./pages/jointSecretary/Settings";

import StudentDashboard from "./pages/student/Dashboard";
import ExploreEvents from "./pages/student/ExploreEvents";
import MyRegistrations from "./pages/student/MyRegistrations";
import Certificates from "./pages/student/Certificates";
import StudentAnnouncements from "./pages/student/Announcements";
import StudentProfile from "./pages/student/Profile";
import StudentSettings from "./pages/student/Settings";
import StudentFavorites from "./pages/student/Favorites";

import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Navigate to="/Signin" replace />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/description" element={<Description />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/register/:id" element={<Register />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="joint-secretaries" element={<JointSecretaries />} />
            <Route path="societies" element={<Societies />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Joint Secretary */}
          <Route
            path="/joint"
            element={
              <ProtectedRoute>
                <JointSecretaryLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<JointSecretaryDashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="join-requests" element={<JoinRequests />} />
            <Route path="events" element={<JointEvents />} />
            <Route path="announcements" element={<JointAnnouncements />} />
            <Route path="profile" element={<JointProfile />} />
            <Route path="settings" element={<JointSettings />} />
          </Route>

          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="events" element={<ExploreEvents />} />
            <Route path="events/:id" element={<Details />} />
            <Route path="registrations" element={<MyRegistrations />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="favorites" element={<StudentFavorites />} />
            <Route path="announcements" element={<StudentAnnouncements />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/Signin" replace />} />
        </Routes>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
