export const Roles = {
  STUDENT: "student",
  ADMIN: "admin",
  JOINT_SECRETARY: "jointSecretary",
};

export const canEditEvent = (user, event) => {
  if (!user) return false;

  if (user.role === Roles.ADMIN) {
    return true;
  }

  if (
    user.role === Roles.JOINT_SECRETARY &&
    user.club === event.club
  ) {
    return true;
  }

  return false;
};

export const canDeleteEvent = canEditEvent;