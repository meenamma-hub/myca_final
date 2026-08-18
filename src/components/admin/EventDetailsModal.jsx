function EventDetailsModal({
  isOpen,
  onClose,
  event,
}) {

  if (!isOpen || !event) return null;


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Event Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-xl"
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


        <div className="space-y-3">

          <div>
            <span className="font-semibold">
              Title:
            </span>{" "}
            {event.title}
          </div>


          <div>
            <span className="font-semibold">
              Society:
            </span>{" "}
            {event.society}
          </div>


          <div>
            <span className="font-semibold">
              Description:
            </span>{" "}
            {event.description}
          </div>


          <div>
            <span className="font-semibold">
              Date:
            </span>{" "}
            {event.date}
          </div>


          <div>
            <span className="font-semibold">
              Time:
            </span>{" "}
            {event.time}
          </div>


          <div>
            <span className="font-semibold">
              Venue:
            </span>{" "}
            {event.venue}
          </div>


          <div>
            <span className="font-semibold">
              Maximum Participants:
            </span>{" "}
            {event.maxParticipants}
          </div>


          <div>
            <span className="font-semibold">
              Registered Students:
            </span>{" "}
            {event.registeredStudents?.length || 0}
          </div>


          <div>
            <span className="font-semibold">
              Registration:
            </span>{" "}
            {event.registrationOpen ? (
              <span className="text-green-600 font-semibold">
                Open
              </span>
            ) : (
              <span className="text-red-600 font-semibold">
                Closed
              </span>
            )}
          </div>


        </div>


        <div className="flex justify-end mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>

        </div>


      </div>

    </div>
  );
}

export default EventDetailsModal;