import { useState, useEffect } from "react";
import { updateEvent } from "../../services/eventService";

export default function EditEventModal({
  isOpen,
  onClose,
  selectedEvent,
  onEventUpdated,
}) {
  const [event, setEvent] = useState({});

  useEffect(() => {
    if (selectedEvent) {
      setEvent(selectedEvent);
    }
  }, [selectedEvent]);

  if (!isOpen || !selectedEvent) return null;

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEvent(event);

    onEventUpdated();
    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg w-full max-w-[500px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={event.title || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <textarea
            name="description"
            value={event.description || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="date"
            name="date"
            value={event.date || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="venue"
            value={event.venue || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="category"
            value={event.category || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="number"
            name="seats"
            value={event.seats || ""}
            onChange={handleChange}
            className={inputClass}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}