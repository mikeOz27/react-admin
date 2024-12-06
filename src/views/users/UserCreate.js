import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import api from '../../api/axios'

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom01" defaultValue="Mark" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationCustomUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback invalid>Please choose a username.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
        <CFormInput type="text" id="validationCustom03" required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom04">City</CFormLabel>
        <CFormSelect id="validationCustom04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

const BrowserDefaults = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault01">Email</CFormLabel>
        <CFormInput type="text" id="validationDefault01" defaultValue="Mark" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault02">Email</CFormLabel>
        <CFormInput type="text" id="validationDefault02" defaultValue="Otto" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefaultUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend02">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationDefaultUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend02"
            required
          />
          <CFormFeedback invalid>Please choose a username.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault03">City</CFormLabel>
        <CFormInput type="text" id="validationDefault03" required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationDefault04">City</CFormLabel>
        <CFormSelect id="validationDefault04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationDefault05">City</CFormLabel>
        <CFormInput type="text" id="validationDefault05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}


const Validation = () => {
  const [validated, setValidated] = useState(false)
  const [roles, setRoles] = useState([])
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const GetRoles = async () => {
    const response = await api.get('/roles/get_roles_home', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = response.data.status.data
    return data
  }

  useEffect(() => {
    const fechtDataRoles = async () => {
      const getRoles = await GetRoles();
      setRoles(getRoles);
    };
    fechtDataRoles();
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create user</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
              {/* NAME */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServerUsername">Name</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend03">@</CInputGroupText>
                  <CFormInput
                    type="text"
                    name='name'
                    id="validationServerUsername"
                    defaultValue=""
                    aria-describedby="inputGroupPrepend03"
                    invalid
                    required
                  />
                  <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
              </CCol>

              {/* EMAIL */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer01">Email</CFormLabel>
                <CFormInput
                  type="email"
                  name='email'
                  id="validationServer01"
                  defaultValue=""
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
                <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
              </CCol>

              {/* TYPE IDENTIFICATION */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer04">Type identification</CFormLabel>
                <CFormSelect id="validationServer04" name='address' invalid>
                  <option disabled selected>Choose...</option>
                  <option value='CC'>Cédula de ciudadanía</option>
                  <option value='CE'>Cédula de extranjería</option>
                  <option value='TI'>Tarjeta de identidad</option>
                  <option value='PP'>Pasaporte</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>


              {/* IDENTIFICATION */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer03">Identification</CFormLabel>
                <CFormInput type="text" id="validationServer03" name='identification' invalid required />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* PHONE */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer03">Phone</CFormLabel>
                <CFormInput type="text" id="validationServer03" name='phone' invalid required />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* BIRTHDAY */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer03">Birthday</CFormLabel>
                <CFormInput type="date" id="validationServer03" name='birthday' invalid required />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* ADDRESS */}
              <CCol md={8}>
                <CFormLabel htmlFor="validationServer03">Address</CFormLabel>
                <CFormInput type="text" id="validationServer03" name='phone' invalid required />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* ROL */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer04">Rol</CFormLabel>
                <CFormSelect id="validationServer04" name='role' invalid>
                  <option disabled selected>Choose...</option>
                    {roles.map((role) => (
                      <option value={role.id}>{role.name}</option>
                    ))}
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>


              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
