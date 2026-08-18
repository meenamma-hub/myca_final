const USERS_KEY = "users";

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// Save users
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get Joint Secretaries
export const getJointSecretaries = () => {
  return getUsers().filter(
    (user) => user.role === "jointSecretary"
  );
};

// Get Students
export const getStudents = () => {
  return getUsers().filter(
    (user) => user.role === "student"
  );
};

// Get Admin
export const getAdmin = () => {
  return getUsers().find(
    (user) => user.role === "admin"
  );
};

// Add User
export const addUser = (user) => {
  const users = getUsers();

  users.push(user);

  saveUsers(users);
};

// Update User
export const updateUser = (updatedUser) => {
  const users = getUsers().map((user) =>
    user.id === updatedUser.id
      ? updatedUser
      : user
  );

  saveUsers(users);
};

// Delete User
export const deleteUser = (id) => {
  const users = getUsers().filter(
    (user) => user.id !== id
  );

  saveUsers(users);
};

// Enable / Disable
export const toggleUserStatus = (id) => {
  const users = getUsers().map((user) => {
    if (user.id === id) {
      return {
        ...user,
        active: !user.active,
      };
    }

    return user;
  });

  saveUsers(users);
};

export function getStudentsByClub(club) {
  return getUsers().filter(
    (user) =>
      user.role === "student" &&
      user.club === club
  );
}