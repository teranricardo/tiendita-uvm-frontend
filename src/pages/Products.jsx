// Realizado por Leandro Valera

import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { motion } from "framer-motion";
import ProductCard from '../components/ProductCard';
import products from '../products';

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('categoria');

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const isSelectedCategory = selectedCategory ? true : false;

  return (
    <main className="py-12 bg-grayLight font-rabbits">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl sm:text-3xl text-center font-poppins font-bold mb-8 px-2">Nuestros Productos</h2>
        {filteredProducts.map((category, idx) => (
          <section key={idx} className="mb-12 px-6">
            <h3 className="text-3xl text-greenDark font-bold mb-4 text-center">{category.category}</h3>
            <p className="text-lg text-center text-gray-700 mb-4">{category.description}</p>
            <div className="flex flex-wrap justify-center gap-8">
              {category.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}

        {isSelectedCategory &&
          (
            <div className='flex justify-center'>
              <button className="font-poppins bg-redAccent text-white text-center text-lg md:text-2xl py-2 px-4 rounded-lg hover:bg-black transition duration-300">
                <NavLink to="/productos">Ver todos los productos</NavLink>
              </button>
            </div>

          )
        }
      </motion.div>
    </main>
  );
}
