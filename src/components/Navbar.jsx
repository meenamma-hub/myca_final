import { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getActiveAnnouncements, getLatestAnnouncements } from "../services/announcementService";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const notificationRef = useRef(null);

  useEffect(() => {
    const loadNotifications = () => {
      setAnnouncements(getLatestAnnouncements().filter((item) => item.active !== false));
    };

    loadNotifications();

    const handleStorage = () => loadNotifications();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const unreadCount = Math.min(getActiveAnnouncements().length, 9);

  useEffect(() => {
    const close = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-3xl text-slate-700 hover:text-blue-600 transition">
            <HiMenu />
          </button>

          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow">
            M
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              MYCA
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Student Event Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications((value) => !value)}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-2xl text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              <IoNotificationsOutline />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    Notifications
                  </h3>
                  <span className="text-xs text-gray-500">
                    {announcements.length} updates
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {announcements.length === 0 ? (
                    <p className="p-5 text-sm text-gray-500">
                      No new notifications.
                    </p>
                  ) : (
                    announcements.slice(0, 5).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setShowNotifications(false);
                          navigate("/student/announcements");
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-100 dark:border-slate-700"
                      >
                        <p className="font-medium text-sm text-slate-800 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.message || item.description}
                        </p>
                      </button>
                    ))
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/student/announcements");
                  }}
                  className="w-full py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700"
                >
                  View all announcements
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/student/profile")}
            aria-label="Open profile"
            className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 p-1 pr-3 transition"
          >
            <span className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {currentUser?.name?.charAt(0)?.toUpperCase() || "S"}
            </span>
            <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200">
              {currentUser?.name || "Student"}
            </span>
            <FiUser className="hidden md:block text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
