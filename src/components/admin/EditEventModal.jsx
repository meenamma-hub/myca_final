import { useEffect, useState } from "react";
import { updateEvent } from "../../services/eventService";
import { clubs } from "../../data/clubs";

function EditEventModal({
  isOpen,
  onClose,
  event,
  onEventUpdated,
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


  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        society: event.society || "",
        venue: event.venue || "",
        date: event.date || "",
        time: event.time || "",
        maxParticipants: event.maxParticipants || "",
        banner: event.banner || "",
      });
    }
  }, [event]);


  if (!isOpen || !event) return null;


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    updateEvent({
      ...event,
      ...formData,
      maxParticipants: Number(formData.maxParticipants),
    });

    onEventUpdated();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Edit Event
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
            placeholder="Event Title"
            required
            className="w-full border rounded-lg p-3"
          />


          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border rounded-lg p-3"
          />


          <select
            name="society"
            value={formData.society}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >

            <option value="">
              Select Society
            </option>

            {clubs.map((club) => (
              <option
                key={club.id}
                value={club.name}
              >
                {club.name}
              </option>
            ))}

          </select>


          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Venue"
            required
            className="w-full border rounded-lg p-3"
          />


          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />


            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>


          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            placeholder="Maximum Participants"
            className="w-full border rounded-lg p-3"
          />


          <input
            type="text"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            placeholder="Banner URL"
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
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Update Event
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditEventModal;