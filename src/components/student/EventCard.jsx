import Button from "../common/Button";

function EventCard({ event, onRegister, onDetails }) {
  if (!event) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        No event available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">

      <img
        src={event.image || "https://via.placeholder.com/400x200"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {event.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {event.description}
        </p>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>Society:</strong> {event.society}
          </p>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
        </div>

        <div className="mt-5 flex gap-3">

          <Button onClick={() => onRegister?.(event)}>
            Register
          </Button>

          <Button
            variant="outline"
            onClick={() => onDetails?.(event)}
          >
            Details
          </Button>

        </div>

      </div>
    </div>
  );
}

export default EventCard;