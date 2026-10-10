import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import {
  getEventsByClub,
  deleteEvent,
} from "../../services/eventService";

import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import EventDetailsModal from "./EventDetailsModal";
import DeleteConfirmation from "../common/DeleteConfirmation";

function EventTable() {
  const currentUser = getCurrentUser();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadEvents = () => {
    setEvents(getEventsByClub(currentUser.club));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteEvent(id);
    loadEvents();
    setShowDelete(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex justify-between mb-6 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Events Found
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4">{event.venue}</td>

                  <td className="p-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDetails(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEdit(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDelete(true);
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
      </div>

      {showAdd && (
        <AddEventModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onEventAdded={loadEvents}
          club={currentUser.club}
        />
      )}

      {showEdit && (
        <EditEventModal
          isOpen={showEdit}
          event={selectedEvent}
          onClose={() => setShowEdit(false)}
          onEventUpdated={loadEvents}
        />
      )}

      {showDetails && (
        <EventDetailsModal
          isOpen={showDetails}
          event={selectedEvent}
          onClose={() => setShowDetails(false)}
        />
      )}

      {showDelete && (
        <DeleteConfirmation
          user={selectedEvent}
          onClose={() => setShowDelete(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default EventTable;
