import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import "./styles.css";

function SignUp({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp(event) {
    event.preventDefault();
    const response = await api.post("/sessions", {
      name,
      email,
      pwd,
      profession
    });
    if (!name || !email || !pwd || !profession) {
      setError("Preencha todos os campos");
    } else {
      try {
        const { token } = await response.data;
        login(response.data.token)
        history.push("/app");
        console.log(token)
      } catch (err) {
        console.log(err);
        setError("Aconteceu um erro");
      }
    }
  }
  return (
    <section className="form-section">
      <h1>ServIsso?</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSignUp}>
          <div className="input-block">
            <p className='msg-error'>{error}</p>
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
