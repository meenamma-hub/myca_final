import { useState } from "react";
import { addUser } from "../../services/userService";

function AddStudentModal({ isOpen, onClose, onStudentAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    club: "",
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

    addUser({
      id: Date.now(),
      ...formData,
      role: "student",
    });

    onStudentAdded();

    setFormData({
      name: "",
      email: "",
      password: "",
      club: "",
    });

    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="text"
            name="club"
            placeholder="Club"
            value={formData.club}
            onChange={handleChange}
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;
