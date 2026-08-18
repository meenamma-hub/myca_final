function RecentEvent({ events = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Recent Events
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500">
          No recent events available.
        </p>
      ) : (
        <div className="space-y-4">

          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >

              <h3 className="font-semibold text-gray-800">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Society: {event.society}
              </p>

              <p className="text-sm text-gray-600">
                Date: {event.date}
              </p>

              <p className="text-sm text-gray-600">
                Venue: {event.venue}
              </p>

              <p className="text-sm text-gray-500 mt-2">
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