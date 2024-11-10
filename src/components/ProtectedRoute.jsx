import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ adminComponent: AdminComponent, userComponent: UserComponent, requiredRoles }) {
  const { user, adminCount } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la información de la ubicación actual
  const currentPath = location.pathname; // Acceder a la ruta actual

  useEffect(() => {
    if (user === null && adminCount > 0) {
      return navigate("/admin/login");
    }

    if (user === null && adminCount <= 0) {
      return navigate("/admin/register");
    }


    if (user === null && adminCount <= 0) {
      return navigate("/admin/register");
    }

    if (user === null && currentPath !== "/admin/register") {
      return navigate("/admin/login");
    }

    // Si hay un usuario y está en una página de login o registro
    if (user && (currentPath === "/admin/login" || currentPath === "/admin/register")) {
      return navigate("/admin");
    }

    // Si el usuario está autenticado y está en la página principal de admin, redirigir a productos
    if (user && (currentPath === "/admin")) {
      return navigate("/admin/products");
    }
  }, [user, navigate, adminCount, currentPath]);

  // Verificar si el rol del usuario está dentro del arreglo de roles permitidos
  const isAuthorized = user && requiredRoles.includes(user.role);

  return (
    <>
      {user === null ? (
        <UserComponent />
      ) : isAuthorized ? (
        <AdminComponent />
      ) : (
        <UserComponent />
      )}
    </>
  );
}
