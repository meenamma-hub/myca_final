import { Link } from "react-router-dom";
import StudentTable from "../../components/admin/StudentTable";

function Students() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Students
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all registered students.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Student Table */}
      <StudentTable />
    </div>
  );
}

export default Students;