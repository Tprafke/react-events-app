import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventForm from "../../features/events/eventForm/EventForm";
import EventDetails from "../../features/events/eventDetails/EventDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path='/events' component={EventDashboard} />
                <Route path='/events/:id' component={EventDetails} />
                <Route
                  key={location.key}
                  path={["/createEvent", "/manage/:id"]}
                  component={EventForm}
                />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
