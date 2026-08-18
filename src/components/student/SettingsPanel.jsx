function SettingsPanel() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Settings
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Email Notifications
            </h3>

            <p className="text-sm text-gray-500">
              Receive updates about events and announcements.
            </p>
          </div>

          <input
            type="checkbox"
            className="w-5 h-5"
            defaultChecked
          />
        </div>


        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              Event Reminders
            </h3>

            <p className="text-sm text-gray-500">
              Get reminders before registered events.
            </p>
          </div>

          <input
            type="checkbox"
            className="w-5 h-5"
            defaultChecked
          />
        </div>


        <div className="pt-4 border-t">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>

      </div>

    </div>
  );
}

export default SettingsPanel;