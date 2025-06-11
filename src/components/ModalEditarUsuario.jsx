import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import api from "../axios/axios";

export default function ModalEditarUsuario({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const [modalOpen, setModalOpen] = useState(false); // Modal de confirmação

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "",
        password: user.password || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    showAlert("success", "Usuário atualizado com sucesso!");
    setTimeout(() => {
      onClose(); // Fecha o modal após 2 segundos
    }, 2000);
  };

  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const deleteUser = async () => {
    try {
      await api.deleteUser(formData.cpf);
      showAlert("success", "Usuário deletado com sucesso!");
      setModalOpen(false);
      setTimeout(() => {
        onClose(); // Fecha o modal
        localStorage.clear();
        window.location.href = "/"; // Redireciona para o login ou home
      }, 2000);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      showAlert("error", "Erro ao deletar conta.");
      setModalOpen(false);
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "0.2rem"
  };

  const buttonSave = {
    backgroundColor: "#8B0000",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const buttonCancel = {
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer"
  };

  const buttonDelete = {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem"
  };

  return (
    <>
      {/* ALERTA */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 2000 }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {/* MODAL PRINCIPAL */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            width: "400px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <h2 style={{ textAlign: "center", color: "#8B0000" }}>Editar Perfil</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              style={inputStyle}
              required
            />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              style={inputStyle}
              required
            />
            {errors.email && <p style={errorStyle}>{errors.email}</p>}

            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              placeholder="CPF"
              style={inputStyle}
              disabled
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <button type="button" onClick={onClose} style={buttonCancel}>
                Cancelar
              </button>
              <button type="submit" style={buttonSave}>
                Salvar
              </button>
            </div>
          </form>

          {/* Botão de Deletar Conta */}
          <button style={buttonDelete} onClick={() => setModalOpen(true)}>
            Deletar Conta
          </button>
        </div>
      </div>

      {/* Modal de confirmação de deleção */}
      <ModalConfirmDelete
        open={modalOpen}
        userName={formData.name}
        onConfirm={deleteUser}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
