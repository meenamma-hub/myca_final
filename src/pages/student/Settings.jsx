import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
    navigate("/signin", { replace: true });
  };

  const saveSettings = () => {
    localStorage.setItem( 
      "notificationSettings",
      JSON.stringify({ notifications, darkMode })
    );
    alert("Settings saved.");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Control your notifications, theme and account session.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 space-y-6 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between gap-5">
          <div>
            <h2 className="font-semibold text-lg text-slate-800 dark:text-white">
              Notifications
            </h2>
            <p className="text-gray-500 text-sm">
              Receive event and announcement notifications.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications((value) => !value)}
            className="w-5 h-5"
          />
        </div>

        <hr className="border-gray-200 dark:border-slate-700" />

        <div className="flex items-center justify-between gap-5">
          <div>
            <h2 className="font-semibold text-lg text-slate-800 dark:text-white">
              Dark Mode
            </h2>
            <p className="text-gray-500 text-sm">
              Switch the student portal between light and dark theme.
            </p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((value) => !value)}
            className="w-5 h-5"
          />
        </div>

        <hr className="border-gray-200 dark:border-slate-700" />

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>

        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
