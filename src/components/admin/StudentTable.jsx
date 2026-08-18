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

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search by name, email or club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Student
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Name</th>

            <th className="text-left">Email</th>

            <th className="text-left">Club</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredStudents.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center py-10 text-gray-500"
              >
                No Students Found
              </td>

            </tr>

          ) : (

            currentStudents.map((student) => (

              <tr
                key={student.id}
                className="border-b"
              >

                <td className="p-4">{student.name}</td>

                <td>{student.email}</td>

                <td>{student.club || "-"}</td>

                <td className="text-center">
                  {student.active ? (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Disabled
                    </span>
                  )}
                </td>

                <td className="text-center">

                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowEditModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="flex justify-center items-center gap-2 mt-6">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
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
                : "bg-gray-200 hover:bg-gray-300"
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
              ? "bg-gray-300 cursor-not-allowed"
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