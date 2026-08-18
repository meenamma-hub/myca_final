import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">MYCA</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/joint-secretaries" className={navLinkClass}>
          Joint Secretaries
        </NavLink>

        <NavLink to="/admin/students" className={navLinkClass}>
          Students
        </NavLink>

        <NavLink to="/admin/societies" className={navLinkClass}>
          Societies
        </NavLink>

        <NavLink to="/admin/events" className={navLinkClass}>
          Events
        </NavLink>

        <NavLink to="/admin/announcements" className={navLinkClass}>
          Announcements
        </NavLink>

        <NavLink to="/admin/reports" className={navLinkClass}>
          Reports
        </NavLink>

        <NavLink to="/admin/settings" className={navLinkClass}>
          Settings
        </NavLink>

        <NavLink to="/admin/profile" className={navLinkClass}>
          Profile
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;