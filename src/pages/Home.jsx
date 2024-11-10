// Realizado por Ricardo Terán

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import Category from '../components/Category';
import Carousel from '../components/Carousel';
import { useCategories } from '../context/CategoriesContext';

export default function Home() {
  const { categories } = useCategories();

  return (
    <div className="font-rabbits">
      {/* Sección Hero: Presentación inicial con un carrusel de imágenes */}
      <motion.div
        initial={{ x: -300 }} // El componente empieza 100px a la izquierda
        animate={{ x: 0 }}    // El componente se mueve a su posición original
        transition={{ duration: 1 }} // La animación dura 1 segundo
        className="font-rabbits"
      >
        <section className="pb-6 bg-white text-black flex flex-col justify-center items-center text-center">
          <Carousel />

          <div className="pb-8 pt-8 px-4 md:px-0">
            {/* Ajuste del tamaño del texto para ser responsive */}
            <h2 className="mt-6 text-3xl md:text-4xl font-bold mb-4">Bienvenido a La Tiendita UVM</h2>
            <p className="text-lg md:text-xl mb-8">Tu tienda de productos personalizados en la Universidad Valle del Momboy</p>

            {/* Botón para navegar a la página de productos */}
            <button className="font-poppins bg-redAccent text-white text-center text-lg md:text-2xl py-2 px-4 rounded-lg hover:bg-black transition duration-300">
              <NavLink to="/products">Ver productos</NavLink>
            </button>
          </div>
        </section>
      </motion.div>

      <div className='parallax1 py-80'></div>

      {/* Sección de Categorías: Muestra las categorías de productos disponibles */}
      <motion.section
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        id="categorias"
        className="py-8 md:py-12 bg-greenDark text-black"
      >
        <h3 className="text-white text-2xl md:text-3xl text-center mb-8 font-poppins font-bold">Categorías Principales</h3>

        <div className="flex flex-wrap justify-center">
          {categories.map((category) => (
            <div key={category._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <Category id={category._id} text={category.name} /> {/* Pasar el ID y nombre de la categoría */}
            </div>
          ))}
        </div>
      </motion.section>

      <div className='parallax2 py-80'></div>

      {/* Sección de Misión y Visión: Información sobre la misión y visión de la tienda */}
      <motion.section
        initial={{ x: -300 }} // El componente empieza 100px a la izquierda
        animate={{ x: 0 }}    // El componente se mueve a su posición original
        transition={{ duration: 1 }} // La animación dura 1 segundo
        id="mision"
        className="py-8 md:py-12 bg-grayLight flex flex-col md:flex-row justify-center items-start">
        <div className="w-full md:w-1/3 px-4 md:px-16 text-center">
          <h3 className="text-2xl md:text-3xl text-black mb-6 font-poppins font-bold">Nuestra Misión</h3>
          <p className="text-base md:text-lg mb-6">
            Satisfacer las necesidades de nuestros clientes, brindando soluciones creativas que resalten la identidad de cada marca.
          </p>
        </div>

        <div className="w-full md:w-1/3 px-4 md:px-16 text-center mt-8 md:mt-0">
          <h3 className="text-2xl md:text-3xl text-black mb-6 font-poppins font-bold">Nuestra Visión</h3>
          <p className="text-base md:text-lg">
            Ser la referencia indiscutible en el mercado de elaboración y producción de material POP, reconocido por nuestra excelencia.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
