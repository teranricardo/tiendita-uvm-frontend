// Realizado por Leandro Valera

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-grayLight">
      <h1 className="text-6xl font-bold text-redAccent">404</h1>
      <p className="mt-4 text-xl">¡Ups! La página que buscas no fue encontrada.</p>
      <button
        onClick={handleRedirect}
        className="mt-8 px-4 py-2 bg-greenDark text-white rounded hover:bg-black transition duration-200"
      >
        Regresar a la página principal
      </button>
    </div>
  );
}