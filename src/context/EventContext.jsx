import { createContext, useContext, useEffect, useState } from "react";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../services/eventService";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  function loadEvents() {
    setEvents(getEvents());
  }

  function createEvent(event) {
    addEvent(event);
    loadEvents();
  }

  function editEvent(event) {
    updateEvent(event);
    loadEvents();
  }

  function removeEvent(id) {
    deleteEvent(id);
    loadEvents();
  }

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        editEvent,
        removeEvent,
        refreshEvents: loadEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}

export default EventContext;
