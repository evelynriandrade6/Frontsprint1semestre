import { useState } from "react";
import api from "../axios/axios";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/SENAI.png";

function CadastroSala() {
  const [classroom, SetClassroom] = useState({
    number: "",
    description: "",
    capacity: "",
  });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    SetClassroom({ ...classroom, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registrarSala();
  };

  async function registrarSala() {
    if (!classroom.number || !classroom.description || !classroom.capacity) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await api.postCadastroSala(classroom); // Aqui é que você chama sheets.postCadastroSala
      alert(response.data.message);
      localStorage.setItem("authenticated", true);
      navigate("/Home");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao cadastrar sala");
    }
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
        <Typography component="h1" variant="h5"></Typography>
        
        <Typography component="h1" variant="h5">
          Cadastre-se sua sala!
        </Typography>
        <Box
          component="form"
          sx={{
            width: "80%",
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Typography component="h3">Número</Typography>
          <TextField
            required
            fullWidth
            id="numero"
            label="Número"
            name="number" // Alterei de "numero" para "number"
            margin="normal"
            value={classroom.number}
            onChange={onChange}
          />
          <Typography component="h3">Descrição</Typography>
          <TextField
            required
            fullWidth
            id="descricao"
            label="Descrição"
            name="description" // Alterei de "descricao" para "description"
            margin="normal"
            value={classroom.description}
            onChange={onChange}
          />
          <Typography component="h3">Capacidade</Typography>
          <TextField
            required
            fullWidth
            id="capacidade"
            label="Capacidade"
            name="capacity" // Alterei de "capacidade" para "capacity"
            margin="normal"
            value={classroom.capacity}
            onChange={onChange}
            type="number"
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
            Criar sala
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "flex-start",
          mt: 2,
          mb: 4,
        }}
      >
        <Button variant="outlined" onClick={() => navigate("/Home")}>
          Voltar
        </Button>
      </Box>
    </Container>
  );
}

export default CadastroSala;
