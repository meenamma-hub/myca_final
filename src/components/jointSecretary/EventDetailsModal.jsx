export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
}) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-6 rounded-lg w-full max-w-[500px] shadow-xl">

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {event.title}
        </h2>

        <div className="space-y-3">

          <p>
            <strong className="text-gray-900 dark:text-white">
              Club:
            </strong>{" "}
            {event.club}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Description:
            </strong>{" "}
            {event.description}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Date:
            </strong>{" "}
            {event.date}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Venue:
            </strong>{" "}
            {event.venue}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Category:
            </strong>{" "}
            {event.category}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Seats:
            </strong>{" "}
            {event.seats}
          </p>

          <p>
            <strong className="text-gray-900 dark:text-white">
              Registered Students:
            </strong>{" "}
            {event.registeredStudents?.length || 0}
          </p>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}