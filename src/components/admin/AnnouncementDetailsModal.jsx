function AnnouncementDetailsModal({
  isOpen,
  onClose,
  announcement,
}) {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Announcement Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <h3 className="text-lg font-semibold">
              Title
            </h3>
            <p>{announcement.title}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Message
            </h3>
            <p className="whitespace-pre-wrap">
              {announcement.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <h3 className="font-semibold">
                Category
              </h3>
              <p>{announcement.category}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Date
              </h3>
              <p>{announcement.date}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Created By
              </h3>
              <p>{announcement.createdBy}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Status
              </h3>

              {announcement.active ? (
                <span className="text-green-600 font-semibold">
                  Active
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Inactive
                </span>
              )}
            </div>

          </div>

        </div>

        <div className="flex justify-end mt-8">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default AnnouncementDetailsModal;