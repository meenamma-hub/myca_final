import ReportCards from "../../components/admin/ReportCards";

function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-1">
          Overview of students, societies, events and registrations.
        </p>
      </div>

      <ReportCards />
    </div>
  );
}

export default Reports;