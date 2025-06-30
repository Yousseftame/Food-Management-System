import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {   FormControl, Dropdown } from "react-bootstrap";
import iconImg from '../../../../assets/images/Ellipse 235.png'
import { AuthContext } from '../../../../context/AuthContext';




export default function navbar() {
  let {loginData}= useContext(AuthContext);
  return (
  //  <Navbar expand="lg" className="bg-body-tertiary">
  //     <Container>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav">
  //         <Nav className="ms-auto">
  //           <Link className='text-decoration-none text-dark py-2'>Welcome,youssef1{loginData?.userName}</Link>
            
            
  //         </Nav>
          
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  
  
    <Navbar bg="light" className="px-4 py-2 d-flex justify-content-between ">
      {/* Search bar */}
      <Form className="d-flex w-100   ">
        <div className="input-group  ">
          <span className="input-group-text bg-white border-end-0 shadow-none rounded-pill" >
            <i className="bi bi-search  "></i>
          </span>
          <FormControl 
            type="search"
            placeholder="Search Here"
            className="border-start-0 shadow-none rounded-pill bg-light"
          />
        </div>
      </Form>

      {/* Profile section */}
      <div className="d-flex align-items-center gap-3">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="text-decoration-none d-flex align-items-center"
          >
            <img
              src={iconImg}
              alt="Avatar"
              className="rounded-circle me-2"
              width="30"
              height="30"
            />
           <Link className='text-decoration-none text-dark py-2'>{loginData?.userName}</Link>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Notification Bell */}
        <div className="position-relative">
         <i class="fa-solid fa-bell"></i>
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ width: "8px", height: "8px" }}
          ></span>
        </div>
      </div>
    </Navbar>


   )
}
