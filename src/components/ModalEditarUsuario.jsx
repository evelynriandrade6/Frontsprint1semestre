import React, { useState, useEffect } from "react";

export default function ModalEditarUsuario({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: ""
  });
  // Adicionei um estado para erros, caso queira implementar validação no futuro
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        cpf: user.cpf || "",
        password: user.password || ""
      });
    }
  }, [user]); // Este useEffect será executado sempre que a prop 'user' mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro para o campo atual quando o usuário digita
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // const validate = () => {
  //   let newErrors = {};
  //   if (!formData.name) newErrors.name = "Nome é obrigatório.";
  //   if (!formData.email) {
  //     newErrors.email = "Email é obrigatório.";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Email inválido.";
  //   }
  //   // Não precisa validar CPF se ele está desabilitado e vem do `user`
  //   if (!formData.password) newErrors.password = "Senha é obrigatória.";
  //   else if (formData.password.length < 4) newErrors.password = "A senha deve ter no mínimo 6 caracteres.";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

      onSave(formData);
    
  };

  // REMOVIDO: if (!user) return null;

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

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000 // Z-index alto para garantir que apareça acima de outros elementos
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
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            {/* Opção 1: CPF como campo desabilitado (como você tinha) */}
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange} // Opcional, já que está desabilitado
              placeholder="CPF"
              style={inputStyle}
              required
              disabled // CPF é desabilitado
            />
            {/* Opção 2 (alternativa): Exibir CPF como texto simples se não for editável */}
            {/*
            <label style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.2rem", display: "block" }}>CPF:</label>
            <p style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #eee",
              backgroundColor: "#f9f9f9",
              fontSize: "1rem",
              color: "#333"
            }}>
              {formData.cpf}
            </p>
            */}
          </div>
          <div>
            <input
              type="numeric"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Senha"
              style={inputStyle}
              required
            />
            {errors.password && <p style={errorStyle}>{errors.password}</p>}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button type="button" onClick={onClose} style={buttonCancel}>
              Cancelar
            </button>
            <button type="submit" style={buttonSave}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}