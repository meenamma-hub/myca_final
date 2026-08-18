import { FaCalendarCheck, FaClock, FaCertificate, FaHeart } from "react-icons/fa";

function Stat({ title, value, icon, color }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-5 border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardCards({
  registeredEvents = 0,
  upcomingEvents = 0,
  certificates = 0,
  favourites = 0,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <Stat title="Registered Events" value={registeredEvents} icon={<FaCalendarCheck />} color="bg-blue-600" />
      <Stat title="Upcoming Events" value={upcomingEvents} icon={<FaClock />} color="bg-green-600" />
      <Stat title="Certificates" value={certificates} icon={<FaCertificate />} color="bg-yellow-500" />
      <Stat title="Favourites" value={favourites} icon={<FaHeart />} color="bg-pink-500" />
    </div>
  );
}
