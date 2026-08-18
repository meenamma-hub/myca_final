import { useState } from "react";
import { addEvent } from "../../services/eventService";

export default function AddEventModal({
  isOpen,
  onClose,
  onEventAdded,
  club,
}) {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    category: "",
    seats: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent({
      ...event,
      club,
      registeredStudents: [],
    });

    onEventAdded();
    onClose();

    setEvent({
      title: "",
      description: "",
      date: "",
      venue: "",
      category: "",
      seats: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="venue"
            placeholder="Venue"
            value={event.venue}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={event.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={event.seats}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
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
              className="px-4 py-2 bg-blue-600 rounded text-white"
            >
              Add Event
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}