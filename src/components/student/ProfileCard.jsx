export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            {user?.name || "Student"}
          </h2>

          <p className="text-gray-600">
            {user?.email || "student@example.com"}
          </p>

          <p className="text-sm text-gray-500">
            {user?.club || "No Society Selected"}
          </p>
        </div>
      </div>
    </div>
  );
}