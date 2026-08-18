import { events as defaultEvents } from "../data/events";

const EVENTS_KEY = "events";

export function getEvents() {
  const stored = JSON.parse(localStorage.getItem(EVENTS_KEY) || "null");

  if (Array.isArray(stored) && stored.length > 0) {
    return stored;
  }

  localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEvents));
  return defaultEvents;
}

function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

export function addEvent(event) {
  const events = getEvents();

  const newEvent = {
    id: Date.now().toString(),
    title: "",
    description: "",
    society: "",
    venue: "",
    date: "",
    time: "",
    banner: "",
    image: "",
    maxParticipants: 0,
    registeredStudents: [],
    registrationOpen: true,
    createdAt: new Date().toISOString(),
    ...event,
  };

  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export function updateEvent(updatedEvent) {
  const events = getEvents();
  saveEvents(
    events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    )
  );
}

export function deleteEvent(id) {
  saveEvents(getEvents().filter((event) => event.id !== id));
}

export function getEventById(id) {
  return getEvents().find((event) => String(event.id) === String(id));
}

export function getEventsBySociety(society) {
  return getEvents().filter((event) => event.society === society);
}

export function getEventsByClub(club) {
  return getEvents().filter(
    (event) => event.society === club || event.club === club
  );
}
