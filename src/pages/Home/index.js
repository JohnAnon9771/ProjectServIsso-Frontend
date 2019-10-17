import React, { useState, useEffect } from "react";

import { Navbar } from "react-bootstrap";

import { logout, isAuthenticated } from "../../services/auth";
import api from "../../services/api";

function Home({ history }) {
  const [user, setUser] = useState('');
  useEffect(() => {
    //URGENTEEE
    async function loadUser(event) {
      const response = await api.get("/home");
      setUser(response.data);
      console.log(response.data)
    }
    loadUser();
  }, []);

  async function logoutUser(event) {
    logout()
    isAuthenticated(false)
    history.push('/')
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home" >
          Navbar with text
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as:{user.name}</Navbar.Text>
          <Navbar.Text>
            <button type="submit" onClick={logoutUser}>Sair</button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

    </>
  );
}

export default Home;
