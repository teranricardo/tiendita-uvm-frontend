// Realizado por Leandro Valera

import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state; // Obtiene los datos del producto de la navegación

  return (
    <div

      className="font-rabbits">
      <main className="py-16 bg-grayLight p-4">
        <motion.div
          initial={{ x: -300 }} // El componente empieza 300px a la izquierda
          animate={{ x: 0 }}    // El componente se mueve a su posición original
          transition={{ duration: 1 }} // La animación dura 1 segundo
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            {/* Imagen del producto */}
            <img src={`http://localhost:3000/api/uploads/${product.image}`} alt={product.name} className="w-full md:w-1/2 h-96 object-cover rounded-lg transform transition duration-300 ease-in-out hover:scale-110" />

            <div className="w-full md:w-1/2 text-left mt-6 md:mt-0">
              <h2 className="text-4xl font-bold text-black mb-4">{product.name}</h2>
              <p className="text-3xl text-greenDark font-bold mb-4">$ {product.price}</p>
              <p className="text-lg mb-4">{product.description}</p>

              {/* Botón para regresar a la lista de productos */}
              <NavLink
                to="/products"
                className="flex items-center hover:text-redAccent"
              >
                <button className="bg-redAccent text-white text-lg py-2 px-4 rounded-lg hover:bg-black transition duration-300">
                  Volver
                </button>
              </NavLink>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};