// Realizado por Ricardo Terán

import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

// Arreglo de imágenes
const images = [
  'images/image1.png',
  'images/image2.png',
  'images/image3.png',
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambia la imagen cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Función para ir a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  // Función para ir a la imagen siguiente
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Función para seleccionar un slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[30rem] xl:h-[40rem] overflow-hidden">
      {/* Imágenes del carrusel */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover md:object-fill lg:object-contain flex-shrink-0"
          />
        ))}
      </div>

      {/* Indicadores */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-2 sm:bottom-5 left-1/2 space-x-2 sm:space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
          ></button>
        ))}
      </div>

      {/* Botón Anterior */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
      >
        <IoIosArrowDropleftCircle className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-grayLight hover:text-white" />
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
      >
        <IoIosArrowDroprightCircle className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-grayLight hover:text-white" />
      </button>
    </div>
  );
}
