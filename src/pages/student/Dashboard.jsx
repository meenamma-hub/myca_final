import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCards from "../../components/student/DashboardCards";
import UpcomingEvents from "../../components/student/UpcomingEvents";
import AnnouncementCard from "../../components/student/AnnouncementCard";
import QuickActions from "../../components/student/QuickActions";
import { getEvents } from "../../services/eventService";
import { getStudentRegistrations } from "../../services/registrationService";
import { getStudentCertificates } from "../../services/certificateService";
import { getFavorites } from "../../services/favoriteService";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const data = useMemo(() => {
    const today = new Date();
    const events = getEvents();
    const registrations = getStudentRegistrations(currentUser?.id);
    const certificates = getStudentCertificates(currentUser?.id);
    const favorites = getFavorites(currentUser?.id);

    const upcoming = events.filter(
      (event) => event.date && new Date(`${event.date}T23:59:59`) >= today
    );

    return {
      registrations,
      certificates,
      favorites,
      upcoming,
    };
  }, [currentUser?.id]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Welcome, {currentUser?.name || "Student"} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your events, registrations, certificates, favourites and announcements from one place.
        </p>
      </div>

      <DashboardCards
        registeredEvents={data.registrations.length}
        upcomingEvents={data.upcoming.length}
        certificates={data.certificates.length}
        favourites={data.favorites.length}
      />

      <div className="grid xl:grid-cols-[2fr_1fr] gap-6">
        <UpcomingEvents events={data.upcoming.slice(0, 3)} />
        <AnnouncementCard />
      </div>

      <div className="mt-6">
        <QuickActions />
      </div>

      {/* <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => navigate("/student/events")}
          className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Explore all events
        </button>
        <button
          onClick={() => navigate("/student/favorites")}
          className="px-5 py-3 rounded-lg border border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-slate-800"
        >
          View favourite events
        </button>
      </div> */}
    </div>
  );
};

export default Dashboard;
