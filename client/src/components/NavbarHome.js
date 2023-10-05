import React from 'react'
import '../style/navbarHome.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

function NavbarHome (){

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand><Link to="/" className='link'>Home</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/letterboxd/watchlist" className='link'>Watchlist</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )


}

export default NavbarHome