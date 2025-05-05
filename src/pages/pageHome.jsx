import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import logo from "../images/SENAI.png";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const HomePage = () => {
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
        <img src={logo} alt="Logo SENAI" style={{ width: "20%" }} />
        <Typography component="h1" variant="h5">
          Bem-vindo
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: 4,
          }}
        >
          <TodayIcon sx={{ fontSize: 50, color: "black", marginRight: 2 }} />
          <Link
            to="/Reserva"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography component="h2">Reserve sua sala aqui</Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            marginTop: 4,
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: 50, color: "black", marginRight: 2 }} />
          <Link
            to="/CadastroSala"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography component="h2">Cadastre uma sala aqui</Typography>
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          marginTop: 4, 
        }}
      >
        <ContentPasteIcon
          sx={{ fontSize: 50, color: "black", marginRight: 2 }}
        />
        <Link
          to="/MinhasReservas"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography component="h2">Suas Reservas</Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
