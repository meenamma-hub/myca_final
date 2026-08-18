import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";

function EventCard({
  title = "HackSprint 2026",
  club = "MANAN",
  date = "20 July 2026",
  venue = "University Auditorium",
  image = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  status = "Registration Open",
}) {
  const [favorite, setFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Event Image */}

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover"
        />

        {/* Registration Status */}

        <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          {status}
        </div>

        {/* Favourite */}

        <button
          onClick={() => setFavorite(!favorite)}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          {favorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-500 text-lg" />
          )}
        </button>
      </div>

      {/* Event Details */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          {title}
        </h2>

        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <FaUsers className="text-blue-600" />
          <span>{club}</span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <FaCalendarAlt className="text-yellow-500" />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{venue}</span>
        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            Register
          </button>

          <button className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 rounded-xl transition">
            Details
            <FaArrowRight />
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default EventCard;