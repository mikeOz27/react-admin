import api from '../api/axios'
import { useState } from 'react'

export const useUser = () => {
  const token = localStorage.getItem('token')
  const [userAuth] = useState(JSON.parse(localStorage.getItem('userAuth')));
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUsers = async () => {
    try {
      const response = await api.get('/users/get_users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.code === 401) {
        console.log('No se encontró ningún token.');
        return; // Salir si el token es inválido en esta etapa
      }

      const fetchedUsers = response.data.data
        .filter(user => user.id !== userAuth.id || userAuth.role === 'admin')
        .map(user => ({
          ...user
        }));
      setUsers(fetchedUsers);
      return fetchedUsers; // Devuelve la lista de usuarios actualizada
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  };

   //TODO Función para actualizar usuario! */
   const handleUpdateUser = async (updatedUser) => {
    try {
      await api.put(environment.UPDATE_USER + updatedUser.id, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  //TODO Función para eliminar usuario! */
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(environment.DELETE_USER + userId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response && response.data) {
          setUsers(users.filter(user => user.id !== userId));
        }
      })
      .catch((error) => {
        console.error(error);
      });

    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };
  return {
    getUsers,
    handleUpdateUser,
    handleDeleteUser,
    currentUsers,
    setUsers
  }
}
