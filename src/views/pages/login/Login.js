import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../api/axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = ({ setToken, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('login', { email, password });
            if (response.data.status.code == 400) {
                console.log('Error al iniciar sesión', response.data);
                localStorage.removeItem('token'); // Limpiar el token en caso de error
                localStorage.removeItem('userAuth'); // Limpiar el usuario autenticado en caso de error
                setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
                return;
            }
            const token = response.data.status.token;
            const userAuth = response.data.status.user;

            localStorage.setItem('token', token);
            localStorage.setItem('userAuth', JSON.stringify(userAuth));

            setToken(token);
            setUser(userAuth);
            setErrorMessage(''); // Limpiar el mensaje de error en caso de éxito
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            localStorage.removeItem('token'); // Limpiar el token en caso de error
            localStorage.removeItem('userAuth'); // Limpiar el usuario autenticado en caso de error

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
            }
        }
    };
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput id="email" type='email'
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Email'
                                                required
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                autoComplete="current-password"
                                                id="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Password'
                                                required
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type='submit'>
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" >
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link to="/register">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
