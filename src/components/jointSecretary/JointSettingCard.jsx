import { useEffect, useState } from "react";

function JointSettingsCard() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
  });

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("jointSettings")
    );

    if (saved) {
      setSettings(saved);
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
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Preferences
      </h2>

      <div className="space-y-5">

        <label className="flex justify-between">

          <span>Email Notifications</span>

          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />

        </label>

        <label className="flex justify-between">

          <span>Event Reminders</span>

          <input
            type="checkbox"
            name="eventReminders"
            checked={settings.eventReminders}
            onChange={handleChange}
          />

        </label>

      </div>

    </div>
  );
}

export default JointSettingsCard;