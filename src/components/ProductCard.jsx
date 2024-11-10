// Realizado por Leandro Valera

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`, { state: product });
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Imagen del producto */}
      <img className="rounded-t-lg w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110" src={`http://localhost:3000/api/uploads/${product.image}`} alt={product.name} />

      <div className="p-5">
        {/* Título del producto */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{product.name}</h5>

        {/* Descripción del producto */}
        <p className="mb-2 font-normal text-gray-700">{product.description}</p>

        <p className="mb-3 text-2xl text-greenDark font-bold">$ {product.price}</p>

        {/* Botón para ver detalles */}
        <button
          onClick={handleViewDetails}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-redAccent rounded-lg hover:bg-black transition duration-300 focus:ring-4 focus:outline-none focus:ring-red-300"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}