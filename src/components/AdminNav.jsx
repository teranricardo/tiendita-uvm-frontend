import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function AdminNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      {/* Header con el título del panel y menú hamburguesa */}
      <header className="top-0 shadow-lg z-30 bg-greenDark text-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Panel de Administración</h1>

        {/* Menú de navegación para pantallas grandes */}
        <nav className="hidden md:flex space-x-6 font-bold text-lg">
          <NavLink to="/admin/products" className="hover:text-redAccent">Productos</NavLink>
          <NavLink to="/admin/categories" className="hover:text-redAccent">Categorías</NavLink>
          <NavLink to="/admin/users" className="hover:text-redAccent">Usuarios</NavLink>
        </nav>

        {/* Botón del menú hamburguesa para pantallas pequeñas */}
        <button onClick={toggleMenu} className="md:hidden text-white text-2xl focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú desplegable a pantalla completa para pantallas pequeñas */}
        <nav
          className={`fixed top-0 left-0 w-full h-full bg-greenDark transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-500 ease-in-out z-30 md:hidden`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
          >
            <FaTimes />
          </button>
          <ul className="flex flex-col justify-center items-center h-full font-poppins text-3xl text-white w-full space-y-8">
            <li className="w-full text-center">
              <NavLink
                to="/admin/products"
                className="block w-full font-bold py-4 hover:bg-greenLight transition-colors duration-300"
                onClick={toggleMenu}
              >
                Productos
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink
                to="/admin/categories"
                className="block w-full font-bold py-4 hover:bg-greenLight transition-colors duration-300"
                onClick={toggleMenu}
              >
                Categorías
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink
                to="/admin/users"
                className="block w-full font-bold py-4 hover:bg-greenLight transition-colors duration-300"
                onClick={toggleMenu}
              >
                Usuarios
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}