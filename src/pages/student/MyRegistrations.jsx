import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudentRegistrations,
  cancelRegistration,
} from "../../services/registrationService";

const MyRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const load = () =>
    setRegistrations(getStudentRegistrations(currentUser?.id));

  useEffect(() => {
    load();
  }, [currentUser?.id]);

  const handleCancel = (registration) => {
    if (
      !window.confirm(
        `Cancel your registration for ${registration.eventTitle}?`
      )
    ) {
      return;
    }

    cancelRegistration(registration.id);
    load();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          My Registrations
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-1">
          This page shows every event you have registered for. Use View to
          open the event details.
        </p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-black/30 border border-gray-100 dark:border-slate-700">
        {registrations.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't registered for any event yet.
            </p>

            <button
              onClick={() => navigate("/student/events")}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Events
            </button>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3">Event</th>
                <th className="p-3">Society</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="p-3 text-slate-800 dark:text-white">
                    {registration.eventTitle}
                  </td>

                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {registration.society}
                  </td>

                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {registration.date}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                      {registration.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/student/events/${registration.eventId}`
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleCancel(registration)}
                        className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/70 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
