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
import { useRole } from '../../hoks/useRole'
import { useForm } from '../../hoks/useForm'

const Validation = () => {
  const [roles, setRoles] = useState([])
  const { getRoles } = useRole();
  const { error, validated, formValues, formErrors, handleSubmit, handleBlur, handleChange } = useForm()
  useEffect(() => {
    if (error) {
      // como recorro el error para mostrarlo en el formulario

      
    }
  }, [error]);
  const { name, email, typeIdentification, identification, phone, birthday, address, role } = formValues

  useEffect(() => {
    const fechtDataRoles = async () => {
      const fecthRoles = await getRoles();
      setRoles(fecthRoles);
    };
    fechtDataRoles();
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create user</strong>
          </CCardHeader>
          <CCardBody>

            {/* quiero mostrar el error aca */}



            <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
              {/* NAME */}
              <CCol md={4}>
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="name">@</CInputGroupText>
                  <CFormInput
                    type="text"
                    name='name'
                    id="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    valid={validated && !formErrors.name}
                    invalid={validated && formErrors.name}
                    required
                  />
                  <CFormFeedback invalid>Please choose a name.</CFormFeedback>
                </CInputGroup>
              </CCol>

              {/* EMAIL */}
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  name='email'
                  id="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.email}
                  invalid={validated && formErrors.email}
                  required
                />
                <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
              </CCol>

              {/* TYPE IDENTIFICATION */}
              <CCol md={4}>
                <CFormLabel htmlFor="typeIdentification">Type identification</CFormLabel>
                <CFormSelect
                  id="typeIdentification"
                  name='typeIdentification'
                  value={typeIdentification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.address}
                  invalid={validated && formErrors.address}
                >
                  <option disabled value={''} >Select a type...</option>
                  <option value='CC'>Cédula de ciudadanía</option>
                  <option value='CE'>Cédula de extranjería</option>
                  <option value='TI'>Tarjeta de identidad</option>
                  <option value='PP'>Pasaporte</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* IDENTIFICATION */}
              <CCol md={4}>
                <CFormLabel htmlFor="identification">Identification</CFormLabel>
                <CFormInput
                  type="text"
                  id="identification"
                  name='identification'
                  value={identification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.identification}
                  invalid={validated && formErrors.identification} required
                />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* PHONE */}
              <CCol md={4}>
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  name='phone'
                  value={phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.phone}
                  invalid={validated && formErrors.phone} required
                />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* BIRTHDAY */}
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer03">Birthday</CFormLabel>
                <CFormInput
                  type="date"
                  id="validationServer03"
                  name='birthday'
                  value={birthday}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.birthday}
                  invalid={validated && formErrors.birthday}
                  required
                />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* ADDRESS */}
              <CCol md={8}>
                <CFormLabel htmlFor="validationServer03">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer03"
                  name='address'
                  value={address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.address}
                  invalid={validated && formErrors.address}
                  required
                />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
              </CCol>

              {/* ROL */}
              <CCol md={4}>
                <CFormLabel htmlFor="role">Rol</CFormLabel>
                <CFormSelect
                  id="role"
                  name='role'
                  value={role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  valid={validated && !formErrors.role}
                  invalid={validated && formErrors.role}
                >
                  <option disabled value={''} >Select a role...</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </CFormSelect>
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
