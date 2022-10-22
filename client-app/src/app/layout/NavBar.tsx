import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const {eventStore} = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <Icon
            name='fire'
            size='large'
            alt='logo'
            style={{ marginRight: "10px" }}
          />
          React Events
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button onClick={() => eventStore.openForm()} positive content='Create Event' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
