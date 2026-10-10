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

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg w-full max-w-[500px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Add Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            name="venue"
            placeholder="Venue"
            value={event.venue}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={event.category}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={event.seats}
            onChange={handleChange}
            className={inputClass}
            required
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
