import * as React from "react";
import { Container, Typography } from "@mui/material";

const MeuPerfil = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Meu Perfil
      </Typography>
      <Typography>
        Aqui você pode ver e editar suas informações de perfil.
      </Typography>
    </Container>
  );
};

export default MeuPerfil;
