import { useState, useEffect } from "react";
import AddJointSecretaryModal from "./AddJointSecretaryModal";
import EditJointSecretaryModal from "./EditJointSecretaryModal";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { deleteUser, getJointSecretaries } from "../../services/userService";

function JointSecretaryTable({ currentUser }) {
  const [jointSecretaries, setJointSecretaries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

const usersPerPage = 5;
 
  const handleDelete = async (id) => {
  await deleteUser(id);
  loadJointSecretaries();
  setShowDeleteModal(false);
};
useEffect(() => {
    loadJointSecretaries();
  }, []);
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

const loadJointSecretaries = () => {
  const users = getJointSecretaries();
  setJointSecretaries(users);
};


const filteredUsers = jointSecretaries.filter((user) =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.club.toLowerCase().includes(searchTerm.toLowerCase())
);
const indexOfLastUser = currentPage * usersPerPage;

const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = filteredUsers.slice(
  indexOfFirstUser,
  indexOfLastUser
);

const totalPages = Math.ceil(
  filteredUsers.length / usersPerPage
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
        + Add Joint Secretary
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

          {filteredUsers.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="text-center py-10 text-gray-500"
              >
                No Joint Secretaries Found
              </td>

            </tr>

          ) : (

            currentUsers.map((user) => (
            <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.club}</td>
                <td className="text-center">
                  {user.active ? (
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
                      setSelectedUser(user);
                                        setShowEditModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button
                    onClick={()=>{
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded">
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
    disabled={currentPage === totalPages || totalPages === 0}
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
       <AddJointSecretaryModal
       onClose={() => setShowModal(false)}
       refreshTable={loadJointSecretaries}/>
      )}
      {showEditModal && (
        <EditJointSecretaryModal
          selectedUser={selectedUser}
          onClose={() => setShowEditModal(false)}
          refreshTable={loadJointSecretaries}/>
      )}
      {showDeleteModal && (
       <DeleteConfirmation
       user={selectedUser}
       onClose={()=>setShowDeleteModal(false)}
       onDelete={handleDelete}/>
      )}
    </div>
  );
}

export default JointSecretaryTable;