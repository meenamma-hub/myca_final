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
      localStorage.getItem("adminSettings")
    );

    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleChange = (e) => {
    const updatedSettings = {
      ...settings,
      [e.target.name]: e.target.checked,
    };

    setSettings(updatedSettings);

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(updatedSettings)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-semibold mb-6">
        System Settings
      </h2>

      <div className="space-y-5">

        <label className="flex justify-between items-center">

          <span>
            Allow Student Registration
          </span>

          <input
            type="checkbox"
            name="allowStudentRegistration"
            checked={settings.allowStudentRegistration}
            onChange={handleChange}
          />

        </label>

        <label className="flex justify-between items-center">

          <span>
            Allow Event Registration
          </span>

          <input
            type="checkbox"
            name="allowEventRegistration"
            checked={settings.allowEventRegistration}
            onChange={handleChange}
          />

        </label>

        <label className="flex justify-between items-center">

          <span>
            Allow Announcements
          </span>

          <input
            type="checkbox"
            name="allowAnnouncements"
            checked={settings.allowAnnouncements}
            onChange={handleChange}
          />

        </label>

        <label className="flex justify-between items-center">

          <span>
            Dark Mode
          </span>

          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />

        </label>

      </div>

    </div>
  );
}

export default AdminSettingsCard;