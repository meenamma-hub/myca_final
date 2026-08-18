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

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Announcement
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
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
            className="w-full border rounded-lg p-3"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            Active Announcement
          </label>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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