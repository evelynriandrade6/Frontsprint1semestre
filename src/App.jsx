import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/pageLogin";
import Cadastro from "./pages/pageCadastro";
import CadastroSala from "./pages/CadastroSala";
import ListClassrooms from "./pages/ListClassrooms";
import Home from "./pages/pageHome";
import ProtectedRoute from "./components/ProtectedRoutes";
import ModalDisponibilidade from "./components/ModalDisponibilidade";
import MeuPerfil from "./pages/MeuPerfil";
import ModalEditarUsuario from "./components/ModalEditarUsuario";
// import ModalMinhasReservas from "./components/ModalMinhasReservas"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CadastroSala"
            element={
              <ProtectedRoute>
                <CadastroSala />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ModalDisponibilidade"
            element={
              <ProtectedRoute>
                <ModalDisponibilidade />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/ModalMinhasReservas"
            element={
              <ProtectedRoute>
                <ModalMinhasReservas />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/ListClassrooms"
            element={
              <ProtectedRoute>
                <ListClassrooms />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ModalEditarUsuario"
            element={
              <ProtectedRoute>
                <ModalEditarUsuario />
              </ProtectedRoute>
            }
          />

          <Route
            path="/MeuPerfil"
            element={
              <ProtectedRoute>
                <MeuPerfil />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
