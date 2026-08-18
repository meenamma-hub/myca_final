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
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-6">

        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Event
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Title
            </th>

            <th>Date</th>

            <th>Venue</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredEvents.length === 0 ? (

            <tr>
              <td
                colSpan="4"
                className="text-center py-10 text-gray-500"
              >
                No Events Found
              </td>
            </tr>

          ) : (

            filteredEvents.map((event) => (

              <tr
                key={event.id}
                className="border-b"
              >

                <td className="p-4">
                  {event.title}
                </td>

                <td>{event.date}</td>

                <td>{event.venue}</td>

                <td>

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