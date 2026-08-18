import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestAnnouncements } from "../../services/announcementService";

const AnnouncementCard = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements(
      getLatestAnnouncements()
        .filter((item) => item.active !== false)
        .slice(0, 3)
    );
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Recent Announcements
        </h2>
        <button
          onClick={() => navigate("/student/announcements")}
          className="text-blue-600 text-sm font-semibold"
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet.</p>
        ) : (
          announcements.map((item) => (
            <div
              key={item.id}
              className="border-l-4 border-blue-600 bg-gray-50 dark:bg-slate-800 p-4 rounded"
            >
              <h3 className="font-semibold text-slate-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.society || item.club || "MYCA"} • {item.date || ""}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                {item.message || item.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementCard;
