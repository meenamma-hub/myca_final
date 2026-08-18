import MemberTable from "../../components/jointSecretary/MemberTable";

function Members() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Society Members
        </h1>

        <p className="text-gray-500 mt-1">
          Manage members of your society.
        </p>
      </div>

      <MemberTable />

    </div>
  );
}

export default Members;