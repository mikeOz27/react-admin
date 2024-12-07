import api from '../api/axios'
import { useState } from 'react'

export const useUser = () => {
  const token = localStorage.getItem('token')
  const [userAuth] = useState(JSON.parse(localStorage.getItem('userAuth')));

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const getUsers = async () => {

    // const isValid = await validateToken();
    // if (!isValid) return; // Salir para evitar llamar a `fetchUsers`
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
  return {
    getUsers,
    currentUsers
  }
}
