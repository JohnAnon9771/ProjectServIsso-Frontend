import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import "./styles.css";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !pwd) {
      setError("Preencha todos os campos");
    } else {
      try {
        const response = await api.post("/authenticate", { email, pwd });
        login(response.data.token);
        if (response.data.user.email === "admin@admin.gmail.com") {
          history.push("/admin");
        } else {
          history.push("/home");
        }
      } catch (err) {
        setError("Houve um problema com o login");
      }
    }
  }

  return (
    <section className="form-section">
      <h1>ServIsso?</h1>

      <div className="form-wrapper">
        <form onSubmit={handleLogin}>
          <div className="input-block">
            <p className="msg-error">{error}</p>
            <label>Email</label>
            <input
              id="email"
              type="text"
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="login-email">Senha</label>
            <input
              id="login-email"
              type="password"
              onChange={event => setPwd(event.target.value)}
            />
          </div>
          <button type="submit" className="btn-login">
            Entrar
          </button>
          <Link to="/signup">Criar conta</Link>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Login);
