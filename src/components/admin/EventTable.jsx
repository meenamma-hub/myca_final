import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../services/eventService";
import DeleteConfirmation from "../common/DeleteConfirmation";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventDetailsModal from "./EventDetailsModal";

function EventTable() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

 const [showModal, setShowModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [showDetailsModal, setShowDetailsModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 5;

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadEvents = () => {
    setEvents(getEvents());
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    loadEvents();
    setShowDeleteModal(false);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.society?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;

  const currentEvents = filteredEvents.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredEvents.length / eventsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search by title, society or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-80"
        />

        <button
        onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Event
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="text-left">Society</th>
            <th className="text-left">Date</th>
            <th className="text-left">Venue</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredEvents.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                className="text-center py-10 text-gray-500"
              >
                No Events Found
              </td>
            </tr>

          ) : (

            currentEvents.map((event) => (

              <tr
                key={event.id}
                className="border-b"
              >
                <td className="p-4">{event.title}</td>

                <td>{event.society}</td>

                <td>{event.date}</td>

                <td>{event.venue}</td>

                <td className="text-center">

                  <button
  onClick={() => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  }}
  className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
>
  View
</button>

                  <button
  onClick={() => {
    setSelectedEvent(event);
    setShowEditModal(true);
  }}
  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="flex justify-center gap-2 mt-6">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          className={`px-4 py-2 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>

      </div>

      {showDeleteModal && (
        <DeleteConfirmation
          user={selectedEvent}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
      {showModal && (
  <AddEventModal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onEventAdded={loadEvents}
  />
)}
{showEditModal && (
  <EditEventModal
    isOpen={showEditModal}
    event={selectedEvent}
    onClose={() => setShowEditModal(false)}
    onEventUpdated={loadEvents}
  />
)}
{showDetailsModal && (
  <EventDetailsModal
    isOpen={showDetailsModal}
    event={selectedEvent}
    onClose={() => setShowDetailsModal(false)}
  />
)}

    </div>
  );
}

export default EventTable;