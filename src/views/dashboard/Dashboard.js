import React, {useState} from 'react';

import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CCardFooter,
    CProgress,
    CWidgetStatsC,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilChartPie,
  cilSpeech,
  cilSpeedometer,
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilUser,
  cilUserFemale,
  cilCloudDownload
} from '@coreui/icons'

import {
    cilPeople,
    cilUserFollow
} from '@coreui/icons'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import classNames from 'classnames'
import { DocsExample } from 'src/components'
import DataDashboard from '../../components/DataDashboard/DataDashboard'

const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userAuth, setUser] = useState(JSON.parse(localStorage.getItem('userAuth')));
    const progressExample = [
      { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
      { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
      { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
      { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
      { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ]

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
