function DeleteConfirmation({
  user,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl p-8 w-full max-w-[420px] shadow-xl">

        <h2 className="text-2xl font-bold mb-4">
          Delete Joint Secretary
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Are you sure you want to delete
          <span className="font-semibold text-gray-900 dark:text-white">
            {" "}{user.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmation;
