const ANNOUNCEMENTS_KEY = "announcements";

// Get all announcements
export function getAnnouncements() {
  return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY)) || [];
}

// Save announcements
function saveAnnouncements(announcements) {
  localStorage.setItem(
    ANNOUNCEMENTS_KEY,
    JSON.stringify(announcements)
  );
}

// Add announcement
export function addAnnouncement(announcement) {
  const announcements = getAnnouncements();

  const newAnnouncement = {
  id: Date.now().toString(),
  title: "",
  message: "",
  category: "",
  date: "",
  createdBy: "Admin",
  active: true,
  createdAt: new Date().toISOString(),
  ...announcement,
};
  announcements.push(newAnnouncement);
  saveAnnouncements(announcements);

  return newAnnouncement;
}

// Update announcement
export function updateAnnouncement(updatedAnnouncement) {
  const announcements = getAnnouncements();

  const updated = announcements.map((announcement) =>
    announcement.id === updatedAnnouncement.id
      ? updatedAnnouncement
      : announcement
  );

  saveAnnouncements(updated);
}

// Delete announcement
export function deleteAnnouncement(id) {
  const announcements = getAnnouncements();

  saveAnnouncements(
    announcements.filter(
      (announcement) => announcement.id !== id
    )
  );
}

// Get announcement by ID
export function getAnnouncementById(id) {
  return getAnnouncements().find(
    (announcement) => announcement.id === id
  );
}

// Search announcements
export function searchAnnouncements(searchTerm) {
  const search = searchTerm.toLowerCase();

  return getAnnouncements().filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(search) ||
      announcement.category?.toLowerCase().includes(search) ||
      announcement.message.toLowerCase().includes(search)
  );
}

// Get active announcements
export function getActiveAnnouncements() {
  return getAnnouncements().filter(
    (announcement) => announcement.active
  );
}

// Get latest announcements
export function getLatestAnnouncements() {
  return [...getAnnouncements()].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}
export function getAnnouncementsByClub(club) {
  return getAnnouncements().filter(
    (announcement) => announcement.club === club
  );
}