import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextField,
  Stack
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from "../axios/axios";

const diasDaSemana = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export default function ModalCriarReserva({ open, onClose, classroomSelecionado }) {
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [days, setDays] = useState([]);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await api.createSchedule({
        dateStart,
        dateEnd,
        days,
        timeStart,
        timeEnd,
        classrrom: classroomSelecionado.number,  // ou id, depende do backend
      });
      alert(response.data.message);
      limpaState();
    } catch (error) {
      console.log("Erro ao criar reserva", error.response?.data || error);
      alert(error.response?.data?.error || "Erro desconhecido");
    }
  };

  function limpaState() {
    setDateStart(null);
    setDateEnd(null);
    setDays([]);
    setTimeStart(null);
    setTimeEnd(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Criar Reserva para: {classroomSelecionado?.number || "Sala"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data de Início"
              value={dateStart}
              onChange={(newValue) => setDateStart(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />

            <DatePicker
              label="Data de Fim"
              value={dateEnd}
              onChange={(newValue) => setDateEnd(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <FormControl fullWidth margin="dense">
            <InputLabel id="label-dias">Dias para reserva</InputLabel>
            <Select
              labelId="label-dias"
              multiple
              value={days}
              onChange={(e) => setDays(e.target.value)}
              input={<OutlinedInput label="Dias" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {diasDaSemana.map((dia) => (
                <MenuItem key={dia} value={dia}>
                  <Checkbox checked={days.indexOf(dia) > -1} />
                  <ListItemText primary={dia} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

            <TimePicker
              label="Hora de Início"
              value={timeStart}
              onChange={(newValue) => setTimeStart(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />

            <TimePicker
              label="Hora de Fim"
              value={timeEnd}
              onChange={(newValue) => setTimeEnd(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
          </LocalizationProvider>

          
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
