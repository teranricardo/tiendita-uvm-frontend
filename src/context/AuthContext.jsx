import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [adminCount, setAdminCountToken] = useState(null);
  const navigate = useNavigate();

  // Función para verificar el conteo de administradores
  const checkAdminCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/count-admin-principals');
      const data = await response.json();
      setAdminCountToken(data.count);
    } catch (error) {
      console.error('Error al verificar la cantidad de admins:', error);
    }
  };

  // Ejecutar la verificación al cargar el contexto
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      checkAdminCount();
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    const decoded = jwtDecode(newToken);
    setUser(decoded);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, adminCount, setAdminCountToken }}>
      {children}
    </AuthContext.Provider>
  );
}
