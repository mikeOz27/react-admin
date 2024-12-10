import React, { useState, useEffect } from 'react';


import DataDashboard from '../../components/DataDashboard/DataDashboard'

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userAuth, setUser] = useState(JSON.parse(localStorage.getItem('userAuth')));

  return (
    <>
      <DataDashboard token={token}/>
      {/* <CCard className="mb-4">
        <CCardBody>
          <CRow xs={{ gutter: 4 }}>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilPeople} height={36} />}
                value="87.500"
                title="Visitors"
                progress={{ color: 'info', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilUserFollow} height={36} />}
                value="385"
                title="New Clients"
                progress={{ color: 'success', value: 75 }}
              />
            </CCol>
            <CCol xs={6} lg={4} xxl={2}>
              <CWidgetStatsC
                icon={<CIcon icon={cilBasket} height={36} />}
                value="1238"
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
      </CCard> */}
    </>
  )
}

export default Dashboard
