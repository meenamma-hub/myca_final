const FAVORITES_KEY = "favorites";

function getCurrentStudentId() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"))?.id || "guest";
  } catch {
    return "guest";
  }
}

export function getFavorites(studentId = getCurrentStudentId()) {
  const allFavorites = JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );

  // Supports old favorite records that were saved without a studentId.
  return allFavorites.filter(
    (item) => !item.studentId || item.studentId === studentId
  );
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(eventId, studentId = getCurrentStudentId()) {
  return getFavorites(studentId).some(
    (event) => String(event.id) === String(eventId)
  );
}

export function addFavorite(event, studentId = getCurrentStudentId()) {
  const allFavorites = JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );

  if (
    allFavorites.some(
      (item) =>
        item.studentId === studentId &&
        String(item.id) === String(event.id)
    )
  ) {
    return;
  }

  allFavorites.push({
    ...event,
    studentId,
  });

  saveFavorites(allFavorites);
}

export function removeFavorite(id, studentId = getCurrentStudentId()) {
  const allFavorites = JSON.parse(
    localStorage.getItem(FAVORITES_KEY) || "[]"
  );

  saveFavorites(
    allFavorites.filter(
      (event) =>
        !(
          event.studentId === studentId &&
          String(event.id) === String(id)
        )
    )
  );
}

export function toggleFavorite(event, studentId = getCurrentStudentId()) {
  if (isFavorite(event.id, studentId)) {
    removeFavorite(event.id, studentId);
    return false;
  }

  addFavorite(event, studentId);
  return true;
}
