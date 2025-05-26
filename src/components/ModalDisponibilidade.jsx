import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import api from "../axios/axios";

export default function ModalDisponibilidade({ open, onClose, classroom }) {
  const [filtroDataInicio, setFiltroDataInicio] = useState(null);
  const [filtroDataFim, setFiltroDataFim] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const verificarDisponibilidade = async () => {
    if (!filtroDataInicio || !filtroDataFim) {
      alert("Selecione a data de início e de fim");
      return;
    }

    if (filtroDataFim < filtroDataInicio) {
      alert("A data de fim não pode ser anterior à data de início.");
      setHorariosDisponiveis([]);
      return;
    }

    try {
      const response = await api.getSchedulesByIdClassroomRanges(
        classroom.number,
        filtroDataInicio.toISOString().split("T")[0],
        filtroDataFim.toISOString().split("T")[0]
      );

      console.log(
        "Resposta completa da disponibilidade:",
        JSON.stringify(response.data, null, 2)
      );

      const horariosLivres = [];

      const diasDaSemana = Object.keys(
        response.data.schedulesByDayAndTimeRange
      );

      diasDaSemana.forEach((dia) => {
        const horarios = response.data.schedulesByDayAndTimeRange[dia];
        Object.entries(horarios).forEach(([intervalo, reservas]) => {
          if (!reservas || reservas.length === 0) {
            const [inicio, fim] = intervalo.split(" - ");
            horariosLivres.push({
              day: dia,
              timeStart: inicio.trim(),
              timeEnd: fim.trim(),
            });
          }
        });
      });

      setHorariosDisponiveis(horariosLivres);
    } catch (error) {
      console.error(
        "Erro ao verificar disponibilidade:",
        error.response?.data || error.message
      );
      alert(
        "Erro ao buscar disponibilidade: " +
          (error.response?.data?.error || error.message)
      );
      setHorariosDisponiveis([]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Disponibilidade da sala: {classroom?.number || "Sala"}
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <Stack spacing={2}>
            <DatePicker
              label="Data de Início"
              value={filtroDataInicio}
              onChange={(newValue) => setFiltroDataInicio(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
            />

            <DatePicker
              label="Data de Fim"
              value={filtroDataFim}
              onChange={(newValue) => setFiltroDataFim(newValue)}
              minDate={filtroDataInicio}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="dense"
                  helperText={
                    filtroDataInicio
                      ? "Selecione uma data igual ou posterior à data de início."
                      : "Escolha primeiro a data de início."
                  }
                />
              )}
            />

            <Button variant="contained" onClick={verificarDisponibilidade}>
              Verificar Disponibilidade
            </Button>

            {horariosDisponiveis.length > 0 && (
              <List>
                {horariosDisponiveis.map((horario, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${horario.day}: ${horario.timeStart} - ${horario.timeEnd}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
