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

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const inputClass =
    "border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 w-full sm:w-80 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const pageButtonBase = "px-4 py-2 rounded transition";

  return (
    <div className="mt-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title, society or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClass}
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Society</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Events Found
                </td>
              </tr>
            ) : (
              currentEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition"
                >
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.society}</td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4">{event.venue}</td>

                  <td className="p-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${pageButtonBase} ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${pageButtonBase} ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-700"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`${pageButtonBase} ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
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
