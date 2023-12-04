import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Sala de Bate-papo</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/cadastro-usuarios">
            <Nav.Link>Cadastro de Usuários</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/bate-papo">
            <Nav.Link>Bate-papo</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}