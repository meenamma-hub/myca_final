import { useState } from "react";
import clubs from "../../data/societies";
import { addUser, getUsers } from "../../services/userService";

function AddJointSecretaryModal({ onClose, refreshTable }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    club: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailExists = getUsers().find(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      alert("Email already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "jointSecretary",
      club: formData.club,
      active: true,
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);
    refreshTable();
    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg w-full max-w-[450px] max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-bold mb-6">
          Add Joint Secretary
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            required
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={formData.password}
            required
            onChange={handleChange}
            className={inputClass}
          />

          <select
            name="club"
            value={formData.club}
            required
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Club</option>

            {clubs.map((club) => (
              <option key={club.id} value={club.name}>
                {club.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJointSecretaryModal;
