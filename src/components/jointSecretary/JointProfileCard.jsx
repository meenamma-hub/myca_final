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
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Joint Secretary Profile
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          value={currentUser?.club || ""}
          disabled
          className="w-full border rounded-lg p-3 bg-gray-100"
        />

        <input
          type="text"
          value={currentUser?.role || ""}
          disabled
          className="w-full border rounded-lg p-3 bg-gray-100"
        />

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default JointProfileCard;