import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';
const UsersContext = createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, [token, user]);

  const fetchUsers = async () => {
    try {
      if (user && user.role === 'admin') {
        const response = await fetch('http://localhost:3000/api/users/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
        setAlert({ message: data.message, type: 'success' });
      } else {
        setAlert({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error al registrar usuario', type: 'error' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
        setAlert({ message: data.message, type: 'success' });
      } else {
        setAlert({ message: data.error, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error al eliminar usuario', type: 'error' });
    }
  };

  const editUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        fetchUsers();
        setAlert({ message: data.message, type: 'success' });
      } else {
        setAlert({ message: data.error, type: 'error' });
      }
    } catch (error) {
      setAlert({ message: 'Error al actualizar usuario', type: 'error' });
    }
  };

  return (
    <UsersContext.Provider value={{ users, loading, addUser, deleteUser, editUser }}>
      {children}

      {/* Componente de alerta */}
      <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
    </UsersContext.Provider>
  );
};