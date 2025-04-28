import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

 function ListClassrooms() {
  const [classrooms, setClassrooms] = useState([]);

  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("authenticated");
    navigate("/")
  }

  // Função para buscar as salas
  async function getClassrooms() {
    await api.getAllClassroom().then(
      (response) => {
        console.log(response.data.classrooms); // Verifique se o nome é realmente 'classrooms'
        setClassrooms(response.data.classrooms); // Atualizando o estado com as salas
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  // Função que gera as linhas da tabela com as informações de cada sala
  const listClassrooms = classrooms.map((classroom) => {
    return (
      <TableRow key={classroom.id}>
        <TableCell align="center">{classroom.number}</TableCell>
        <TableCell align="center">{classroom.description}</TableCell>
        <TableCell align="center">{classroom.capacity}</TableCell>
      </TableRow>
    );
  });

  // Usando useEffect para carregar as salas assim que o componente for montado
  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <div>
      <h5>Lista de Salas</h5>
      <TableContainer component={Paper} style={{ margin: "2px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "blue", borderStyle: "solid" }}>
            <TableRow align="center">
              <TableCell align="center">Número</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Capacidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listClassrooms}</TableBody>
        </Table>
      </TableContainer>
      <Button fullWidth variant="contained" onClick={logout} >
        Sair
      </Button>
    </div>
  );
}

export default ListClassrooms;
