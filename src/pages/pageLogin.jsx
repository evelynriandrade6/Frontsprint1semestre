import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";
import logo from "../images/SENAI.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} style={{ width: "20%" }} />
        <Typography component="h1" variant="h5">
          Faça Login
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            width: "80%",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Typography component="h3">CPF</Typography>
          <TextField
            required
            fullWidth
            id="cpf"
            label="cpf"
            name="cpf"
            margin="normal"
            value={user.cpf}
            onChange={onChange}
          />
          <Typography>Senha</Typography>
          <TextField
            required
            fullWidth
            id="password"
            label="senha"
            Typography="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "gray",
            }}
          >
            Entrar
          </Button>
          <h3 sx={{ fontFamily: "initial" }}>Não tem uma conta?</h3>
          <Link to="/cadastro" style={{ color: "blue" }}>
            Clique aqui!
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
