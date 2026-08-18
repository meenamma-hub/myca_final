import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getEvents } from "../../services/eventService";
import { getStudentRegistrations, registerStudent, isStudentRegistered } from "../../services/registrationService";
import { getFavorites, toggleFavorite } from "../../services/favoriteService";

const ExploreEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [registeredIds, setRegisteredIds] = useState(new Set());

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const refresh = () => {
    const allEvents = getEvents();
    setEvents(allEvents);
    setFavorites(getFavorites(currentUser?.id));

    const registrations = getStudentRegistrations(currentUser?.id);
    setRegisteredIds(
      new Set(registrations.map((item) => String(item.eventId)))
    );
  };

  useEffect(() => {
    refresh();
  }, [currentUser?.id]);

  const filteredEvents = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return events.filter((event) =>
      [event.title, event.society, event.venue, event.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search))
    );
  }, [events, searchTerm]);

  const handleRegister = (event) => {
    if (isStudentRegistered(event.id, currentUser?.id)) {
      navigate("/student/registrations");
      return;
    }

    registerStudent({
      eventId: event.id,
      studentId: currentUser?.id,
      eventTitle: event.title,
      society: event.society,
      date: event.date,
      venue: event.venue,
      status: "Registered",
    });

    alert(`You are registered for ${event.title}.`);
    refresh();
  };

  const handleFavorite = (event) => {
    toggleFavorite(event, currentUser?.id);
    refresh();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Explore Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Discover events, register for them and save your favourites.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search by event, society or venue..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
      />

      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 text-center text-gray-500">
          No events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isFav = favorites.some(
              (item) => String(item.id) === String(event.id)
            );
            const isRegistered = registeredIds.has(String(event.id));
            const isOpen = event.registrationOpen !== false;

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-800"
              >
                <div className="relative">
                  <img
                    src={event.image || event.banner || "https://via.placeholder.com/600x300"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleFavorite(event)}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition"
                  >
                    {isFav ? (
                      <FaHeart className="text-pink-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                      {event.title}
                    </h2>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {isOpen ? "Open" : "Closed"}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Society:</strong> {event.society}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time || "Not specified"}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      disabled={!isOpen}
                      onClick={() => handleRegister(event)}
                      className={`flex-1 px-4 py-2 rounded-lg text-white ${
                        !isOpen
                          ? "bg-gray-400 cursor-not-allowed"
                          : isRegistered
                            ? "bg-green-700 hover:bg-green-800"
                            : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {isRegistered ? "Registered ✓" : "Register"}
                    </button>

                    <button
                      onClick={() => navigate(`/student/events/${event.id}`)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>

                  <button
                    onClick={() => handleFavorite(event)}
                    className="mt-3 w-full text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    {isFav ? "♥ Remove from favourites" : "♡ Add to favourites"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreEvents;
