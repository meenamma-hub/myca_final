function EventDetailsModal({
  isOpen,
  onClose,
  event,
}) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Event Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-red-600 text-xl transition"
            aria-label="Close event details"
          >
            ✕
          </button>
        </div>

        {event.banner && (
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <div className="space-y-3 text-gray-700 dark:text-gray-200">

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Title:
            </span>{" "}
            {event.title}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Society:
            </span>{" "}
            {event.society}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Description:
            </span>{" "}
            {event.description}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Date:
            </span>{" "}
            {event.date}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Time:
            </span>{" "}
            {event.time}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Venue:
            </span>{" "}
            {event.venue}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Maximum Participants:
            </span>{" "}
            {event.maxParticipants}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Registered Students:
            </span>{" "}
            {event.registeredStudents?.length || 0}
          </div>

          <div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Registration:
            </span>{" "}
            {event.registrationOpen ? (
              <span className="text-green-600 dark:text-green-400 font-semibold">
                Open
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400 font-semibold">
                Closed
              </span>
            )}
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default EventDetailsModal;
