// src/components/Header.tsx
import React from 'react';
import { Navbar, Text } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text h2 color="primary">
          My Blog
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/create-post">New Post</Link>
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
