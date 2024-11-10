import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { GrView } from "react-icons/gr";
import { useProducts } from '../../context/ProductsContext';
import { useCategories } from '../../context/CategoriesContext';
import AdminNav from '../../components/AdminNav';
import CustomTable from '../../components/CustomTable';
import FormInput from '../../components/FormInput';
import ConfirmDialog from '../../components/ConfirmDialog';
import Alert from '../../components/Alert';
import { motion } from 'framer-motion';

export default function ProductsSection() {
  const { products, loading, deleteProduct, fetchProducts } = useProducts();
  const { categories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category_id: '', image: null });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Maneja la carga de imagen
  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un nuevo FormData
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('category_id', newProduct.category_id);

    // Si se cargó una imagen, se añade también
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      let response;
      // Si estamos editando un producto, se hace una actualización
      if (currentProduct) {
        // Realiza el fetch para editar el producto
        response = await fetch(`http://localhost:3000/api/products/${currentProduct._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Realiza el fetch para agregar un nuevo producto
        response = await fetch('http://localhost:3000/api/products', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();  // Obtener el JSON de la respuesta
        if (data.message) {
          setAlert({ message: data.message, type: 'success' }); // Mostrar el mensaje de éxito
        }

        // Actualiza la lista de productos usando la función fetchProducts del contexto
        fetchProducts();
        setNewProduct({ name: '', description: '', price: '', category_id: '', image: null });
        toggleModal();
      } else {
        const errorData = await response.json();  // Obtener el JSON de la respuesta de error
        if (errorData.error) {
          setAlert({ message: errorData.error, type: 'error' }); // Mostrar el mensaje de error
        } else {
          setAlert({ message: 'Hubo un error con la solicitud', type: 'error' });
        }
      }
    } catch (error) {
      setAlert({ message: 'Error en la solicitud', type: 'error' });
    }
  };


  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id._id,
      image: product.image || null
    });
    toggleModal();
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setAlert({ message: 'Producto eliminado exitosamente', type: 'success' });
      setProductToDelete(null);
    }
  };

  const handleViewDetails = (product) => {
    setProductDetails(product);
    setIsModalOpenView(true);
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Descripción', accessor: 'description' },
    { header: 'Precio', accessor: 'price' },
    { header: 'Categoría', accessor: 'category_id.name' }
  ];

  const actions = [
    {
      label: 'Ver Detalles',
      icon: <GrView className="h-4 w-4" />,
      color: 'black',
      onClick: handleViewDetails
    },
    {
      label: 'Editar',
      icon: <FaEdit className="h-4 w-4" />,
      color: 'blue',
      onClick: handleEditProduct
    },
    {
      label: 'Eliminar',
      icon: <FaTrash className="h-4 w-4" />,
      color: 'red',
      onClick: (product) => handleDeleteProduct(product._id)
    }
  ];

  return (
    <>
      <AdminNav />
      <div className="font-poppins p-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
        <button
          className="bg-greenDark text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-greenLight transition duration-300"
          onClick={() => { setCurrentProduct(null); toggleModal(); }}
        >
          <FaPlus className="mr-2" /> Agregar Nuevo Producto
        </button>

        <CustomTable columns={columns} data={products} actions={actions} loading={loading} />

        {/* Mostrar la alerta */}
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: '', type: '' })}
        />

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-40 p-2">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-xl text-greenDark font-bold mb-4">{currentProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <FormInput
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Escribe el nombre del producto"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Descripción"
                  name="description"
                  type="text"
                  placeholder="Escribe la descripción del producto"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Precio"
                  name="price"
                  type="number"
                  placeholder="Escribe el precio del producto"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    name="category_id"
                    value={newProduct.category_id}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Imagen del Producto</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-4 py-2 bg-redAccent text-white rounded hover:bg-black transition duration-300"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="bg-greenDark text-white px-4 py-2 rounded">
                    {currentProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isModalOpenView && productDetails && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg w-full max-w-lg md:max-w-2xl"
            >
              <h2 className="text-xl text-greenDark font-bold mb-4">Detalles del Producto</h2>

              <div className="flex flex-col md:flex-row items-center md:space-x-8">
                {/* Imagen del producto */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  {productDetails.image && (
                    <img
                      src={`http://localhost:3000/api/uploads/${productDetails.image}`}
                      alt="Producto"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Datos del producto */}
                <div className="w-full md:w-1/2 text-left">
                  <div className="mb-4">
                    <strong>Nombre:</strong> {productDetails.name}
                  </div>
                  <div className="mb-4">
                    <strong>Descripción:</strong> {productDetails.description}
                  </div>
                  <div className="mb-4">
                    <strong>Precio:</strong> {productDetails.price}
                  </div>
                  <div className="mb-4">
                    <strong>Categoría:</strong> {productDetails.category_id.name}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpenView(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto mt-4"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
          message="¿Estás seguro de que deseas eliminar este producto?"
        />
      </div>
    </>
  );
}