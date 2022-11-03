import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Icon, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Icon
            name='fire'
            size='large'
            style={{ marginBottom: 12 }}
            alt='logo'
          />
          React Events
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to React Events' />
            <Button as={Link} to='/events' size='huge' inverted>
              Get Started
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size='huge'
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size='huge'
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
