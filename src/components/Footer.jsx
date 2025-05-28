import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove o token
    navigate("/");                // Redireciona para a tela de login
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FF5656",
        width: "100%",
        height: "50px",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          backgroundColor: "#fff",
          color: "#FF5656",
          '&:hover': {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Footer;
