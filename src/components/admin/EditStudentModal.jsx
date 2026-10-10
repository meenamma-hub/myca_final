import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";

function EditStudentModal({
  isOpen,
  onClose,
  student,
  onStudentUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    club: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        password: student.password || "",
        club: student.club || "",
      });
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      ...student,
      ...formData,
      role: "student",
    });

    onStudentUpdated();
    onClose();
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Edit Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
            placeholder="Club / Society"
            value={formData.club}
            onChange={handleChange}
            className={inputClass}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentModal;
