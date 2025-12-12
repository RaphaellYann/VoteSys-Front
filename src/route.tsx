import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "./redux/store";

// --- CAMINHOS PADRONIZADOS (Tudo minúsculo) ---
// Se o erro persistir aqui, apague a pasta 'layoutadmin' e crie de novo do zero.

import LayoutAdmin from "./componentes/layoutadmin";
import LayoutLogin from "./componentes/layoutlogin";

import Login from "./pages/login";
import Home from "./pages/home";
import UsuariosAdmin from "./pages/usuarioadmin";
import Cadastrese from "./pages/cadastrese";
import Campanha from "./pages/campanha";
import VotacaoPage from "./pages/votacao";
import Resultados from "./pages/resultados";
import RecuperarSenha from "./pages/recuperarsenha";
import ResetarSenha from "./pages/resetarsenha";
import PerfilUsuario from "./pages/perfilusuario";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAutenticado } = useSelector((state: RootState) => state.auth);
  return isAutenticado ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuario } = useSelector((state: RootState) => state.auth);
  if (usuario?.role === "ROLE_ADMIN_GERAL") {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrese" element={<Cadastrese />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/resetarsenha" element={<ResetarSenha />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <LayoutAdmin />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/campanha" element={<Campanha />} />
        <Route path="/votacao" element={<VotacaoPage />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/perfil" element={<PerfilUsuario />} />

        <Route
          path="/usuarioAdmin"
          element={
            <AdminRoute>
              <UsuariosAdmin />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
