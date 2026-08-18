import { useEffect, useState } from "react";
import {
  getAnnouncements,
  deleteAnnouncement,
} from "../../services/announcementService";

import AddAnnouncementModal from "./AddAnnouncementModal";
import EditAnnouncementModal from "./EditAnnouncementModal";
import AnnouncementDetailsModal from "./AnnouncementDetailsModal";
import DeleteConfirmation from "../common/DeleteConfirmation";

function AnnouncementTable() {
  const [announcements, setAnnouncements] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const announcementsPerPage = 5;

  useEffect(() => {
    loadAnnouncements();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const loadAnnouncements = () => {
    setAnnouncements(getAnnouncements());
  };

  const handleDelete = (id) => {
    deleteAnnouncement(id);
    loadAnnouncements();
    setShowDeleteModal(false);
  };

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      announcement.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLast =
    currentPage * announcementsPerPage;

  const indexOfFirst =
    indexOfLast - announcementsPerPage;

  const currentAnnouncements =
    filteredAnnouncements.slice(
      indexOfFirst,
      indexOfLast
    );

  const totalPages = Math.ceil(
    filteredAnnouncements.length /
      announcementsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search announcement..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Announcement
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Title
            </th>

            <th className="text-left">
              Category
            </th>

            <th className="text-left">
              Date
            </th>

            <th className="text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredAnnouncements.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="text-center py-10 text-gray-500"
              >
                No Announcements Found
              </td>

            </tr>

          ) : (

            currentAnnouncements.map(
              (announcement) => (

                <tr
                  key={announcement.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {announcement.title}
                  </td>

                  <td>
                    {announcement.category}
                  </td>

                  <td>
                    {announcement.date}
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(
                          announcement
                        );
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(
                          announcement
                        );
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(
                          announcement
                        );
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )

          )}

        </tbody>

      </table>

      <div className="flex justify-center gap-2 mt-6">

        <button
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ||
            totalPages === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>

      </div>

      {showModal && (
        <AddAnnouncementModal
          isOpen={showModal}
          onClose={() =>
            setShowModal(false)
          }
          onAnnouncementAdded={
            loadAnnouncements
          }
        />
      )}

      {showEditModal && (
        <EditAnnouncementModal
          isOpen={showEditModal}
          announcement={selectedAnnouncement}
          onClose={() =>
            setShowEditModal(false)
          }
          onAnnouncementUpdated={
            loadAnnouncements
          }
        />
      )}

      {showDetailsModal && (
        <AnnouncementDetailsModal
          isOpen={showDetailsModal}
          announcement={selectedAnnouncement}
          onClose={() =>
            setShowDetailsModal(false)
          }
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          user={selectedAnnouncement}
          onClose={() =>
            setShowDeleteModal(false)
          }
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}

export default AnnouncementTable;