import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { motion } from 'framer-motion';

export default function Register() {
  const { setAdminCountToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para verificar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAdminCountToken(1);
        navigate('/admin/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error en el registro, intenta nuevamente');
    }
  };

  return (

    <div className='bg-gray-100'>
      <motion.div
        initial={{ x: -300 }} // El componente empieza 100px a la izquierda
        animate={{ x: 0 }}    // El componente se mueve a su posición original
        transition={{ duration: 1 }} // La animación dura 1 segundo
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 m-2">
            <h2 className="text-2xl font-bold text-center text-greenDark mb-6">Registro de Administrador</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <FormInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="Escribe tu nombre"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                label="Usuario"
                name="username"
                type="text"
                placeholder="Escribe tu usuario"
                value={formData.username}
                onChange={handleChange}
              />
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="Escribe tu contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <FormInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-greenLight text-white py-2 px-4 rounded-lg hover:bg-greenDark transition duration-300 font-bold mt-4"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
