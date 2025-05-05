import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // 👈 IMPORTANTE
import api from "../axios/axios";
import { format } from "date-fns";

export default function ModalData({ open, onClose, selectedDate }) {
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const navigate = useNavigate(); // 👈 hook para redirecionamento

  const formatDate = (date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    if (!selectedDate) return;

    const fetchHorarios = async () => {
      try {
        const response = await api.get("/schedule", {
          params: { date: formatDate(selectedDate) },
        });

        const horarios = response.data
          .filter((item) => {
            const start = new Date(item.dateStart);
            const end = new Date(item.dateEnd);
            const selected = new Date(selectedDate);
            return selected >= start && selected <= end;
          })
          .map((item) => item.timeStart);

        setHorariosDisponiveis(horarios);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
        alert("Erro ao buscar horários.");
      }
    };

    fetchHorarios();
  }, [selectedDate]);

  const handleReserva = () => {
    if (!horarioSelecionado) {
      alert("Por favor, selecione um horário.");
      return;
    }

    // Simplesmente redireciona para a página de confirmação
    navigate("/confirmacao", {
      state: {
        horario: horarioSelecionado,
        data: format(selectedDate, "dd/MM/yyyy"),
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fazer reserva</DialogTitle>

      <DialogContent>
        {selectedDate ? (
          <>
            <Typography variant="h6" gutterBottom>
              Selecione um horário para o dia{" "}
              {format(selectedDate, "dd/MM/yyyy")}
            </Typography>

            <List>
              {horariosDisponiveis.length > 0 ? (
                horariosDisponiveis.map((horario) => (
                  <ListItem
                    button
                    key={horario}
                    selected={horarioSelecionado === horario}
                    onClick={() => setHorarioSelecionado(horario)}
                  >
                    <ListItemText primary={horario} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1">
                  Nenhum horário disponível.
                </Typography>
              )}
            </List>

            {horarioSelecionado && (
              <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                Horário selecionado: {horarioSelecionado}
              </Typography>
            )}
          </>
        ) : (
          <Typography variant="body1">
            Selecione uma data para continuar.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleReserva}
          variant="contained"
          disabled={!selectedDate}
        >
          Reservar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
