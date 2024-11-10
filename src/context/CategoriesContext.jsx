import React, { createContext, useState, useContext, useEffect } from 'react';

const CategoriesContext = createContext();

export const useCategories = () => {
  return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories/all');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category, setAlert) => {
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      const data = await response.json();

      if (response.ok) {
        fetchCategories();
        setAlert({ message: data.message || 'Categoría agregada exitosamente', type: 'success' });
      } else {
        setAlert({ message: data.error || 'Hubo un error al agregar la categoría', type: 'error' });
      }
    } catch (error) {
      console.error('Error al agregar categoría:', error);
      setAlert({ message: 'Error al agregar la categoría', type: 'error' });
    }
  };

  const deleteCategory = async (id, setAlert) => {
    try {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (response.ok) {
        fetchCategories();
        setAlert({ message: data.message || 'Categoría eliminada exitosamente', type: 'success' });
      } else {
        setAlert({ message: data.error || 'Error al eliminar categoría', type: 'error' });
      }
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      setAlert({ message: 'Error al eliminar categoría', type: 'error' });
    }
  };

  const editCategory = async (id, category, setAlert) => {
    try {
      const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });
      const data = await response.json();

      if (response.ok) {
        fetchCategories();
        setAlert({ message: data.message || 'Categoría actualizada exitosamente', type: 'success' });
      } else {
        setAlert({ message: data.error || 'Error al actualizar categoría', type: 'error' });
      }
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      setAlert({ message: 'Error al actualizar categoría', type: 'error' });
    }
  };

  return (
    <CategoriesContext.Provider value={{ categories, loading, addCategory, deleteCategory, editCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};