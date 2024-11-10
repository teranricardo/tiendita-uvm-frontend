// Realizado por Leandro Valera
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import { useCategories } from '../context/CategoriesContext';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryId = queryParams.get('category'); // Obtener el ID de categoría desde la URL

  const { products, loading: loadingProducts, error: errorProducts } = useProducts();
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();

  if (loadingProducts || loadingCategories) return <div>Loading...</div>;
  if (errorProducts) return <div>Error al cargar productos: {errorProducts}</div>;
  if (errorCategories) return <div>Error al cargar categorías: {errorCategories}</div>;

  // Filtrar los productos por ID de categoría
  const filteredProducts = selectedCategoryId
    ? products.filter(product => product.category_id._id === selectedCategoryId)
    : products;

  // Filtrar las categorías para que solo se muestre la categoría seleccionada
  const selectedCategory = categories.find(category => category._id === selectedCategoryId);

  return (
    <main className="py-12 bg-grayLight font-rabbits">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl sm:text-3xl text-center font-poppins font-bold mb-8 px-2">Nuestros Productos</h2>

        {/* Si no se ha filtrado por ninguna categoría, mostrar todas las categorías */}
        {!selectedCategoryId ? (
          categories.map(category => (
            <section key={category._id} className="mb-12 px-6">
              <h3 className="text-3xl text-greenDark font-bold mb-4 text-center">{category.name}</h3>
              <p className="text-lg text-center text-gray-700 mb-4">{category.description}</p>
              <div className="flex flex-wrap justify-center gap-8">
                {products
                  .filter(product => product.category_id._id === category._id) // Filtrar productos por categoría
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </section>
          ))
        ) : (
          // Si se ha filtrado por categoría, mostrar solo esa categoría y sus productos
          <section className="mb-12 px-6">
            <h3 className="text-3xl text-greenDark font-bold mb-4 text-center">{selectedCategory.name}</h3>
            <p className="text-lg text-center text-gray-700 mb-4">{selectedCategory.description}</p>
            <div className="flex flex-wrap justify-center gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {selectedCategoryId && (
          <div className='flex justify-center'>
            <button className="font-poppins bg-redAccent text-white text-center text-lg md:text-2xl py-2 px-4 rounded-lg hover:bg-black transition duration-300">
              <NavLink to="/products">Ver todos los productos</NavLink>
            </button>
          </div>
        )}
      </motion.div>
    </main>
  );
}