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

function Cadastro() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name:"",
    cpf:"",
  });
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };
  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        navigate("/Home");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }
  return (
    <Container component="main" maxWidth="xl" >
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
          Cadastre-se
        </Typography>
        <Box
          component="form"
          sx={{
            width: "80%",
            mt: 1,
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Typography component="h3">Nome</Typography>
          <TextField
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            margin="name"
            value={user.name}
            onChange={onChange}
          />
                <Typography component="h3">Email</Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            margin="email"
            value={user.email}
            onChange={onChange}
          />
                <Typography component="h3">CPF</Typography>
          <TextField
            required
            fullWidth
            id="cpf"
            label="cpf"
            name="cpf"
            margin="cpf"
            value={user.cpf}
            onChange={onChange}
          />
          <Typography>Senha</Typography>
          <TextField
            required
            fullWidth
            id="password"
            label="senha"
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
            Criar conta
          </Button>
          <h4 sx={{fontFamily:"initial"}}>Não tem uma conta?</h4>
          <Link to="/" style={{ color: "blue" }}>
          Clique aqui!
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default Cadastro;

