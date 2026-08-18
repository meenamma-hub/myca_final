import EventTable from "../../components/jointSecretary/EventTable";

function Events() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Society Events
        </h1>

        <p className="text-gray-500 mt-1">
          Manage events for your society.
        </p>
      </div>

      <EventTable />

    </div>
  );
}

export default Events;