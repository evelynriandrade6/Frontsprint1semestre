import { useState } from 'react';
import Calendar from 'react-calendar'; 
import { Box, Typography, Container } from '@mui/material';
import logo from "../images/SENAI.png";

function ReservaSala() {
  const [date, setDate] = useState(new Date());

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} style={{ width: "20%" }} alt="logo" /> 
        <Typography component="h1" variant="h5">
          Faça sua Reserva!
        </Typography>
        
           <div className="calendar-container" style={{ width: '400px', maxWidth: '100%', backgroundColor: '#fff', color: '#222', borderRadius: '8px', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', fontFamily: 'Arial, Helvetica, sans-serif',  marginTop: '30px' }}>
          <Calendar onChange={setDate} value={date} />
        </div>
        
        <p className='text-center'>
          <span className='bold'>Data selecionada:</span> {date.toDateString()}
        </p>
      </Box>
    </Container>
  );
}

export default ReservaSala;
