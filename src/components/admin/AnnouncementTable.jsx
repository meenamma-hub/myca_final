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

  const indexOfLast = currentPage * announcementsPerPage;
  const indexOfFirst = indexOfLast - announcementsPerPage;

  const currentAnnouncements = filteredAnnouncements.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredAnnouncements.length / announcementsPerPage
  );

  const searchClass =
    "border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 w-full sm:w-80 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const pageButtonBase =
    "px-4 py-2 rounded transition";

  return (
    <div className="mt-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search announcement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={searchClass}
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add Announcement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAnnouncements.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Announcements Found
                </td>
              </tr>
            ) : (
              currentAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition"
                >
                  <td className="p-4">{announcement.title}</td>
                  <td className="p-4">{announcement.category}</td>
                  <td className="p-4">{announcement.date}</td>

                  <td className="p-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
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

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${pageButtonBase} ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${pageButtonBase} ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-700"
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
          className={`${pageButtonBase} ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {showModal && (
        <AddAnnouncementModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAnnouncementAdded={loadAnnouncements}
        />
      )}

      {showEditModal && (
        <EditAnnouncementModal
          isOpen={showEditModal}
          announcement={selectedAnnouncement}
          onClose={() => setShowEditModal(false)}
          onAnnouncementUpdated={loadAnnouncements}
        />
      )}

      {showDetailsModal && (
        <AnnouncementDetailsModal
          isOpen={showDetailsModal}
          announcement={selectedAnnouncement}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmation
          user={selectedAnnouncement}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AnnouncementTable;
