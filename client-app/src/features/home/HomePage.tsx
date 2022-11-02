import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Icon, Button } from "semantic-ui-react";

export default function HomePage() {
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
        <Header as='h2' inverted content='Welcome to React Events' />
        <Button as={Link} to='/login' size='huge' inverted>
          Login
        </Button>
      </Container>
    </Segment>
  );
}
