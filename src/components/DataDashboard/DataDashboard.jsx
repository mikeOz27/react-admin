import React, {useState, useEffect} from 'react'
import { CCardBody, CCol, CRow,CWidgetStatsC  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUserFollow, cilBasket, cilChartPie, cilSpeedometer, cilSpeech } from '@coreui/icons'
import api from '../../api/axios'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

export const DataDashboard = ({token}) => {
  const [countUser, setCountUser] = useState(0);
  const [countBlog, setCountBlog] = useState(0);
  const [countRole, setCountRole] = useState(0);

  const countUsers = async () => {
    try {
      const response = await api.get('/users/count_users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    }
    catch (error) {
      console.error('Error al obtener la cantidad de usuarios', error)
    }
  }

  const countBlogs = async () => {
    try {
      const response = await api.get('/blogs/count_blogs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Cantidad de blogs:', response.data.data);
      return response.data
    }
    catch (error) {
      console.error('Error al obtener la cantidad de usuarios', error)
    }
  }

  const contRoles = async () => {
    try {
      const response = await api.get('/roles/count_roles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Cantidad de roles:', response.data.data);
      return response.data
    }
    catch (error) {
      console.error('Error al obtener la cantidad de roles', error)
    }
  }

   // REFRESCAR TOKEN
   const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/refresh_token', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if (response.data.status === 200) {
        localStorage.setItem('token', response.data.token); // Guarda el nuevo token
        Swal.fire({
          title: 'Token Refrescado',
          text: 'Tu sesión ha sido extendida exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'El token ha caducado o ha sido alterado. Por favor, inicia sesión nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          localStorage.removeItem('userAuth');
          window.location.href = '/login'
          console.log(result)
        }
      });
    }
    // Ejecutar la función cada 1 hora
    setInterval(refreshToken, 3600000);
  };


  async function validateToken() {
    if (token) {
      try {
          const response = await api.post('/validate_token', {}, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

          if (response.data.code === 401) {
            console.log('No se encontró ningún token.');
              Swal.fire({
                  title: 'Sesión Expirada',
                  text: 'Tu sesión ha expirado. ¿Deseas refrescar el token?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Refrescar',
                  cancelButtonText: 'Cerrar sesión'
              }).then((result) => {
                  if (result.isConfirmed) {
                      // refreshToken(); // Intenta refrescar el token
                      refreshToken();

                      return false;
                  } else {
                      // alteredToken();
                      return false;
                  }
              });
          }else{
            console.log('Token válido');
              if (response.data.code === 200) {
                  return true; // Token válido
              }
          }
      } catch (error) {
          if (error.response) {
              // Si el error es un token blacklisted (revocado)
              if (error.response.data.message === 'The token has been blacklisted') {
                  // alteredToken();  // Llamamos a la función para manejar el token blacklisted
              }
              // Otros errores de validación de token
              if (error.response.data.code === 401) {
                  // alteredToken();  // Llamamos a la misma función si hay un 401
              }
          }
          return false; // Token inválido o expirado
      }
      return false;
    }
  }
  useEffect(() => {
    validateToken();
  }, []);


  useEffect(() => {
    const fetchDataUser = async () => {
      const userCount = await countUsers();
      setCountUser(userCount.data);
      console.log('Cantidad de usuarios:', userCount.data);
    };

    const fetchDataBlog = async () => {
      const blogCount = await countBlogs();
      setCountBlog(blogCount.data);
    };

    const fetchDataRole = async () => {
      const roleCount = await contRoles();
      setCountRole(roleCount.data);
    };

    fetchDataUser();
    fetchDataBlog();
    fetchDataRole();
  }, [])

  return (
    <CCardBody>
      <CRow xs={{ gutter: 4 }}>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilPeople} height={36} />}
            value={
              <>
                {countUser !== null ? countUser : '0'}{' '}
              </>
            }
            title="Users"
            progress={{ color: 'info', value: 75 }}
          />
        </CCol>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilUserFollow} height={36} />}
            value={
              <>
                {countBlog !== null ? countBlog : '0'}{' '}
              </>
            }
            title="New Clients"
            progress={{ color: 'success', value: 75 }}
          />
        </CCol>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilBasket} height={36} />}
            value={
              <>
                {countRole !== null ? countRole : '0'}{' '}
              </>
            }
            title="Products sold"
            progress={{ color: 'warning', value: 75 }}
          />
        </CCol>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilChartPie} height={36} />}
            value="28%"
            title="Returning Visitors"
            progress={{ color: 'primary', value: 75 }}
          />
        </CCol>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilSpeedometer} height={36} />}
            value="5:34:11"
            title="Avg. Time"
            progress={{ color: 'danger', value: 75 }}
          />
        </CCol>
        <CCol xs={6} lg={4} xxl={2}>
          <CWidgetStatsC
            icon={<CIcon icon={cilSpeech} height={36} />}
            value="972"
            title="Comments"
            progress={{ color: 'info', value: 75 }}
          />
        </CCol>
      </CRow>
    </CCardBody>
  )
}

export default DataDashboard
