import { useState } from "react";
import clubs from "../../data/societies";
import { updateUser } from "../../services/userService";

function EditJointSecretaryModal({
  selectedUser,
  onClose,
  refreshTable,
}) {
  const [formData, setFormData] = useState(selectedUser);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUser(formData);
    refreshTable();
    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-[450px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Edit Joint Secretary
        </h2>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />

          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className={inputClass}
          >
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
              className="px-5 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 rounded transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJointSecretaryModal;
