import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardList,
  FaCertificate,
  FaBullhorn,
  FaHeart,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
    closeSidebar?.();
    navigate("/signin", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-purple-600 text-white font-semibold"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
    }`;

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close menu"
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 shadow-sm flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-purple-600">MYCA</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Student Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink to="/student/dashboard" onClick={closeSidebar} className={navLinkClass}>
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/student/events" onClick={closeSidebar} className={navLinkClass}>
            <FaCalendarAlt /> Explore Events
          </NavLink>
          <NavLink to="/student/registrations" onClick={closeSidebar} className={navLinkClass}>
            <FaClipboardList /> My Registrations
          </NavLink>
          <NavLink to="/student/certificates" onClick={closeSidebar} className={navLinkClass}>
            <FaCertificate /> Certificates
          </NavLink>
          <NavLink to="/student/favorites" onClick={closeSidebar} className={navLinkClass}>
            <FaHeart /> Favourite Events
          </NavLink>
          <NavLink to="/student/announcements" onClick={closeSidebar} className={navLinkClass}>
            <FaBullhorn /> Announcements
          </NavLink>
          <NavLink to="/student/profile" onClick={closeSidebar} className={navLinkClass}>
            <FaUser /> Profile
          </NavLink>
          <NavLink to="/student/settings" onClick={closeSidebar} className={navLinkClass}>
            <FaCog /> Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 text-white hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
