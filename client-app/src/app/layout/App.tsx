import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/eventForm/EventForm";
import EventDetails from "../../features/events/eventDetails/EventDetails";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetails} />
              <Route
                key={location.key}
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
