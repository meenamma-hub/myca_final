import { Navigate } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../services/authService";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/Signin" replace />;
  }

  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/Signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
