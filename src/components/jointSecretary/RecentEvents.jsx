function RecentEvent({ events = [] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Recent Events
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No recent events available.
        </p>
      ) : (
        <div className="space-y-4">

          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >

              <h3 className="font-semibold text-gray-800 dark:text-white">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Society: {event.society}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                Date: {event.date}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                Venue: {event.venue}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {event.description}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentEvent;
