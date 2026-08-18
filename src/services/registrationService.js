const REGISTRATIONS_KEY = "registrations";

function getCurrentStudentId() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"))?.id || null;
  } catch {
    return null;
  }
}

export function getRegistrations() {
  return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || "[]");
}

function saveRegistrations(registrations) {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

export function registerStudent(registration) {
  const registrations = getRegistrations();
  const studentId = registration.studentId || getCurrentStudentId();

  const alreadyRegistered = registrations.some(
    (item) =>
      item.studentId === studentId &&
      String(item.eventId) === String(registration.eventId)
  );

  if (alreadyRegistered) {
    return registrations.find(
      (item) =>
        item.studentId === studentId &&
        String(item.eventId) === String(registration.eventId)
    );
  }

  const newRegistration = {
    id: Date.now().toString(),
    registeredAt: new Date().toISOString(),
    status: "Registered",
    studentId,
    ...registration,
  };

  registrations.push(newRegistration);
  saveRegistrations(registrations);
  return newRegistration;
}

export function cancelRegistration(id) {
  saveRegistrations(
    getRegistrations().filter((registration) => registration.id !== id)
  );
}

export function updateRegistration(updatedRegistration) {
  saveRegistrations(
    getRegistrations().map((registration) =>
      registration.id === updatedRegistration.id
        ? updatedRegistration
        : registration
    )
  );
}

export function getStudentRegistrations(studentId = getCurrentStudentId()) {
  return getRegistrations().filter(
    (registration) => registration.studentId === studentId
  );
}

export function getEventRegistrations(eventId) {
  return getRegistrations().filter(
    (registration) => String(registration.eventId) === String(eventId)
  );
}

export function isStudentRegistered(eventId, studentId = getCurrentStudentId()) {
  return getStudentRegistrations(studentId).some(
    (registration) => String(registration.eventId) === String(eventId)
  );
}
