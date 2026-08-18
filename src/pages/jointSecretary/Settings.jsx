import JointSettingsCard from "../../components/jointSecretary/JointSettingCard";

function Settings() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your preferences.
        </p>
      </div>

      <JointSettingsCard />

    </div>
  );
}

export default Settings;