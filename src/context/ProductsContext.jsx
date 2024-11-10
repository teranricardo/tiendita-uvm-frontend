import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/products/all');
      if (!response.ok) throw new Error('No se pudieron cargar los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar el producto');

      fetchProducts();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, loading, error, deleteProduct, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};