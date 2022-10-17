import React from "react";
import { Menu, Container, Button, Icon } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
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
          <Button onClick={openForm} positive content='Create Event' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
