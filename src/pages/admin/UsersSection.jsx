import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { useUsers } from '../../context/UsersContext';
import { AuthContext } from '../../context/AuthContext';
import AdminNav from '../../components/AdminNav';
import CustomTable from '../../components/CustomTable';
import FormInput from '../../components/FormInput';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function UsersSection() {
  const { users, loading, addUser, deleteUser, editUser } = useUsers();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', name: '', role: '', password: '', confirmPassword: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setIsChangingPassword(false);
      setIsEdit(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (isChangingPassword && newUser.password !== newUser.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);

    if (currentUser) {
      // Si estamos editando, podemos omitir la contraseña si no se cambió
      const userData = isChangingPassword
        ? { ...newUser, password: newUser.password }
        : { ...newUser, password: undefined };

      editUser(currentUser._id, userData);
      setIsEdit(false);
    } else {
      addUser(newUser);
    }
    setNewUser({ username: '', name: '', role: '', password: '', confirmPassword: '' });
    toggleModal();
  };

  const handleEditUser = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setNewUser({ username: user.username, name: user.name, role: user.role, password: '', confirmPassword: '' });
    setIsChangingPassword(false); // Aseguramos que no estamos en modo de cambiar contraseña
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

  const handleChangePassword = (user) => {
    setCurrentUser(user);
    setIsChangingPassword(true);
    setNewUser({ username: '', name: '', role: '', password: '', confirmPassword: '' });
    toggleModal();
  };

  const columns = [
    { header: 'Nombre de usuario', accessor: 'username' },
    { header: 'Nombre', accessor: 'name' },
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
    },
    {
      label: 'Cambiar Contraseña',
      icon: <RiLockPasswordFill className='h-4 w-4' />,
      color: 'black',
      onClick: (user) => handleChangePassword(user)
    }
  ];

  return (
    <>
      <AdminNav />

      <div className="font-poppins p-6">
        <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
        {user.role === 'admin' ? (
          <>
            <button
              className="bg-greenDark text-white px-4 py-2 rounded mb-4 flex items-center hover:bg-greenLight transition duration-300"
              onClick={() => { setCurrentUser(null); toggleModal(); }}
            >
              <FaPlus className="mr-2" /> Agregar Nuevo Usuario
            </button>

            <CustomTable columns={columns} data={users} actions={actions} loading={loading} />

            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-2">
                <div className="bg-white p-8 rounded-lg w-full max-w-md">
                  <h2 className="text-xl text-greenDark font-bold mb-4">
                    {isChangingPassword ? 'Cambiar Contraseña' : (currentUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario')}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    {currentUser === null && !isChangingPassword && (
                      <>
                        <FormInput
                          label="Nombre de Usuario"
                          name="username"
                          type="text"
                          placeholder="Nombre de usuario"
                          value={newUser.username}
                          onChange={handleInputChange}
                          required
                        />
                        <FormInput
                          label="Nombre"
                          name="name"
                          type="text"
                          placeholder="Nombre del usuario"
                          value={newUser.name}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="mb-4">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                          <select
                            id="role"
                            name="role"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-greenDark focus:border-greenDark sm:text-sm"
                            value={newUser.role}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="editor">Editor</option>
                          </select>
                        </div>
                        <FormInput
                          label="Contraseña"
                          name="password"
                          type="password"
                          placeholder="Contraseña del usuario"
                          value={newUser.password}
                          onChange={handleInputChange}
                          required
                        />
                        <FormInput
                          label="Confirmar Contraseña"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirmar contraseña"
                          value={newUser.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}

                    {isEdit && !isChangingPassword && (
                      <>
                        <FormInput
                          label="Nombre de Usuario"
                          name="username"
                          type="text"
                          placeholder="Nombre de usuario"
                          value={newUser.username}
                          onChange={handleInputChange}
                          required
                        />
                        <FormInput
                          label="Nombre"
                          name="name"
                          type="text"
                          placeholder="Nombre del usuario"
                          value={newUser.name}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="mb-4">
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                          <select
                            id="role"
                            name="role"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-greenDark focus:border-greenDark sm:text-sm"
                            value={newUser.role}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Selecciona un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="editor">Editor</option>
                          </select>
                        </div>

                      </>
                    )}

                    {isChangingPassword && (
                      <>
                        <FormInput
                          label="Contraseña"
                          name="password"
                          type="password"
                          placeholder="Contraseña del usuario"
                          value={newUser.password}
                          onChange={handleInputChange}
                          required
                        />
                        <FormInput
                          label="Confirmar Contraseña"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirmar contraseña"
                          value={newUser.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}

                    {passwordMatchError && (
                      <p className="text-red-500 text-sm mt-2">Las contraseñas no coinciden.</p>
                    )}

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
                        {isChangingPassword ? 'Actualizar Contraseña' : (currentUser ? 'Actualizar' : 'Agregar')}
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
          </>

        ) : (<>
          <p>No eres admin</p>

        </>)}
      </div>

    </>
  );
}