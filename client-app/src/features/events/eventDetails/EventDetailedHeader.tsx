import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Event } from "../../../app/models/event";

const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  event: Event;
}

export default observer(function EventDetailedHeader({ event }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/Images/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment style={eventImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Event</Button>
        <Button>Cancel attendance</Button>
        <Button color='orange' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
});