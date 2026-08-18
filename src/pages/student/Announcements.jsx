import { useEffect, useState } from "react";
import { getLatestAnnouncements } from "../../services/announcementService";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements(
      getLatestAnnouncements().filter((item) => item.active !== false)
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Announcements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Event and society updates appear here and in the notification bell.
        </p>
      </div>

      <div className="space-y-5">
        {announcements.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 text-center text-gray-500">
            No announcements yet.
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow p-5 border-l-4 border-blue-600"
            >
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                {announcement.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {announcement.society || announcement.club || "MYCA"} •{" "}
                {announcement.date || ""}
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {announcement.message || announcement.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
