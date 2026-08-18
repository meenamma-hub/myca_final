import { createContext, useContext, useEffect, useState } from "react";
import {
  authenticate,
  logout as logoutService,
  getCurrentUser,
  isLoggedIn,
} from "../services/authService";
import { initializeDemoData } from "../services/seedService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initializeDemoData();

    if (isLoggedIn()) {
      setUser(getCurrentUser());
    }
  }, []);

  const login = (email, password) => {
    const result = authenticate(email, password);

    if (result.success) {
      setUser(result.user);
      return result;
    }

    return result;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
