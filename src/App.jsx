import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/pageLogin";
import Cadastro from "./pages/pageCadastro";
import Listagem from "./pages/ListaPage";
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
            path="/Lista"
            element={
              <ProtectedRoute>
                <Listagem />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
