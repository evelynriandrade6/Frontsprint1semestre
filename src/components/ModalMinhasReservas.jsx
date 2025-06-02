import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ModalConfirmDelete from "../components/ModalConfirmDelete";

function ModalMinhasReservas() {
  const [schedules, setSchedules] = useState([]);  // começa como array vazio
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [scheduleToDelete, setScheduleToDelete] = useState({ id: "", name: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

//   const openDeleteModal = (id, name) => {
//     setScheduleToDelete({ id, name });
//     setModalOpen(true);
//   };

  const navigate = useNavigate();

  async function getSchedulesByUser() {
    const cpf = localStorage.getItem("user_cpf");
    if (!cpf) {
      showAlert("error", "CPF do usuário não encontrado.");
      return;
    }
    try {
      // Usa a função do seu axios que retorna a promise correta
      const response = await api.getSchedulesByUserCPF(cpf);
      // Garante que schedules seja sempre array
      setSchedules(response.data.schedules || []);
    } catch (error) {
      console.log("Erro ao buscar reservas:", error);
      showAlert("error", "Erro ao buscar reservas.");
      setSchedules([]); // evita undefined
    }
  }

  useEffect(() => {
    getSchedulesByUser();
  }, []);

  async function deleteSchedule() {
    try {
      await api.deleteSchedule(scheduleToDelete.id);
      showAlert("success", "Reserva deletada com sucesso!");
      setModalOpen(false);
      getSchedulesByUser(); // atualiza lista após exclusão
    } catch (error) {
      showAlert("error", "Erro ao deletar reserva!");
      setModalOpen(false);
    }
  }

  const listSchedules = schedules.map((schedule) => (
    <TableRow key={schedule.id || schedule.number}>
      <TableCell align="center">{schedule.dateStart}</TableCell>
      <TableCell align="center">{schedule.dateEnd}</TableCell>
      <TableCell align="center">{schedule.days}</TableCell>
      <TableCell align="center">{schedule.classroom}</TableCell>
      <TableCell align="center">{schedule.timeStart}</TableCell>
      <TableCell align="center">{schedule.timeEnd}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => openDeleteModal(schedule.id, schedule.classroom)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
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

      {/* <ModalConfirmDelete
        open={modalOpen}
        userName={scheduleToDelete.name}
        onConfirm={deleteSchedule}
        onClose={() => setModalOpen(false)}
      /> */}

      {schedules.length === 0 ? (
        <p>Carregando reservas...</p>
      ) : (
        <div>
          <h5>Minhas Reservas</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "green", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Início</TableCell>
                  <TableCell align="center">Fim</TableCell>
                  <TableCell align="center">Dias</TableCell>
                  <TableCell align="center">Sala</TableCell>
                  <TableCell align="center">Hora Início</TableCell>
                  <TableCell align="center">Hora Fim</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listSchedules}</TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ModalMinhasReservas;
