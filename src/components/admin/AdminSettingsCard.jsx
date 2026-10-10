import { useEffect, useState } from "react";

function AdminSettingsCard() {
  const [settings, setSettings] = useState({
    allowStudentRegistration: true,
    allowEventRegistration: true,
    allowAnnouncements: true,
    darkMode: false,
  });

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("adminSettings") || "null"
    );

    const savedTheme = localStorage.getItem("theme") === "dark";

    setSettings({
      allowStudentRegistration:
        savedSettings?.allowStudentRegistration ?? true,
      allowEventRegistration:
        savedSettings?.allowEventRegistration ?? true,
      allowAnnouncements:
        savedSettings?.allowAnnouncements ?? true,
      darkMode: savedTheme,
    });

    document.documentElement.classList.toggle("dark", savedTheme);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    const updatedSettings = {
      ...settings,
      [name]: checked,
    };

    setSettings(updatedSettings);

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(updatedSettings)
    );

    if (name === "darkMode") {
      document.documentElement.classList.toggle("dark", checked);

      localStorage.setItem("theme", checked ? "dark" : "light");
    }
  };

  const checkboxClass =
    "h-4 w-4 cursor-pointer accent-blue-600";

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-xl shadow p-6 border border-gray-200 dark:border-slate-700">
      <h2 className="text-2xl font-semibold mb-6">
        System Settings
      </h2>

      <div className="space-y-5">
        <label className="flex justify-between items-center gap-4">
          <span className="text-gray-700 dark:text-gray-200">
            Allow Student Registration
          </span>
          <input
            type="checkbox"
            name="allowStudentRegistration"
            checked={settings.allowStudentRegistration}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>

        <label className="flex justify-between items-center gap-4">
          <span className="text-gray-700 dark:text-gray-200">
            Allow Event Registration
          </span>
          <input
            type="checkbox"
            name="allowEventRegistration"
            checked={settings.allowEventRegistration}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>

        <label className="flex justify-between items-center gap-4">
          <span className="text-gray-700 dark:text-gray-200">
            Allow Announcements
          </span>
          <input
            type="checkbox"
            name="allowAnnouncements"
            checked={settings.allowAnnouncements}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>

        <label className="flex justify-between items-center gap-4">
          <span className="text-gray-700 dark:text-gray-200">
            Dark Mode
          </span>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>
      </div>
    </div>
  );
}

export default AdminSettingsCard;
