import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import api from "../axios/axios";

export default function MeuPerfil() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put("/user/profile", formData);
      setUser({ ...response.data, cpf: user.cpf }); // Mantém CPF
      setEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    }
  };

  if (!user) return <Typography>Carregando perfil...</Typography>;

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Meu Perfil
        </Typography>

        <Stack spacing={2}>
          {editing ? (
            <>
              <TextField
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Função"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography><strong>Nome:</strong> {user.name}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>Função:</strong> {user.role}</Typography>
            </>
          )}

          <Typography>
            <strong>CPF:</strong> {user.cpf}
          </Typography>

          {editing ? (
            <Button variant="contained" onClick={handleSave}>
              Salvar
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => setEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
