const SOCIETIES_KEY = "societies";

// Get all societies
export function getSocieties() {
  return JSON.parse(localStorage.getItem(SOCIETIES_KEY)) || [];
}

// Save societies
function saveSocieties(societies) {
  localStorage.setItem(
    SOCIETIES_KEY,
    JSON.stringify(societies)
  );
}

// Add society
export function addSociety(society) {
  const societies = getSocieties();

  const newSociety = {
    id: Date.now().toString(),
    ...society,
  };

  societies.push(newSociety);
  saveSocieties(societies);

  return newSociety;
}

// Update society
export function updateSociety(updatedSociety) {
  const societies = getSocieties();

  saveSocieties(
    societies.map((society) =>
      society.id === updatedSociety.id
        ? updatedSociety
        : society
    )
  );
}

// Delete society
export function deleteSociety(id) {
  const societies = getSocieties();

  saveSocieties(
    societies.filter(
      (society) => society.id !== id
    )
  );
}

// Get society by ID
export function getSocietyById(id) {
  return getSocieties().find(
    (society) => society.id === id
  );
}