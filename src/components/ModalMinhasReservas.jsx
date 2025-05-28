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
//       <TableRow key={Schedule.id}>
//         <TableCell align="center">{schedule.dateStart}</TableCell>
//         <TableCell align="center">{schedule.dateEnd}</TableCell>
//         <TableCell align="center">{schedule.days}</TableCell>
//         <TableCell align="center">{schedule.classroom}</TableCell>
//         <TableCell align="center">{schedule.timeStart}</TableCell>
//         <TableCell align="center">{schedule.timeEnd}</TableCell>
//         <TableCell align="center">
//           <IconButton onClick={() => openDeleteModal(schedule.id)}>
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
//       userName={scheduleToDelete.id}
//       onConfirm={deleteSchedule}
//       onClose={()=>setModalOpen(false)}
      
//       />

//       {schedules.length === 0 ? (
//         <p>Carregando reservas</p>
//       ) : (
//         <div>
//           <h5>Lista de usuários</h5>
//           <TableContainer component={Paper} style={{ margin: "2px" }}>
//             <Table size="small">
//               <TableHead
//                 style={{ backgroundColor: "green", borderStyle: "solid" }}
//               >
                
//               </TableHead>
//               <TableBody>{listSchedules}</TableBody>
//             </Table>
//           </TableContainer>
         
          
         
          
//         </div>
//       )}
//     </div>
//   );
// }
// export default ModalMinhasReservas;
