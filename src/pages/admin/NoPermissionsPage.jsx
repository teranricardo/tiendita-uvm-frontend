import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';

export default function NoPermissionsPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <AdminNav />
      <div className="flex items-center justify-center py-28">
        <div className="text-center p-8 m-2 bg-white rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
          <p className="text-gray-700 mb-6">No tienes permisos para acceder a esta página.</p>
          <button
            onClick={handleRedirect}
            className="bg-greenDark text-white px-6 py-2 rounded hover:bg-greenLight transition duration-300"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </>
  );

}