function DashboardCards() {
  const cards = [
    {
      title: "Total Joint Secretaries",
      value: 0,
      color: "bg-blue-500",
    },
    {
      title: "Active Members",
      value: 0,
      color: "bg-green-500",
    },
    {
      title: "Pending Requests",
      value: 0,
      color: "bg-yellow-500",
    },
    {
      title: "Events Managed",
      value: 0,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-xl shadow-lg dark:shadow-black/30 p-6 transition-shadow`}
        >
          <h2 className="text-lg font-medium">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-4">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
