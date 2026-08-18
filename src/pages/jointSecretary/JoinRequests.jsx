import JoinRequestTable from "../../components/jointSecretary/JoinRequestTable";

function JoinRequests() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Join Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Approve or reject membership requests for your society.
        </p>
      </div>

      <JoinRequestTable />

    </div>
  );
}

export default JoinRequests;