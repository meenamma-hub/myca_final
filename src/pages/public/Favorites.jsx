import { Navigate } from "react-router-dom";

function Favorites() {
  const loggedIn = !!localStorage.getItem("currentUser");

  if (loggedIn) {
    return <Navigate to="/student/favorites" replace />;
  }

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-3">Favourite Events</h1>
      <p className="text-gray-500">
        Please sign in to view and save your favourite events.
      </p>
    </div>
  );
}

export default Favorites;
