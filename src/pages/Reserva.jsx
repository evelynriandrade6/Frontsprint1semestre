import { useState } from "react";
import { Box, Typography, Container, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import logo from "../images/SENAI.png";

function ReservaSala() {
  const [schedule, setSchedule] = useState({
    user: "",
    classroom: "",
    dateStart: "",
    dateEnd: "",
    timeStart: "",
    timeEnd: "",
    days: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setSchedule({ ...schedule, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registrarReserva();
  };

  async function registrarReserva() {
    const { user, classroom, dateStart, dateEnd, timeStart, timeEnd, days } =
      schedule;

    if (
      !user ||
      !classroom ||
      !dateStart ||
      !dateEnd ||
      !timeStart ||
      !timeEnd ||
      !days
    ) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await api.postCadastroReserva(schedule);
      alert(response.data.message);
      localStorage.setItem("authenticated", true);
      navigate("/Home");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao cadastrar sua reserva!");
    }
  }

  return (
    <Container component="main" maxWidth="md">
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
          Faça a sua reserva!
        </Typography>
        <Box
          component="form"
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            required
            fullWidth
            id="user"
            label="Usuário"
            name="user"
            value={schedule.user}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="classroom"
            label="Sala"
            name="classroom"
            value={schedule.classroom}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="dateStart"
            label="Data de Início"
            name="dateStart"
            InputLabelProps={{ shrink: true }}
            value={schedule.dateStart}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="dateEnd"
            label="Data de Término"
            name="dateEnd"
            InputLabelProps={{ shrink: true }}
            value={schedule.dateEnd}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="timeStart"
            label="Hora de Início"
            name="timeStart"
            InputLabelProps={{ shrink: true }}
            value={schedule.timeStart}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="timeEnd"
            label="Hora de Término"
            name="timeEnd"
            InputLabelProps={{ shrink: true }}
            value={schedule.timeEnd}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="days"
            label="Dias da semana (ex: Segunda, Quarta)"
            name="days"
            value={schedule.days}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, backgroundColor: "gray" }}
          >
            Criar reserva
          </Button>
        </Box>
        {/* Botão de voltar no canto esquerdo */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/Home")}>
            Voltar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ReservaSala;
