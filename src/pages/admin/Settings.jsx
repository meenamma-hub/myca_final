import AdminSettingsCard from "../../components/admin/AdminSettingsCard";

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Configure application preferences.
        </p>
      </div>

      <AdminSettingsCard />
    </div>
  );
}

export default Settings;