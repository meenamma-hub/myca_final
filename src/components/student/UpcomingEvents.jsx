import { useNavigate } from "react-router-dom";

const UpcomingEvents = ({ events = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Upcoming Events
        </h2>
        <button
          onClick={() => navigate("/student/events")}
          className="text-blue-600 text-sm font-semibold"
        >
          View all
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">No upcoming events.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              <h3 className="font-semibold text-lg text-slate-800 dark:text-white">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Society: {event.society}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Date: {event.date}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Venue: {event.venue}
              </p>
              <button
                onClick={() => navigate(`/student/events/${event.id}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
