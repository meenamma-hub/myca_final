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

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="title"
            value={event.title || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={event.description || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={event.date || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="venue"
            value={event.venue || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="category"
            value={event.category || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="seats"
            value={event.seats || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded text-white"
            >
              Update
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}