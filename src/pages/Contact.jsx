// Realizado por Leandro Valera

import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <main className="font-rabbits py-12 bg-grayLight px-4">
      <motion.div
        initial={{ x: -300 }} // El componente empieza 100px a la izquierda
        animate={{ x: 0 }}    // El componente se mueve a su posición original
        transition={{ duration: 1 }} // La animación dura 1 segundo>
      >

        <h2 className="text-3xl md:text-4xl text-center font-poppins font-bold mb-8">Contacto</h2>
        <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl mb-4">Déjanos un Mensaje</h3>
          <form>
            {/* Campo para el nombre del usuario */}
            <div className="mb-4">
              <label className="block text-base md:text-lg mb-2" htmlFor="name">Nombre</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-greenLight"
                type="text"
                id="name"
                required
              />
            </div>
            {/* Campo para el correo electrónico */}
            <div className="mb-4">
              <label className="block text-base md:text-lg mb-2" htmlFor="email">Correo Electrónico</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-greenLight"
                type="email"
                id="email"
                required
              />
            </div>
            {/* Campo para el mensaje */}
            <div className="mb-4">
              <label className="block text-base md:text-lg mb-2" htmlFor="message">Mensaje</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-greenLight"
                id="message"
                rows="4"
                required
              ></textarea>
            </div>
            {/* Botón para enviar el mensaje */}
            <button
              className="bg-redAccent text-white py-2 px-4 rounded-lg w-full md:w-auto hover:bg-black transition duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}