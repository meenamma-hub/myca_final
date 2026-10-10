import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";
import { updateUser } from "../../services/userService";

function JointProfileCard() {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      ...formData,
    };

    updateUser(updatedUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    alert("Profile updated successfully.");
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl">

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Joint Secretary Profile
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <input
          type="text"
          value={currentUser?.club || ""}
          disabled
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
        />

        <input
          type="text"
          value={currentUser?.role || ""}
          disabled
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
        />

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default JointProfileCard;
