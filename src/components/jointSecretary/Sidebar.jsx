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
        ? "bg-green-600 text-white font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-green-600">
          MYCA
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Joint Secretary Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/joint/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/joint/members" className={navLinkClass}>
          Members
        </NavLink>

        <NavLink to="/joint/join-requests" className={navLinkClass}>
          Join Requests
        </NavLink>

        <NavLink to="/joint/events" className={navLinkClass}>
          Events
        </NavLink>

        <NavLink to="/joint/announcements" className={navLinkClass}>
          Announcements
        </NavLink>

        <NavLink to="/joint/profile" className={navLinkClass}>
          Profile
        </NavLink>

        <NavLink to="/joint/settings" className={navLinkClass}>
          Settings
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
