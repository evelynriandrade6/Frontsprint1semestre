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
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import ModalCriarReserva from "../components/ModalCriarReserva";

function ModalMinhasReservas({ onClose }) {
  const [schedules, setSchedules] = useState([]);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [scheduleToDelete, setScheduleToDelete] = useState({ id: "", name: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const openDeleteModal = (id, name) => {
    setScheduleToDelete({ id, name });
    setModalOpen(true);
  };

  async function getSchedulesByUserCPF() {
    const cpf = localStorage.getItem("user_cpf");
    if (!cpf) {
      showAlert("error", "CPF do usuário não encontrado.");
      return;
    }
    try {
      const response = await api.getSchedulesByUserCPF(cpf);
      const scheduleObj = response.data.schedule;
      const allSchedules = Object.entries(scheduleObj).flatMap(([dia, reservas]) =>
        reservas.map((reserva) => ({ ...reserva, dia }))
      );
      setSchedules(allSchedules);
    } catch (error) {
      console.log("Erro ao buscar reservas:", error);
      showAlert("error", error.response.data.error || "Erro ao carregar reservas.");
      setSchedules([]);
    }
  }

  useEffect(() => {
    getSchedulesByUserCPF();
  }, []);

  async function deleteSchedule() {
    try {
      await api.deleteSchedule(scheduleToDelete.id);
      showAlert("success", "Reserva deletada com sucesso!");
      setModalOpen(false);
      getSchedulesByUserCPF();
    } catch (error) {
      showAlert("error", "Erro ao deletar reserva!");
      setModalOpen(false);
    }
  }

  const listSchedules = schedules.map((schedule) => (
    <TableRow key={schedule.id}>
      <TableCell align="center">{schedule.classroomName}</TableCell>
      <TableCell align="center">{schedule.horaInicio}</TableCell>
      <TableCell align="center">{schedule.horaFim}</TableCell>
      <TableCell align="center">{schedule.dia}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => openDeleteModal(schedule.id, schedule.classroomName)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      {/* Alert fora do modal, com z-index mais alto */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 2000 }} // <--- Resolvendo sobreposição
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Modal Principal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1500,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            width: "80%",
            maxHeight: "90%",
            overflowY: "auto",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            position: "relative"
          }}
        >
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer"
            }}
          >
            Fechar
          </button>

          <h3 style={{ color: "green", marginBottom: "1rem" }}>Minhas Reservas</h3>

          {schedules.length === 0 ? (
            <p>Carregando reservas...</p>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead style={{ backgroundColor: "green" }}>
                  <TableRow>
                    <TableCell align="center" style={{ color: "#fff" }}>Sala</TableCell>
                    <TableCell align="center" style={{ color: "#fff" }}>Hora Início</TableCell>
                    <TableCell align="center" style={{ color: "#fff" }}>Hora Fim</TableCell>
                    <TableCell align="center" style={{ color: "#fff" }}>Dia</TableCell>
                    <TableCell align="center" style={{ color: "#fff" }}>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{listSchedules}</TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <ModalConfirmDelete
        open={modalOpen}
        userName={scheduleToDelete.name}
        onConfirm={deleteSchedule}
        onClose={() => setModalOpen(false)}
      />
      
    </>
  );
}

export default ModalMinhasReservas; 