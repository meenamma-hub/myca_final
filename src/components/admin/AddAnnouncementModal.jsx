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

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Announcement
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="message"
            placeholder="Announcement Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Category
            </option>

            <option value="General">
              General
            </option>

            <option value="Event">
              Event
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Cultural">
              Cultural
            </option>

          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

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
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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