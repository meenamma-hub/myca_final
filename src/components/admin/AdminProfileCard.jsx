import { useState } from "react";
import { getCurrentUser, logout } from "../../services/authService";
import { updateUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function AdminProfileCard() {
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

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 mt-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass =
    "font-medium text-gray-800 dark:text-gray-200";

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl shadow p-6 max-w-2xl">

      <h2 className="text-2xl font-bold mb-6">
        Admin Profile
      </h2>

      <div className="space-y-4">

        <div>
          <label className={labelClass}>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Role
          </label>

          <input
            type="text"
            value={currentUser?.role || "Admin"}
            disabled
            className={`${inputClass} bg-gray-100 dark:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-80`}
          />
        </div>

      </div>

      <div className="flex flex-wrap justify-end gap-3 mt-8">

        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Save Changes
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminProfileCard;
