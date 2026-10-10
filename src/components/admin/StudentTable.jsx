import { useEffect, useState } from "react";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { deleteUser, getStudents } from "../../services/userService";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadStudents = () => {
    const users = getStudents();
    setStudents(users);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadStudents();
    setShowDeleteModal(false);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.club || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const inputClass =
    "border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="mt-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${inputClass} w-full sm:w-80`}
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Club</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Students Found
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.club || "-"}</td>

                  <td className="p-4 text-center">
                    {student.active ? (
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        Active
                      </span>
                    ) : (
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        Disabled
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          className={`px-4 py-2 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>

      {showModal && (
        <AddStudentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onStudentAdded={loadStudents}
        />
      )}

      {showEditModal && (
        <EditStudentModal
          isOpen={showEditModal}
          student={selectedStudent}
          onClose={() => setShowEditModal(false)}
          onStudentUpdated={loadStudents}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          user={selectedStudent}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default StudentTable;
