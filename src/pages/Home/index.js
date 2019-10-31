import React, { useState, useEffect } from "react";

import Posts from "./Posts/index";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBCol
} from "mdbreact";

import { logout, isAuthenticated } from "../../services/auth";
import api from "../../services/api";

function Home({ history }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function loadUser(event) {
      const response = await api.get("/home");
      setUser(response.data);
    }
    loadUser();
  }, []);

  async function logoutUser(event) {
    logout();
    isAuthenticated(false);
    history.push("/");
  }

  async function getPosts(event) {}

  return (
    <>
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">ServIsso?</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler />
        <MDBCollapse id="navbarCollapse3" navbar>
          <MDBNavbarNav left></MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>{user.name}</MDBDropdownItem>
                  <MDBDropdownItem onClick={logoutUser}>Sair</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBCol md="10">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </MDBCol>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

      <Posts />
    </>
  );
}

export default Home;
