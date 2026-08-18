import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-[0_-4px_15px_rgba(0,0,0,0.1)] border-t border-gray-200 z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-3">

        {/* Favorites */}

        <button
          onClick={() => navigate("/favorites")}
          className={`flex flex-col items-center transition duration-300 ${
            location.pathname === "/favorites"
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          {location.pathname === "/favorites" ? (
            <FaHeart className="text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}

          <span className="text-sm font-medium mt-1">
            Favorites
          </span>
        </button>

        {/* Profile */}

        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center transition duration-300 ${
            location.pathname === "/profile"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <FaUserCircle className="text-3xl" />

          <span className="text-sm font-medium mt-1">
            Profile
          </span>
        </button>

      </div>

    </footer>
  );
}

export default Footer;