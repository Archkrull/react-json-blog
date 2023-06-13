import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    /* MDBNavbarLink, */
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
  } from 'mdb-react-ui-kit';

const Header = () => {
    const [show, setShow] = useState(false)
  return (
    <div>
        <MDBNavbar expand="lg" light style={{ backgroundColor: "#541b1b"}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
            <img src='/images/logo.jpg' alt='logo' style={{height: '30px'}}/>
        </MDBNavbarBrand>
        <MDBNavbarToggler 
        type="button"
        data-target='#navbarColor02'
        aria-controls='navbarColor02'
        aria-expanded='false'
        aria-label='Toggle Navigation'
        onClick={() => setShow(!show)}
        style={{color: '#fff'}}
        >
            <MDBIcon icon='bars' fas/>
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                <MDBNavbarItem className='active'>
                    <NavLink aria-current='page' to='/' style={{color: '#fff', margin: '10px'}}>
                        Home
                    </NavLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <NavLink to='/addBlog' style={{color: '#fff', margin: '10px'}}>Add Blog</NavLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <NavLink to='/about' style={{color: '#fff', margin: '10px'}}>About</NavLink>
                </MDBNavbarItem>
            </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
  )
}

export default Header