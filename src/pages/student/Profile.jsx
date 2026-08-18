import { useEffect, useState } from "react";
import { updateUser } from "../../services/userService";

const emptyProfile = {
  name: "",
  rollNo: "",
  email: "",
  course: "",
  year: "",
  phone: "",
};

const Profile = () => {
  const [student, setStudent] = useState(emptyProfile);
  const [form, setForm] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    const storedProfile = JSON.parse(
      localStorage.getItem("studentProfile") || "{}"
    );

    const data = {
      ...emptyProfile,
      ...currentUser,
      ...storedProfile,
    };

    setStudent(data);
    setForm(data);
  }, []);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      name: form.name,
      email: form.email,
      rollNo: form.rollNo,
      course: form.course,
      year: form.year,
      phone: form.phone,
    };

    updateUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("studentProfile", JSON.stringify(form));

    setStudent(form);
    setEditing(false);
    alert("Profile updated successfully.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and update your student information.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 md:p-8 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {student.name?.charAt(0)?.toUpperCase() || "S"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              {student.name || "Student"}
            </h2>
            <p className="text-gray-500">{student.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Info label="Name" value={student.name} />
              <Info label="Roll Number" value={student.rollNo} />
              <Info label="Email" value={student.email} />
              <Info label="Course" value={student.course} />
              <Info label="Year" value={student.year} />
              <Info label="Phone" value={student.phone} />
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-8 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                ["name", "Name"],
                ["rollNo", "Roll Number"],
                ["email", "Email"],
                ["course", "Course"],
                ["year", "Year"],
                ["phone", "Phone"],
              ].map(([name, label]) => (
                <label key={name} className="block">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                  </span>
                  <input
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                    type={name === "email" ? "email" : "text"}
                    required={name === "name" || name === "email"}
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                  />
                </label>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(student);
                  setEditing(false);
                }}
                className="border border-gray-300 dark:border-slate-600 px-6 py-2.5 rounded-lg text-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

function Info({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-slate-800 dark:text-white mt-1">{value || "Not provided"}</p>
    </div>
  );
}

export default Profile;
