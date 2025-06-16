import { useState, useEffect } from "react";
import api from "../axios/axios";
import { IconButton, Alert, Snackbar, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalConfirmDelete from "../components/ModalConfirmDelete";

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
      showAlert("error", error.response?.data?.error || "Erro ao carregar reservas.");
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

  //  Agrupando as reservas por dia
  const groupedByDay = schedules.reduce((acc, curr) => {
    const dia = curr.dia || "Sem dia";
    if (!acc[dia]) {
      acc[dia] = [];
    }
    acc[dia].push(curr);
    return acc;
  }, {});

  return (
    <>
      {/* Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 2000 }}
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
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <div
          style={{
            background: "#f5f7fa",
            padding: "2rem",
            borderRadius: "16px",
            width: "90%",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            position: "relative",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#e57373",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "6px 12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ef5350")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e57373")}
          >
            Fechar
          </button>

          <h2 style={{ color: "#801515", marginBottom: "1rem", textAlign: "center" }}>
            Minhas Reservas
          </h2>

          {schedules.length === 0 ? (
            <p style={{ textAlign: "center", color: "#555" }}>Nenhuma reserva encontrada.</p>
          ) : (
            Object.entries(groupedByDay).map(([dia, reservas]) => (
              <Paper
                key={dia}
                elevation={3}
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem 1.5rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ color: "#00695c", marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "4px" }}>
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </h3>
                {reservas.map((schedule) => (
                  <div
                    key={schedule.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <div style={{ color: "#333" }}>
                      <strong>Sala:</strong> {schedule.classroomName} |{" "}
                      <strong>Início:</strong> {schedule.horaInicio} |{" "}
                      <strong>Fim:</strong> {schedule.horaFim}
                    </div>
                    <IconButton
                      onClick={() => openDeleteModal(schedule.id, schedule.classroomName)}
                      size="small"
                    >
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </Paper>
            ))
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
