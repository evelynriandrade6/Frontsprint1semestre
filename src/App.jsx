import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/pageLogin";
import Cadastro from "./pages/pageCadastro";
import CadastroSala from "./pages/CadastroSala";
import ReservaSala from "./pages/ReservaSala";
import Home from "./pages/pageHome";
import ProtectedRoute from "./components/ProtectedRoutes";

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
            path="/ReservaSala"
            element={
              <ProtectedRoute>
                <ReservaSala />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
