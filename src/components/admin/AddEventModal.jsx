import { useState } from "react";
import { addEvent } from "../../services/eventService";
import { clubs } from "../../data/clubs";

function AddEventModal({
  isOpen,
  onClose,
  onEventAdded,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    society: "",
    venue: "",
    date: "",
    time: "",
    maxParticipants: "",
    banner: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEvent({
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
      registeredStudents: [],
      registrationOpen: true,
    });

    onEventAdded();

    setFormData({
      title: "",
      description: "",
      society: "",
      venue: "",
      date: "",
      time: "",
      maxParticipants: "",
      banner: "",
    });

    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className={inputClass}
          />

          <select
            name="society"
            value={formData.society}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Society</option>

            {clubs.map((club) => (
              <option key={club.id} value={club.name}>
                {club.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <input
            type="number"
            name="maxParticipants"
            placeholder="Maximum Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            min="1"
            className={inputClass}
          />

          <input
            type="text"
            name="banner"
            placeholder="Banner Image URL (optional)"
            value={formData.banner}
            onChange={handleChange}
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
