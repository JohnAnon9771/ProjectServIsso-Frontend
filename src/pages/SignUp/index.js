import React, { useState, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import "./styles.css";
import { useStyles } from "./styles";

function SignUp({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const preview = useMemo(() => {
    return photo ? URL.createObjectURL(photo) : null;
  }, [photo]);

  async function handleSignUp(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("photo", photo);
    data.append("name", name);
    data.append("email", email);
    data.append("pwd", pwd);
    data.append("profession", profession);
    data.append("description", description);
    data.append("phoneNumber", phoneNumber);
    data.append("city", city);

    const response = await api.post("/", data);
    if (!name || !email || !pwd || !profession) {
      setError("Preencha todos os campos");
    } else {
      try {
        if (response.data) {
          alert("Cadastrado com sucesso!!");
        } else {
          alert("Erro no cadastro!!");
        }
      } catch (err) {
        console.log(err);
        setError("Aconteceu um erro");
      }
    }
  }
  //definindo css
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Serv<strong style={{ color: "#7159c1" }}>Isso?</strong>
        </Typography>
        <p>
          Obs: Recomendamos o uso de um computador para uma melhor experiência.
        </p>
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome completo"
                autoFocus
                onChange={event => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPwd(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="profession"
                label="Profissão"
                type="text"
                id="profession"
                onChange={event => setProfession(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                name="description"
                label="Descreva sua profissão"
                type="text"
                id="description"
                onChange={event => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="Sua cidade de atuação"
                type="text"
                id="city"
                onChange={event => setCity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="Seu numero de whatsapp"
                type="tel"
                id="phoneNumber"
                onChange={event => setPhoneNumber(event.target.value)}
              />
            </Grid>
            <label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={event => setPhoto(event.target.files[0])}
              />
              <img
                src="https://img.icons8.com/windows/32/000000/old-time-camera.png"
                alt="Select img"
              />
            </label>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}

export default withRouter(SignUp);
