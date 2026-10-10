import { useEffect, useState } from "react";
import { updateAnnouncement } from "../../services/announcementService";

function EditAnnouncementModal({
  isOpen,
  onClose,
  announcement,
  onAnnouncementUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "",
    date: "",
    active: true,
  });

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title || "",
        message: announcement.message || "",
        category: announcement.category || "",
        date: announcement.date || "",
        active:
          announcement.active !== undefined
            ? announcement.active
            : true,
      });
    }
  }, [announcement]);

  if (!isOpen || !announcement) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAnnouncement({
      ...announcement,
      ...formData,
    });

    onAnnouncementUpdated();
    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Edit Announcement
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
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputClass}
          >
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

          <label className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            Active Announcement
          </label>

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
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAnnouncementModal;
