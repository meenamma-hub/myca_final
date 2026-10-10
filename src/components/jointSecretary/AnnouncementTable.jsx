import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import {
  getAnnouncementsByClub,
  deleteAnnouncement,
} from "../../services/announcementService";

import AddAnnouncementModal from "../admin/AddAnnouncementModal";
import EditAnnouncementModal from "../admin/EditAnnouncementModal";
import AnnouncementDetailsModal from "../admin/AnnouncementDetailsModal";
import DeleteConfirmation from "../common/DeleteConfirmation";

function AnnouncementTable() {
  const currentUser = getCurrentUser();

  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const loadAnnouncements = () => {
    setAnnouncements(
      getAnnouncementsByClub(currentUser.club)
    );
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteAnnouncement(id);
    loadAnnouncements();
    setShowDelete(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-xl shadow p-6">
      <div className="flex justify-between mb-6 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add Announcement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
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
              filteredAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{announcement.title}</td>
                  <td className="p-4">{announcement.category}</td>
                  <td className="p-4">{announcement.date}</td>

                  <td className="p-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowDetails(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowEdit(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowDelete(true);
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

      {showAdd && (
        <AddAnnouncementModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onAnnouncementAdded={loadAnnouncements}
        />
      )}

      {showEdit && (
        <EditAnnouncementModal
          isOpen={showEdit}
          announcement={selectedAnnouncement}
          onClose={() => setShowEdit(false)}
          onAnnouncementUpdated={loadAnnouncements}
        />
      )}

      {showDetails && (
        <AnnouncementDetailsModal
          isOpen={showDetails}
          announcement={selectedAnnouncement}
          onClose={() => setShowDetails(false)}
        />
      )}

      {showDelete && (
        <DeleteConfirmation
          user={selectedAnnouncement}
          onClose={() => setShowDelete(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AnnouncementTable;
