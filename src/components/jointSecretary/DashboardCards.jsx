import { getCurrentUser } from "../../services/authService";
import { getEvents } from "../../services/eventService";

function DashboardCards() {
  const currentUser = getCurrentUser();

  const myEvents = getEvents().filter(
    (event) => event.society === currentUser.club
  );

  const registrations = myEvents.reduce(
    (total, event) =>
      total + (event.registeredStudents?.length || 0),
    0
  );

  const cards = [
    {
      title: "My Society",
      value: currentUser.club,
      color: "bg-blue-600",
    },
    {
      title: "My Events",
      value: myEvents.length,
      color: "bg-green-600",
    },
    {
      title: "Registrations",
      value: registrations,
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl p-6 shadow`}
        >
          <h3 className="text-lg">{card.title}</h3>

          <p className="text-3xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;