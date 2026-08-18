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
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between mb-6">

        <input
          type="text"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-80"
        />

        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Announcement
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
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

            filteredAnnouncements.map((announcement) => (

              <tr
                key={announcement.id}
                className="border-b"
              >

                <td className="p-4">
                  {announcement.title}
                </td>

                <td>{announcement.category}</td>

                <td>{announcement.date}</td>

                <td>

                  <button
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowDetails(true);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowEdit(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowDelete(true);
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