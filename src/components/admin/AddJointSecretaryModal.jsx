import { useState } from "react";
import clubs from "../../data/societies";
import {addUser,getUsers,} from "../../services/userService";

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

    const emailExists = getUsers().find((user) =>
    user.email.toLowerCase() ===
    formData.email.toLowerCase());
    
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

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-lg w-[450px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Add Joint Secretary
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <select
            name="club"
            required
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
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
              className="px-5 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white"
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