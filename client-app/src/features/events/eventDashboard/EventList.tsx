import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import { Event } from "../../../app/models/event";

interface Props {
  events: Event[];
  selectEvent: (id: string) => void;
  deleteEvent: (id: string) => void;
  submitting: boolean;
}

export default function EventList({
  events,
  selectEvent,
  deleteEvent,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleEventDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteEvent(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {events.map((event) => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as='a'>{event.title}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>
                  {event.city}, {event.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  // Needs an arrow function to await component rendering
                  onClick={() => selectEvent(event.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={event.id}
                  loading={submitting && target == event.id}
                  onClick={(e) => handleEventDelete(e, event.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={event.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
