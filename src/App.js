import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import ProtectedRoute from './utils/protectedRoute'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./components/AuthLogin/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
    const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
    const storedTheme = useSelector((state) => state.theme)

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userAuth, setUser] = useState(JSON.parse(localStorage.getItem('userAuth')));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userAuth');
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.href.split('?')[1])
      const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
      if (theme) {
          setColorMode(theme)
      }

      if (isColorModeSet()) {
          return
      }

      setColorMode(storedTheme)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <HashRouter>
          <Suspense
              fallback={
                  <div className="pt-3 text-center">
                      <CSpinner color="primary" variant="grow" />
                  </div>
              }
          >
              <Routes>
                  {/* <Route exact path="/*" name="Login Page" element={<Login />} /> */}
                  <Route exact path="/register" name="Register Page" element={<Register />} />
                  <Route exact path="/404" name="Page 404" element={<Page404 />} />
                  <Route exact path="/500" name="Page 500" element={<Page500 />} />

                  <Route path="*" name="Home" element={<DefaultLayout setToken={setToken} token={token}
                                      userAuth={userAuth}
                                      onLogout={handleLogout}/>} />

{/* <Route element={<ProtectedRoute token={token} userAuth={userAuth} />}> */}

                  {/* <Route path="/users/" element={<Navigate to="/users" />} /> */}
                  {/* <Route path="/users/*" element={<DefaultLayout to="/users/create" />} /> */}
{/* </Route> */}

                  <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} token={token} setUser={setUser} />} />
                  <Route path="/register" element={<Register to="/register"  token={token} />} />
                  <Route path="/"
                      element={
                          token ? (
                              <>
                                  <DefaultLayout
                                      token={token}
                                      userAuth={userAuth}
                                      onLogout={handleLogout}
                                  />
                              </>
                          ) : (
                              <Navigate to="/login" />
                          )
                      }
                  />
              </Routes>
          </Suspense>
        </HashRouter>
    )
}

export default App
