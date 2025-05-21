import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ModalCriarReserva from "../components/ModalCriarReserva";



function ListClassrooms() {
  const [classrooms, setClassrooms] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  async function getClassrooms() {
    await api.getAllClassroom().then(
      (response) => {
        console.log(response.data.classrooms);
        setClassrooms(response.data.classrooms);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const logout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const [classroomSelecionado, setclassroomSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalReserva = (classroom) => {
    setclassroomSelecionado(classroom);
    setModalOpen(true);
  };

  const fecharModalReserva = () => {
    setModalOpen(false);
    setclassroomSelecionado("");
  };

  useEffect(() => {
    getClassrooms();
  }, []);

  const listClassrooms = classrooms.map((classroom) => (
    <TableRow key={classroom.number}>
      <TableCell align="center">{classroom.number}</TableCell>
      <TableCell align="center">{classroom.description}</TableCell>
      <TableCell align="center">{classroom.capacity}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => abrirModalReserva(classroom)}
        >
          Reservar
        </Button>
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
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarReserva
        open={modalOpen}
        onClose={fecharModalReserva}
        classroomSelecionado={classroomSelecionado}
      />

      {classrooms.length === 0 ? (
        <p>Carregando Salas</p>
      ) : (
        <div>
          <h5>Lista de Salas</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "green", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Número</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Capacidade</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listClassrooms}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListClassrooms;
