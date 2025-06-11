import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";
import logo from "../images/SENAI.png";

function Login() {
  const [user, setUser] = useState({
    cpf: "",
    password: "",
  });

  const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleCloseAlert = (_, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    try {
      const response = await api.postLogin(user);
      setAlert({ open: true, severity: "success", message: response.data.message });

      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_cpf", user.cpf);

      setTimeout(() => navigate("/Home"), 1500); // Espera o alerta aparecer antes de redirecionar
    } catch (error) {
      console.log(error);
      setAlert({
        open: true,
        severity: "error",
        message: error.response?.data?.error || "Erro no login.",
      });
    }
  }

  return (
    <Container component="main" maxWidth="xl">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </MuiAlert>
      </Snackbar>

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
            label="CPF"
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
            label="SENHA"
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
          <Typography variant="body2" sx={{ mt: 1 }}>
            Não tem uma conta?
          </Typography>
          <Link to="/cadastro" style={{ color: "blue" }}>
            Clique aqui!
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
