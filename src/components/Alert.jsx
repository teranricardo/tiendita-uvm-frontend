import React, { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Cierra la alerta después de 5 segundos
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message && (
      <div
        className={`fixed top-4 right-4 z-50 p-4 max-w-sm w-full rounded-lg shadow-lg 
        ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} 
        text-white flex items-center justify-between transition-all transform hover:scale-105`}
      >
        {/* Icono de la alerta */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6">
            {/* Ícono de éxito */}
            {type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {/* Ícono de error */}
            {type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {/* Ícono de info */}
            {type === 'info' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4v4m-4 0h8m-4 0H8m8-4H8M4 12h16" />
              </svg>
            )}
          </div>

          {/* Mensaje de la alerta */}
          <span className="text-sm font-medium">{message}</span>
        </div>

        {/* Botón de cierre */}
        <button
          className="ml-3 text-xl hover:text-opacity-70"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;