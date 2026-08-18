import AnnouncementTable from "../../components/jointSecretary/AnnouncementTable";

function Announcements() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Society Announcements
        </h1>

        <p className="text-gray-500 mt-1">
          Manage announcements for your society.
        </p>
      </div>

      <AnnouncementTable />

    </div>
  );
}

export default Announcements;