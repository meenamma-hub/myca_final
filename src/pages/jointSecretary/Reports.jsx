import { getEvents } from "../../services/eventService";

function Reports() {

  const events = getEvents();


  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>


      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg">
            Total Events
          </h2>

          <p className="text-3xl font-bold">
            {events.length}
          </p>
        </div>


        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg">
            Upcoming Events
          </h2>

          <p className="text-3xl font-bold">
            {
              events.filter(
                (event) =>
                  new Date(event.date) >= new Date()
              ).length
            }
          </p>
        </div>


        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-lg">
            Past Events
          </h2>

          <p className="text-3xl font-bold">
            {
              events.filter(
                (event) =>
                  new Date(event.date) < new Date()
              ).length
            }
          </p>
        </div>


      </div>

    </div>
  );
}

export default Reports;