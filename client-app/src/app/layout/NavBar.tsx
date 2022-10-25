import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button, Icon } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <Icon
            name='fire'
            size='large'
            alt='logo'
            style={{ marginRight: "10px" }}
          />
          React Events
        </Menu.Item>
        <Menu.Item name='Events' as={NavLink} to='/events' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createEvent'
            positive
            content='Create Event'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
