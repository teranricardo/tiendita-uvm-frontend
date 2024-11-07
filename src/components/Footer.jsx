// Realizado por Ricardo Terán

import React from 'react';
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-greenLight text-dark text-center text-lg font-poppins">
      <div className='py-2'>
        {/* Información de contacto, ajustado para pantallas pequeñas y grandes */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          Correo:
          <a href="mailto:tiendauvm@uvm.edu.ve" className="hover:text-redAccent ml-1"> tiendauvm@uvm.edu.ve</a> |
          Tel: <span className="ml-1">+58 412 198 8407</span>
        </p>

        {/* Enlace a Instagram */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg flex justify-center items-center">
          Síguenos en Instagram:
          <a href="https://www.instagram.com/latienditauvm" className="hover:text-redAccent flex items-center ml-2">
            <FaInstagram className="inline-block w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-1" /> 
            <span className="ml-1">@latienditauvm</span>
          </a>
        </p>
      </div>

      {/* Derechos de autor, con tamaños de texto variables según la pantalla */}
      <p className='bg-greenDark text-white py-1 text-xs sm:text-sm'>
        © TODOS LOS DERECHOS RESERVADOS – UNIVERSIDAD VALLE DEL MOMBOY | 1997 – 2024
      </p>
    </footer>
  );
}
