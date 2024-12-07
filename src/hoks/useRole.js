import api from '../api/axios'

export const useRole = () => {
  const token = localStorage.getItem('token')

  const getRoles = async () => {
    const response = await api.get('/roles/get_roles_home', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.status.data
  }

  return {
    getRoles
  }
}
