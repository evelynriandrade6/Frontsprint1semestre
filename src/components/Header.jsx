import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Voltar para a página anterior
  };

  const handlePerfil = () => {
    navigate("/MeuPerfil"); // Direciona para a página de perfil
  };

  return (
    <AppBar sx={{ backgroundColor: "#FF5656", position: "fixed", top: 0 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton color="inherit" onClick={handlePerfil}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
