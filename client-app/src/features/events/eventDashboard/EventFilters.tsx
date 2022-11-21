import { observer } from "mobx-react-lite";
import React from "react";
import { Calendar } from "react-calendar";
import { Menu, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function EventFilters() {
  const {
    eventStore: { predicate, setPredicate },
  } = useStore();
  return (
    <>
      <Menu vertical size='large' style={{ width: "100%", marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Events'
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
          content="I'm going"
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
          content="I'm hosting"
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date: any) => setPredicate("startDate", date as Date)}
        value={predicate.get("startDate") || new Date()}
      />
    </>
  );
});
