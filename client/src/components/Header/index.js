import React from "react";
import Auth from "../../utils/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from '../../assets/logo.jpeg';



function Header() {
  return (
<> 
<Navbar  bg='primary' variant="dark" collapseOnSelect expand='lg'>
      <Container fluid >
      <Navbar.Brand href='/' style={{fontFamily: 'fantasy', fontSize: '28px', fontWeight: '600'}}><img src={logo} alt="logo" style={{width: '80px'}}/>Tutor-Student Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar'>
          <Nav className='me-auto' style={{fontSize:'18px'}}>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/features'>Features</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>

            {Auth.loggedIn() && (
                <>
                <Nav.Link href='/tutor-profile'>Profile</Nav.Link>
                  <Nav.Link href='/logout'>Logout</Nav.Link>
                </>
              )}
            
            {!Auth.loggedIn() && (
              <>
              <Nav.Link href="/login">
                Login</Nav.Link>

                <NavDropdown title='Signup'>
                  <NavDropdown.Item href='/student-signup'>
                    Student Signup
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/tutor-signup'>
                    Tutor Signup
                  </NavDropdown.Item>
                </NavDropdown>
               
              </>
            )}
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
</>
  
  );
}

export default Header;
