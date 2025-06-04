import React, { useEffect, useState } from "react";
import api from "../axios/axios";
import { MdAccountBox } from "react-icons/md";
import ModalEditarUsuario from "../components/ModalEditarUsuario";
import ModalMinhasReservas from "../components/ModalMinhasReservas";

export default function MeuPerfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalReservas, setModalReservas] = useState(false);

  useEffect(() => {
    const cpf = localStorage.getItem("user_cpf");
    if (!cpf) {
      setError("CPF do usuário não encontrado. Faça login.");
      setLoading(false);
      return;
    }

    api
      .getUserByCPF(cpf)
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao buscar dados do usuário.");
        setLoading(false);
        console.error(err);
      });
  }, [modalAberto]);
  const trocarModalReservas = () => {
    if(modalReservas === true){
      setModalReservas(false);
    } else {
      setModalReservas(true);
    }
  }

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const handleSalvarUsuario = async (dadosAtualizados) => {
    console.log("Dados salvos:", dadosAtualizados);
    // Chamar a api
    try {
      const response = await api.putUpdateUser(dadosAtualizados);
      alert(response.data.message);
      fecharModal();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  if (loading) return <p>Carregando perfil...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "3rem",
          borderRadius: "24px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#8B0000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <MdAccountBox size="90" color="#fff" />
        </div>

        <h2 style={{ marginBottom: "2rem", fontSize: "2rem", color: "#333" }}>
          Meu Perfil
        </h2>

        <div
          style={{
            width: "100%",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            fontSize: "1.1rem",
          }}
        >
          <p>
            <strong style={{ color: "#8B0000" }}>Nome:</strong> {user.name}
          </p>
          <p>
            <strong style={{ color: "#8B0000" }}>Email:</strong> {user.email}
          </p>
          <p>
            <strong style={{ color: "#8B0000" }}>CPF:</strong> {user.cpf}
          </p>
          <p>
            <strong style={{ color: "#8B0000" }}>Senha:</strong> {user.password}
          </p>
        </div>

        <button
          onClick={abrirModal}
          style={{
            marginTop: "3rem",
            padding: "14px 28px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#8B0000",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#a30000")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#8B0000")}
        >
          Editar Usuário
        </button>

        <button
          onClick={trocarModalReservas}
          style={{
            marginTop: "1rem",
            padding: "14px 28px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#004080",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0066cc")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#004080")}
        >
          Ver Minhas Reservas
        </button>
      </div>

      {/* Renderização do ModalEditarUsuario */}
      {modalAberto && (
        <ModalEditarUsuario
          user={user}
          onClose={fecharModal}
          onSave={handleSalvarUsuario}
        />
      )}

      {modalReservas && (
        <ModalMinhasReservas/>
      )}
    </div>
  );
}
