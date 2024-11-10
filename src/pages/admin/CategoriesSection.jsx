import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useCategories } from '../../context/CategoriesContext';
import AdminNav from '../../components/AdminNav';
import CustomTable from '../../components/CustomTable';
import FormInput from '../../components/FormInput';
import ConfirmDialog from '../../components/ConfirmDialog';
import Alert from '../../components/Alert';

export default function CategoriesSection() {
  const { categories, loading, addCategory, deleteCategory, editCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCategory) {
      editCategory(currentCategory._id, newCategory, setAlert);
    } else {
      addCategory(newCategory, setAlert);
    }
    setNewCategory({ name: '', description: '' });
    toggleModal();
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    toggleModal();
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete, setAlert);
      setCategoryToDelete(null);
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Descripción', accessor: 'description' }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <FaEdit className='h-4 w-4' />,
      color: 'blue',
      onClick: handleEditCategory
    },
    {
      label: 'Eliminar',
      icon: <FaTrash className='h-4 w-4' />,
      color: 'red',
      onClick: (category) => handleDeleteCategory(category._id)
    }
  ];

  return (
    <>
      {/* Mostrar alerta */}
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
      )}

      <AdminNav />

      <div className="font-poppins p-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Categorías</h2>
        <button
          className="bg-greenDark text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-greenLight transition duration-300"
          onClick={() => { setCurrentCategory(null); toggleModal(); }}
        >
          <FaPlus className="mr-2" /> Agregar Nueva Categoría
        </button>

        <CustomTable columns={columns} data={categories} actions={actions} loading={loading} />

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-2">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-xl text-greenDark font-bold mb-4">{currentCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</h2>
              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Nombre"
                  name="name"
                  type="text"
                  placeholder="Escribe el nombre de la categoría"
                  value={newCategory.name}
                  onChange={handleInputChange}
                />
                <FormInput
                  label="Descripción"
                  name="description"
                  type="text"
                  placeholder="Escribe la descripción de la categoría"
                  value={newCategory.description}
                  onChange={handleInputChange}
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="px-4 py-2 bg-redAccent text-white rounded hover:bg-black transition duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-greenDark text-white rounded hover:bg-greenLight transition duration-300"
                  >
                    {currentCategory ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDelete}
          message="¿Estás seguro de que deseas eliminar esta categoría?"
        />
      </div>
    </>
  );
}