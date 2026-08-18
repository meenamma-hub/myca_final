import { getUsers } from "./userService";
import { initializeDemoData } from "./seedService";

export const login = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("currentUser");
};

export const authenticate = (email, password) => {
  initializeDemoData();

  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email?.toLowerCase() === email.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  if (user.active === false) {
    return {
      success: false,
      message: "Your account has been disabled by the Admin.",
    };
  }

  const loggedInUser = {
    ...user,
    active: user.active !== false,
  };

  login(loggedInUser);

  return { success: true, user: loggedInUser };
};
