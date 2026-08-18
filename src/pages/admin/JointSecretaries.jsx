import { Link } from "react-router-dom";
import JointSecretaryTable from "../../components/admin/JointSecretaryTable";

function JointSecretaries() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Joint Secretaries
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all Joint Secretaries of different societies.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <JointSecretaryTable />
      </div>
    </div>
  );
}

export default JointSecretaries;