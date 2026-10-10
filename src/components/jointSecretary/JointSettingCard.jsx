import { useEffect, useState } from "react";

function JointSettingsCard() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    darkMode: false,
  });

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("jointSettings")
    );

    if (saved) {
      setSettings({
        emailNotifications: saved.emailNotifications ?? true,
        eventReminders: saved.eventReminders ?? true,
        darkMode: saved.darkMode ?? false,
      });

      if (saved.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handleChange = (e) => {
    const updated = {
      ...settings,
      [e.target.name]: e.target.checked,
    };

    setSettings(updated);

    localStorage.setItem(
      "jointSettings",
      JSON.stringify(updated)
    );

    if (e.target.name === "darkMode") {
      if (e.target.checked) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const checkboxClass =
    "h-4 w-4 cursor-pointer accent-green-600";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Preferences
      </h2>

      <div className="space-y-5">
        <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>

        <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
          <span>Event Reminders</span>
          <input
            type="checkbox"
            name="eventReminders"
            checked={settings.eventReminders}
            onChange={handleChange}
            className={checkboxClass}
          />
        </label>

        <label className="flex justify-between items-center text-gray-700 dark:text-gray-200">
          <span>Dark Mode</span>
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

export default JointSettingsCard;
