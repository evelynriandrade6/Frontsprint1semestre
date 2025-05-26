// import { useState, useEffect } from "react";
// // Imports para criação de tabela
// import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
// // TableHead é onde colocamos os titulos
// import TableHead from "@mui/material/TableHead";
// // TableBody é onde colocamos o conteúdo
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import Paper from "@mui/material/Paper";
// import api from "../axios/axios";
// import { Button, IconButton, Alert, Snackbar } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Link, useNavigate } from "react-router-dom";
// import ConfirmDelete from "../components/ConfirmDelete";
// import { Schedule } from "@mui/icons-material";

// function ModalMinhasReservas() {
//   const [schedules, setSchedules] = useState([]);
//   const [alert, setAlert] = useState({
//     // visibilidade (false: oculto; true: visível)
//      open: false, 
//      //nível de severidade (success, info, warning, error)
//     severity: "", 

//     //mensagem que será exibida
//     message:""
//    }); 

//    const [scheduleToDelete, setscheduleToDelete] = useState("");
//    const [modalOpen, setModalOpen] = useState(false);

//    // função para exibir o alerta
//    const showAlert = (severity, message) => {
//     setAlert({ open: true, severity, message });

//    };

//    //fechar o alerta
//    const handleCloseAlert  = () => {
//     setAlert({ ...alert, open: false });
//    };

//    const openDeleteModal = (id,name) =>{
//     setscheduleToDelete({ id: id, name: name});
//     setModalOpen(true);
//    }
//   const navigate = useNavigate();

//   async function getUsers() {
//     // Chamada da Api
//     await api.getUsers().then(
//       (response) => {
//         console.log(response.data.schedules);
//         setSchedules(response.data.schedules);
//       },
//       (error) => {
//         console.log("Erro ", error);
//       }
//     );
//   }

//   async function deleteSchedule() {
//     // Chamada da Api
//     try {
//       await api.deleteSchedule(scheduleToDelete.id);
//       await getUsers();
//       // mensagem informativa
//       showAlert("success", "Reserva deletada com sucesso!")
//       setModalOpen(false)
//     } catch (error) {
//       showAlert("error", "Erro ao deletar reserva!")
//       setModalOpen(false)

//       // mensagem informativa de erro
//     }
//   }

//   const listSchedules = schedules.map((schedule) => {
//     return (
//       <TableRow key={Schedule.id_usuario}>
//         <TableCell align="center">{user.name}</TableCell>
//         <TableCell align="center">{user.email}</TableCell>
//         <TableCell align="center">{user.cpf}</TableCell>
//         <TableCell align="center">
//           <IconButton onClick={() => openDeleteModal(user.id_usuario,user.name)}>
//             <DeleteIcon color="error" />
//           </IconButton>
//         </TableCell>
//       </TableRow>
//     );
//   });

//   function logout() {
//     localStorage.removeItem("authenticated");
//     navigate("/");
//   }

//   useEffect(() => {
//     // if(!localStorage.getItem("authenticated")){
//     //   navigate("/");
//     // }
//     getUsers();
//   }, []);
  
//   return (
//     <div>
//       <Snackbar open ={alert.open} autoHideDuration={3000} 
//       onClose={handleCloseAlert}
//       anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      
//         <Alert onClose={handleCloseAlert} severity={alert.severity}
//         sx={{width: "100%"}}
//         >
//           {alert.message}
//         </Alert>

//       </Snackbar>
//       <ConfirmDelete
//       open={modalOpen}
//       userName={userToDelete.name}
//       onConfirm={deleteUser}
//       onClose={()=>setModalOpen(false)}
      
//       />

//       {users.length === 0 ? (
//         <p>Carregando usuários</p>
//       ) : (
//         <div>
//           <h5>Lista de usuários</h5>
//           <TableContainer component={Paper} style={{ margin: "2px" }}>
//             <Table size="small">
//               <TableHead
//                 style={{ backgroundColor: "green", borderStyle: "solid" }}
//               >
//                 <TableRow>
//                   <TableCell align="center">Nome</TableCell>
//                   <TableCell align="center">Email</TableCell>
//                   <TableCell align="center">CPF</TableCell>
//                   <TableCell align="center">Ações</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>{listUsers}</TableBody>
//             </Table>
//           </TableContainer>
//           <Button fullWidth variant="contained" onClick={logout}>
//             SAIR
//           </Button>
          
//           <Button type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               mb: 2,
//               backgroundColor: "blue",
//             }}>
//            <Link to="/evento">IR PARA LISTA DE EVENTOS</Link>
//           </Button>
          
//         </div>
//       )}
//     </div>
//   );
// }
// export default ModalMinhasReservas;
