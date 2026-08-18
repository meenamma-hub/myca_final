import { Link } from "react-router-dom";
import EventTable from "../../components/admin/EventTable";

function Events() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Events
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all college events.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>

      </div>

      {/* Event Table */}
      <EventTable />

    </div>
  );
}

export default Events;