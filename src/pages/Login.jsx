import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { motion } from 'framer-motion';
import Alert from '../components/Alert';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token } = await response.json();
        login(token);
        setAlert({ message: '¡Bienvenido de nuevo!', type: 'success' }); // Alerta de éxito
        setTimeout(() => navigate('/admin'), 2000); // Redirige después de 2 segundos
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
        setAlert({ message: errorData.message || 'Error al iniciar sesión', type: 'error' }); // Alerta de error
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setAlert({ message: 'Hubo un error al conectarse al servidor', type: 'error' }); // Alerta de error
    }
  };

  return (
    <div className="bg-gray-100">
      <motion.div
        initial={{ x: -300 }} // El componente empieza 100px a la izquierda
        animate={{ x: 0 }}    // El componente se mueve a su posición original
        transition={{ duration: 1 }} // La animación dura 1 segundo
      >
        <div className="flex justify-center items-center pt-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 m-2">
            <h2 className="text-2xl font-bold text-center text-greenDark mb-6">Iniciar Sesión</h2>
            
            {/* Mostrar alerta si existe */}
            {alert.message && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
              <button
                type="submit"
                className="w-full bg-greenDark text-white py-2 px-4 rounded-lg hover:bg-redAccent transition duration-300 font-milgun font-bold"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}