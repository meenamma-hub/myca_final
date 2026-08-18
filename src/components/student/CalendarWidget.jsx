function CalendarWidget({ events = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-500">
          No upcoming events.
        </p>
      ) : (
        <div className="space-y-3">

          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-3 hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-gray-800">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600">
                📅 {event.date}
              </p>

              <p className="text-sm text-gray-600">
                📍 {event.venue}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default CalendarWidget;