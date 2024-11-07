// Realizado por Ricardo Terán

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Category({ text }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirigir a la página de productos con la categoría como parámetro
    navigate(`/productos?categoria=${text}`);
  };

  return (
    <div
      className="w-full p-4 bg-white rounded-lg text-center hover:bg-greenLight transition duration-300 cursor-pointer"
      onClick={handleClick}>
      <h4 className="text-xl font-bold">{text}</h4>
    </div>
  );
}
