function AnnouncementDetailsModal({
  isOpen,
  onClose,
  announcement,
}) {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Announcement Details
          </h2>

          <button
            onClick={onClose}
            aria-label="Close announcement details"
            className="text-2xl text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Title
            </h3>
            <p>{announcement.title}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Message
            </h3>
            <p className="whitespace-pre-wrap">
              {announcement.message}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Category
              </h3>
              <p>{announcement.category}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Date
              </h3>
              <p>{announcement.date}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Created By
              </h3>
              <p>{announcement.createdBy}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Status
              </h3>

              {announcement.active ? (
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  Active
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetailsModal;
