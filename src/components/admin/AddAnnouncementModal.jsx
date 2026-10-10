import { useState } from "react";
import { addAnnouncement } from "../../services/announcementService";

function AddAnnouncementModal({
  isOpen,
  onClose,
  onAnnouncementAdded,
}) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "",
    date: "",
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

    addAnnouncement({
      ...formData,
      createdBy: "Admin",
      active: true,
    });

    onAnnouncementAdded();

    setFormData({
      title: "",
      message: "",
      category: "",
      date: "",
    });

    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <textarea
            name="message"
            placeholder="Announcement Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={inputClass}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="Event">Event</option>
            <option value="Academic">Academic</option>
            <option value="Placement">Placement</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncementModal;
