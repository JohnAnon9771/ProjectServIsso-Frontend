import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom'

import api from "../../services/api";
import "./styles.css";

function SignUp({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [profession, setProfession] = useState("");

  async function handleSignUp(event) {
    event.preventDefault();
    const response = await api.post("/sessions", {
      name,
      email,
      pwd,
      profession
    });
    if (!name || !email || !pwd || !profession) {
      alert("Preencha todos os campos");
    } else {
      try {
        const { _id } = await response.data;
        localStorage.setItem("user", _id);
        history.push("/");
      } catch (err) {
        console.log(err);
        alert("Aconteceu um erro");
      }
    }
  }
  return (
    <section className="form-section">
      <h1>ServIsso?</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSignUp}>
          <div className="input-block">
            <label>Nome</label>
            <input
              id="name"
              type="text"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              onChange={event => setPwd(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label>Profissão</label>
            <input
              id="profission"
              type="text"
              onChange={event => setProfession(event.target.value)}
            />
          </div>
          <button type="submit" className="btn-login">
            Cadastrar
          </button>
          <Link to="/">Entrar</Link>
        </form>
      </div>
    </section>
  );
}

export default withRouter(SignUp);
