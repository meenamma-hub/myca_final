import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getEventById } from "../../services/eventService";
import {
  getStudentRegistrations,
  registerStudent,
  isStudentRegistered,
} from "../../services/registrationService";
import { getFavorites, toggleFavorite } from "../../services/favoriteService";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const [favorite, setFavorite] = useState(
    getFavorites(currentUser?.id).some(
      (item) => String(item.id) === String(id)
    )
  );
  const [registered, setRegistered] = useState(
    isStudentRegistered(id, currentUser?.id)
  );

  if (!event) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-3">Event not found</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleRegister = () => {
    if (registered) {
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

    setRegistered(true);
    alert(`You are registered for ${event.title}.`);
  };

  const handleFavorite = () => {
    const next = toggleFavorite(event, currentUser?.id);
    setFavorite(next);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-800">
        <div className="relative">
          <img
            src={event.image || event.banner || "https://via.placeholder.com/900x350"}
            alt={event.title}
            className="w-full h-72 object-cover"
          />

          <button
            onClick={handleFavorite}
            aria-label={favorite ? "Remove favourite" : "Add favourite"}
            className="absolute top-4 right-4 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center"
          >
            {favorite ? (
              <FaHeart className="text-pink-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl" />
            )}
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              {event.title}
            </h1>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              {event.registrationOpen === false ? "Closed" : "Registration Open"}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-7">
            {event.description || "No description available."}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <Info label="Society" value={event.society} />
            <Info label="Date" value={event.date} />
            <Info label="Time" value={event.time || "Not specified"} />
            <Info label="Venue" value={event.venue} />
            <Info
              label="Seats"
              value={event.maxParticipants || event.seats || "Not specified"}
            />
            <Info
              label="Registration"
              value={registered ? "You are registered" : "Not registered"}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              disabled={event.registrationOpen === false}
              onClick={handleRegister}
              className={`px-6 py-3 rounded-lg text-white ${
                event.registrationOpen === false
                  ? "bg-gray-400 cursor-not-allowed"
                  : registered
                    ? "bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {registered ? "Already Registered ✓" : "Register Now"}
            </button>

            <button
              onClick={handleFavorite}
              className="px-6 py-3 rounded-lg border border-pink-500 text-pink-600 hover:bg-pink-50"
            >
              {favorite ? "Remove Favourite" : "Add to Favourite"}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-slate-800 dark:text-white mt-1">
        {value || "—"}
      </p>
    </div>
  );
}

export default Details;
