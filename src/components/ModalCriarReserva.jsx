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
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import api from "../axios/axios";

import ModalDisponibilidade from "../components/ModalDisponibilidade";

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function ModalCriarReserva({
  open,
  onClose,
  classroomSelecionado,
}) {
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [days, setDays] = useState([]);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);

  const [openModalDisponibilidade, setOpenModalDisponibilidade] = useState(false);

  const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });

  const handleOpenModalDisponibilidade = () => setOpenModalDisponibilidade(true);
  const handleCloseModalDisponibilidade = () => setOpenModalDisponibilidade(false);

  const handleCloseAlert = (_, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  function limpaState() {
    setDateStart(null);
    setDateEnd(null);
    setDays([]);
    setTimeStart(null);
    setTimeEnd(null);
    onClose();
  }

  const handleSubmit = async () => {
    if (!classroomSelecionado || !classroomSelecionado.number) {
      setAlert({ open: true, severity: "error", message: "Nenhuma sala selecionada!" });
      return;
    }
    if (!dateStart || !dateEnd || !timeStart || !timeEnd) {
      setAlert({ open: true, severity: "error", message: "Preencha todas as datas e horários." });
      return;
    }
    if (days.length === 0) {
      setAlert({ open: true, severity: "error", message: "Selecione pelo menos um dia." });
      return;
    }

    const user_cpf = localStorage.getItem("user_cpf");

    try {
      const payload = {
        dateStart: format(dateStart, 'yyyy-MM-dd'),
        dateEnd: format(dateEnd, 'yyyy-MM-dd'),
        days,
        user: user_cpf,
        timeStart: format(timeStart, 'HH:mm:ss'),
        timeEnd: format(timeEnd, 'HH:mm:ss'),
        classroom: classroomSelecionado.number,
      };

      const response = await api.postcreateSchedule(payload);

      setAlert({ open: true, severity: "success", message: response.data.message });
      limpaState(); // fecha o modal e limpa campos
    } catch (error) {
      console.log("Erro ao criar reserva", error.response?.data || error);
      setAlert({
        open: true,
        severity: "error",
        message: error.response?.data?.error || "Erro desconhecido",
      });
    }
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={limpaState}>
        <DialogTitle>
          Criar Reserva para: {classroomSelecionado.number || "Sala"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data de Início"
                value={dateStart}
                onChange={(newValue) => setDateStart(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
              <DatePicker
                label="Data de Fim"
                value={dateEnd}
                onChange={(newValue) => setDateEnd(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
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
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
              <TimePicker
                label="Hora de Fim"
                value={timeEnd}
                onChange={(newValue) => setTimeEnd(newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={limpaState}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Criar
          </Button>
          <Button onClick={handleOpenModalDisponibilidade} variant="outlined" color="secondary">
            Ver Disponibilidade
          </Button>
        </DialogActions>
      </Dialog>

      <ModalDisponibilidade
        open={openModalDisponibilidade}
        onClose={handleCloseModalDisponibilidade}
        classroom={classroomSelecionado}
      />
    </>
  );
}
