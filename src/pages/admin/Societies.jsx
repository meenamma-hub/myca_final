import { Link } from "react-router-dom";
import SocietyTable from "../../components/admin/SocietyTable";

function Societies() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Societies
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all university societies.
          </p>
        </div>

        <Link
          to="/admin/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>

      </div>

      <SocietyTable />

    </div>
  );
}

export default Societies;