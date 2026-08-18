import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    ["/student/events", "Explore Events", "bg-blue-600 hover:bg-blue-700"],
    ["/student/registrations", "My Registrations", "bg-green-600 hover:bg-green-700"],
    ["/student/certificates", "Certificates", "bg-yellow-500 hover:bg-yellow-600"],
    ["/student/favorites", "Favourite Events", "bg-pink-500 hover:bg-pink-600"],
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-gray-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-3">
        {actions.map(([path, label, classes]) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`${classes} text-white px-5 py-3 rounded-lg`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
