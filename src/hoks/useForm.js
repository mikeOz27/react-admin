import { useState } from 'react'
import api from '../api/axios'
export const useForm = () => {
  const [validated, setValidated] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    typeIdentification: '',
    identification: '',
    phone: '',
    birthday: '',
    address: '',
    role: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    const { target } = event
    const formValues = {
      name: target.name.value,
      email: target.email.value,
      typeIdentification: target.typeIdentification.value,
      identification: target.identification.value,
      phone: target.phone.value,
      birthday: target.birthday.value,
      address: target.address.value,
      role: target.role.value
    }
    userSave(formValues)
  }

  const userSave = async () => {
    const response = await api.post('/users/create_user', formValues, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setError(response.data.status.message)
    if (response.data.status.success) {
      setFormValues({
        name: '',
        email: '',
        typeIdentification: '',
        identification: '',
        phone: '',
        birthday: '',
        address: '',
        role: ''
      })
    }
    return response.data.status
    }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setFormErrors({
      ...formErrors,
      [name]: !value
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  return {
    error,
    validated,
    formValues,
    formErrors,
    handleSubmit,
    handleBlur,
    handleChange
  }
}
