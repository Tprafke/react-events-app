import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Event } from "../models/event";
import NavBar from "./NavBar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Events.list().then((response) => {
      let events: Event[] = [];
      response.forEach((event) => {
        event.date = event.date.split("T")[0];
        events.push(event);
      });
      setEvents(events);
      setLoading(false);
    });
  }, []);

  function handleSelectEvent(id: string) {
    setSelectedEvent(events.find((x) => x.id === id));
  }

  function handleCancelSelectEvent() {
    setSelectedEvent(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectEvent(id) : handleCancelSelectEvent();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditEvent(event: Event) {
    setSubmitting(true);
    if (event.id) {
      agent.Events.update(event).then(() => {
        setEvents([...events.filter((x) => x.id !== event.id), event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      event.id = uuid();
      agent.Events.create(event).then(() => {
        setEvents([...events, event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteEvent(id: string) {
    setSubmitting(true);
    agent.Events.delete(id).then(() => {
      setEvents([...events.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
    
  }

  if (loading) return <LoadingComponent content='Loading app' />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <EventDashboard
          events={events}
          selectedEvent={selectedEvent}
          selectEvent={handleSelectEvent}
          cancelSelectEvent={handleCancelSelectEvent}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditEvent}
          deleteEvent={handleDeleteEvent}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
