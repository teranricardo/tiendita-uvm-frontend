// Realizado por Ricardo Terán
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiLogoutBoxLine } from "react-icons/ri";
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Obtener usuario y función de logout desde el contexto

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 shadow-lg z-30 bg-greenLight font-rabbits text-white py-4 px-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center hover:text-redAccent">
          <img src="/images/logo.png" alt="Logo La Tiendita UVM" className="w-16 h-14 mr-2" />
          <h1 className="text-2xl font-bold">La Tiendita UVM</h1>
        </NavLink>
      </div>

      {/* Menú de navegación para pantallas grandes */}
      <nav className="hidden md:flex space-x-6 font-poppins font-bold text-lg">
        <NavLink to="/" className="hover:text-redAccent">Inicio</NavLink>
        <NavLink to="/products" className="hover:text-redAccent">Productos</NavLink>

        {/* Opciones de administración y cerrar sesión si el usuario está autenticado */}
        {user && (
          <>
            <NavLink to="/admin" className="hover:text-redAccent">Admin</NavLink>
            <button onClick={handleLogout} className="text-white  text-2xl hover:text-redAccent "><RiLogoutBoxLine /></button>
          </>
        )}
      </nav>

      {/* Ícono del menú hamburguesa para pantallas pequeñas */}
      <button onClick={toggleMenu} className="md:hidden text-white text-2xl focus:outline-none z-50">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú desplegable a pantalla completa para pantallas pequeñas */}
      <nav
        className={`fixed top-0 left-0 w-full h-full bg-greenLight transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-500 ease-in-out z-40 md:hidden`}
      >
        <ul className="flex flex-col justify-center items-center h-full font-poppins text-3xl text-white w-full">
          <li className="w-full">
            <NavLink
              to="/"
              className="block w-full text-center font-bold py-4 hover:bg-greenDark transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/products"
              className="block w-full text-center font-bold py-4 hover:bg-greenDark transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Productos
            </NavLink>
          </li>
          {/* Opciones de administración y cerrar sesión para pantallas pequeñas */}
          {user && (
            <>
              <li className="w-full">
                <NavLink
                  to="/admin"
                  className="block w-full text-center font-bold py-4 hover:bg-greenDark transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </NavLink>
              </li>
              <li className="w-full">
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-center flex items-center justify-center font-bold py-4 hover:bg-greenDark transition-colors duration-300"
                >
                  <p className='ml-2'>Cerrar sesión</p> <RiLogoutBoxLine className='ml-2' />
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
