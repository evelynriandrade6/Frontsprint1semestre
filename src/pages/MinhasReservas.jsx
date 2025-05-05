import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios"; // Seu arquivo de API

function MinhasReservas() {
  const [cpf, setCpf] = useState("");
  const [schedulesByDay, setSchedulesByDay] = useState({});
  const [buscou, setBuscou] = useState(false);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    if (!cpf.trim()) {
      alert("Digite um CPF válido.");
      return;
    }

    try {
      const response = await api.getMinhasReservas(cpf);
      console.log("Resposta da API:", response); // Log da resposta da API

      if (response?.data?.schedulesByDay) {
        setSchedulesByDay(response.data.schedulesByDay);
        setBuscou(true);
      } else {
        throw new Error("Formato inesperado da resposta da API.");
      }
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setErro(error.message || "Erro desconhecido ao buscar reservas.");
      setSchedulesByDay({});
      setBuscou(true);
    }
  };

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
        <Typography component="h1" variant="h5">
          Buscar Reservas por CPF
        </Typography>

        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Digite seu CPF"
            variant="outlined"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleBuscar}>
            Buscar
          </Button>
        </Box>

        {erro && (
          <Typography sx={{ mt: 4, color: "red" }}>
            Erro: {erro}
          </Typography>
        )}

        {buscou && !erro && Object.keys(schedulesByDay).length === 0 ? (
          <Typography sx={{ mt: 4 }}>
            Você não tem reservas cadastradas.
          </Typography>
        ) : (
          <Box sx={{ width: "100%", mt: 4 }}>
            {Object.keys(schedulesByDay).map((day, index) => (
              <Box key={index} sx={{ marginBottom: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {day}
                </Typography>
                {schedulesByDay[day].length === 0 ? (
                  <Typography sx={{ color: "gray" }}>Sem reservas para este dia</Typography>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {schedulesByDay[day].map((schedule, i) => (
                      <Box
                        key={i}
                        sx={{
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          padding: 2,
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <Typography variant="h6">{`Reserva ${i + 1}`}</Typography>
                        <Typography>{`Sala: ${schedule.classroom}`}</Typography>
                        <Typography>{`Data de Início: ${schedule.dateStart}`}</Typography>
                        <Typography>{`Data de Término: ${schedule.dateEnd}`}</Typography>
                        <Typography>{`Hora de Início: ${schedule.timeStart}`}</Typography>
                        <Typography>{`Hora de Término: ${schedule.timeEnd}`}</Typography>
                        <Typography>{`Dias: ${schedule.days}`}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            mt: 40,
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

export default MinhasReservas;
