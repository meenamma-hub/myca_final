import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/eventService";
import { getFavorites, toggleFavorite } from "../../services/favoriteService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleFavorite = (event) => {
    if (!currentUser) {
      navigate("/Signin");
      return;
    }
    toggleFavorite(event, currentUser.id);
    setEvents([...getEvents()]);
  };

  const favorites = currentUser ? getFavorites(currentUser.id) : [];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">MYCA</h1>
          <p className="text-xs text-gray-500">Events of YMCA</p>
        </div>
        <button
          onClick={() =>
            navigate(currentUser ? "/student/dashboard" : "/Signin")
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {currentUser ? "Go to Dashboard" : "Sign In"}
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Discover MYCA Events 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Explore technical, cultural and sports events happening at JC Bose University.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => {
            const isFavorite = favorites.some(
              (item) => String(item.id) === String(event.id)
            );

            return (
              <article key={event.id} className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image || event.banner || "https://via.placeholder.com/600x300"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleFavorite(event)}
                    className="absolute top-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
                  >
                    {isFavorite ? (
                      <FaHeart className="text-pink-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold">{event.title}</h2>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-3">
                    {event.society} • {event.date} • {event.venue}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/details/${event.id}`)}
                      className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          currentUser
                            ? `/student/events/${event.id}`
                            : "/Signin"
                        )
                      }
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Home;
