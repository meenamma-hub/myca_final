function DeleteConfirmation({
  user,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold mb-4">
          Delete Joint Secretary
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}{user.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="px-5 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmation;