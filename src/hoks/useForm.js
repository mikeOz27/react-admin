import { useState } from 'react'
import api from '../api/axios'
import { Navigate } from 'react-router-dom'
import env from '../constants/apiConst'

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
  const { environment } = env
  const [file, setFile] = useState();

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    console.log(form)

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    const { target } = event
    const formValues = {
      name: target.name.value,
      email: target.email.value,
      image: target.image.value,
      typeIdentification: target.typeIdentification.value,
      identification: target.identification.value,
      phone: target.phone.value,
      birthday: target.birthday.value,
      address: target.address.value,
      role: target.role.value
    }
    userSave(formValues)
    console.log(formValues)
  }

  const userSave = async () => {
    const response = await api.post(environment.REGISTER_USER, formValues, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setError(response.data.status.message)
    if (response.data.status.code === 200) {
      setFormValues({
        name: '',
        email: '',
        image: '',
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


  function handleChangeImage(e) {
    e.preventDefault
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return {
    error,
    validated,
    formValues,
    formErrors,
    file,
    handleSubmit,
    handleBlur,
    handleChange,
    handleChangeImage
  }
}
