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


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Event
        </h2>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />


          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />


          <select
            name="society"
            value={formData.society}
            onChange={handleChange}
            required
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
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />


          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />


            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="border rounded-lg p-3"
            />

          </div>


          <input
            type="number"
            name="maxParticipants"
            placeholder="Maximum Participants"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />


          <input
            type="text"
            name="banner"
            placeholder="Banner Image URL (optional)"
            value={formData.banner}
            onChange={handleChange}
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
              Add Event
            </button>

          </div>


        </form>

      </div>

    </div>
  );
}

export default AddEventModal;