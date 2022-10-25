import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
  const { eventStore } = useStore();
  const { groupedEvents } = eventStore;

  return (
    <>
      {groupedEvents.map(([group, events]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
