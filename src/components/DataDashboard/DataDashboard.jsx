import React, {useState, useEffect} from 'react'
import { CCard, CCardBody, CCol, CRow,CWidgetStatsC  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUserFollow, cilBasket, cilChartPie, cilSpeedometer, cilSpeech } from '@coreui/icons'
import api from '../../api/axios'

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
      // setCountUser(response.status.data);
      // console.log('Cantidad de usuarios:', response.data.status.data);
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
