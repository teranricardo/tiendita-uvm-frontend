import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useUsers } from '../../context/UsersContext';
import CustomTable from '../../components/CustomTable';
import FormInput from '../../components/FormInput';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function UsersSection() {
  const { users, loading, addUser, deleteUser, editUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      editUser(currentUser._id, newUser);
    } else {
      addUser(newUser);
    }
    setNewUser({ name: '', email: '', role: '' });
    toggleModal();
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role });
    toggleModal();
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };

  const columns = [
    { header: 'Nombre', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'role' }
  ];

  const actions = [
    {
      label: 'Editar',
      icon: <FaEdit className='h-4 w-4' />,
      color: 'blue',
      onClick: handleEditUser
    },
    {
      label: 'Eliminar',
      icon: <FaTrash className='h-4 w-4' />,
      color: 'red',
      onClick: (user) => handleDeleteUser(user._id)
    }
  ];

  return (
    <div className="font-poppins p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <button
        className="bg-greenDark text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-greenLight transition duration-300"
        onClick={() => { setCurrentUser(null); toggleModal(); }}
      >
        <FaPlus className="mr-2" /> Agregar Nuevo Usuario
      </button>

      <CustomTable columns={columns} data={users} actions={actions} loading={loading} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-xl text-greenDark font-bold mb-4">{currentUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="Nombre del usuario"
                value={newUser.name}
                onChange={handleInputChange}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={newUser.email}
                onChange={handleInputChange}
              />
              <FormInput
                label="Rol"
                name="role"
                type="text"
                placeholder="Rol del usuario"
                value={newUser.role}
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
                  {currentUser ? 'Actualizar' : 'Agregar'}
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
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </div>
  );
}