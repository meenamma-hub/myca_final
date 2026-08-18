import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getFavorites, removeFavorite } from "../../services/favoriteService";

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const load = () => setFavorites(getFavorites(currentUser?.id));

  useEffect(() => {
    load();
  }, [currentUser?.id]);

  const remove = (id) => {
    removeFavorite(id, currentUser?.id);
    load();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <FaHeart className="text-pink-500" /> Favourite Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Events you save with the heart button appear here.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-10 text-center">
          <FaHeart className="mx-auto text-4xl text-pink-300 mb-4" />
          <p className="text-gray-500 mb-4">
            No favourite events yet.
          </p>
          <button
            onClick={() => navigate("/student/events")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Explore Events
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow border border-gray-100 dark:border-slate-800 p-5"
            >
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                {event.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {event.society} • {event.date}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {event.venue}
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => navigate(`/student/events/${event.id}`)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => remove(event.id)}
                  className="px-4 py-2 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
