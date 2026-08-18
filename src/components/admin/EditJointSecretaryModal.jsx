import { useState } from "react";
import clubs from "../../data/societies";
import {updateUser,} from "../../services/userService";

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

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white w-[450px] rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Joint Secretary
        </h2>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
          >

            {clubs.map((club) => (

              <option
                key={club.id}
                value={club.name}
              >
                {club.name}
              </option>

            ))}

          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded"
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