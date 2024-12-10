import api from '../api/axios';
import { useState } from 'react';
import { createContext } from 'react';
import env from '../constants/apiConst';

const LoginContext = createContext();

function LoginProvider(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { environment } = env

    const login = async (credential) => {
      const { email, password, setToken, setUser } = credential;
      try {
        const response = await api.post(environment.LOGIN, { email, password });
        console.log('response', response);
        if (response.data.status.code === 400) {
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

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
        }
      }
    };

    return (
        <LoginContext.Provider value={{ email, setEmail, password, setPassword, errorMessage, setErrorMessage, login }}>
            {props.children}
        </LoginContext.Provider>
    );
}

export { LoginContext, LoginProvider };
