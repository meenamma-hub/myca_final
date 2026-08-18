import { getStudents, getJointSecretaries } from "../../services/userService";
import { getEvents } from "../../services/eventService";
import { clubs } from "../../data/clubs";

function ReportCards() {
  const students = getStudents();
  const jointSecretaries = getJointSecretaries();
  const events = getEvents();

  const totalRegistrations = events.reduce(
    (total, event) =>
      total + (event.registeredStudents?.length || 0),
    0
  );

  const cards = [
    {
      title: "Students",
      value: students.length,
      color: "bg-blue-500",
    },
    {
      title: "Joint Secretaries",
      value: jointSecretaries.length,
      color: "bg-green-500",
    },
    {
      title: "Societies",
      value: clubs.length,
      color: "bg-purple-500",
    },
    {
      title: "Events",
      value: events.length,
      color: "bg-orange-500",
    },
    {
      title: "Registrations",
      value: totalRegistrations,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 text-white shadow`}
        >
          <h3 className="text-lg font-medium">
            {card.title}
          </h3>

          <p className="text-4xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}

    </div>
  );
}

export default ReportCards;