export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
}) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          {event.title}
        </h2>

        <div className="space-y-3">

          <p>
            <strong>Club:</strong> {event.club}
          </p>

          <p>
            <strong>Description:</strong> {event.description}
          </p>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>

          <p>
            <strong>Category:</strong> {event.category}
          </p>

          <p>
            <strong>Seats:</strong> {event.seats}
          </p>

          <p>
            <strong>Registered Students:</strong>{" "}
            {event.registeredStudents?.length || 0}
          </p>

        </div>

        <div className="flex justify-end mt-6">

          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}