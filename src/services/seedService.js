import { users as defaultUsers } from "../data/users";
import { events as defaultEvents } from "../data/events";

const seedIfEmpty = (key, value) => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function initializeDemoData() {
  const users = defaultUsers.map((user) => ({
    active: true,
    ...user,
  }));

  seedIfEmpty("users", users);
  seedIfEmpty("events", defaultEvents);

  seedIfEmpty("announcements", [
    {
      id: "ANN001",
      title: "Hackathon Registration Open",
      message: "Registration for Hackathon 2026 is now open. Register before the deadline.",
      category: "Events",
      society: "Coding Club",
      club: "Coding Club",
      date: "2026-08-08",
      createdBy: "Admin",
      active: true,
      createdAt: "2026-08-08T09:00:00.000Z",
    },
    {
      id: "ANN002",
      title: "AI Workshop",
      message: "The AI Workshop will be held in Lab 5 on 20 August 2026.",
      category: "Workshop",
      society: "GDG",
      club: "GDG",
      date: "2026-08-08",
      createdBy: "Admin",
      active: true,
      createdAt: "2026-08-08T08:00:00.000Z",
    },
    {
      id: "ANN003",
      title: "Certificates Available",
      message: "Certificates for completed activities are now available in the Certificates section.",
      category: "Certificates",
      society: "MYCA",
      club: null,
      date: "2026-08-07",
      createdBy: "Admin",
      active: true,
      createdAt: "2026-08-07T08:00:00.000Z",
    },
  ]);

  // Demo certificates make the certificate workflow visible in the student dashboard.
  // They are created only once and can be removed later through the certificate service.
  seedIfEmpty("certificates", [
    {
      id: "CERT001",
      studentId: "ST001",
      eventId: "EVT000",
      event: "Web Development Workshop",
      society: "Coding Club",
      issueDate: "2026-08-02",
    },
    {
      id: "CERT002",
      studentId: "ST001",
      eventId: "EVT000",
      event: "Photography Contest",
      society: "Cultural Club",
      issueDate: "2026-07-18",
    },
    {
      id: "CERT003",
      studentId: "ST002",
      eventId: "EVT000",
      event: "Web Development Workshop",
      society: "Coding Club",
      issueDate: "2026-08-02",
    },
    {
      id: "CERT004",
      studentId: "ST002",
      eventId: "EVT000",
      event: "Photography Contest",
      society: "Cultural Club",
      issueDate: "2026-07-18",
    },
  ]);

  seedIfEmpty("favorites", []);
  seedIfEmpty("registrations", []);
}
