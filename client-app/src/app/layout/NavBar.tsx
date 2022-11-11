import React from "react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Container,
  Button,
  Icon,
  Image,
  Dropdown,
} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
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
        <Menu.Item name='Errors' as={NavLink} to='/errors' />
        <Menu.Item>
          <Button
            as={NavLink}
            to='/createEvent'
            positive
            content='Create Event'
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Image
            src={user?.image || "/assets/images/user.png"}
            avatar
            spaced='right'
          />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user?.username}`}
                text='My Profile'
                icon='user'
              />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
