import api from '../../api/axios'
import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react'

import {
  cilPeople,
  cilLockLocked,
  cilLockUnlocked,
  cilPenAlt,
  cilContact,
  cilTrash,
  cilUserFollow
} from '@coreui/icons'

import { useRole } from '../../hoks/useRole'
import { useUser } from '../../hoks/useUser'
import env from '../../constants/apiConst'

function User() {
  const [token] = useState(localStorage.getItem('token'));

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //TODO PASAR AL HOCKS
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const { getRoles } = useRole();
  const { getUsers } = useUser();

  const { environment } = env

  const [file, setFile] = useState();

  //TODO MODAL PARA VER USUARIO
  const ViewUserModal = ({ isOpen, onRequestClose, user }) => (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> <img src={user?.image} alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' /></p>
        <p><strong>Nickaname:</strong> {user?.nickname === null ? 'No nickname' : user?.nickname}</p>
        <p><strong>Phone:</strong> {user?.phone === null ? 'No phone' : user?.phone}</p>
        <p><strong>Address:</strong> {user?.address === null ? 'No address' : user?.address}</p>
        <p><strong>Birthday:</strong> {user?.birthday === null ? 'No birthday' : user?.birthday}</p>
        <p><strong>Type identification:</strong> {user?.type_identification === null ? 'No type identification' : user?.type_identification}</p>
        <p><strong>Tdentification:</strong> {user?.identification === null ? 'No identification' : user?.identification}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onRequestClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );

  //TODO MODAL PARA EDITAR USUARIO
  const EditUserModal = ({ isOpen, onRequestClose, user, onUpdate }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(() => {
      setUpdatedUser(user);
    }, [user]);

    const handleUpdateUser = async (e) => {
      e.preventDefault();
      await onUpdate(updatedUser);
    };

    return (
      <Modal show={isOpen} onHide={onRequestClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CForm onSubmit={handleUpdateUser}>
            <div className="form-group">
              <input type="hidden" value={updatedUser?.id || ''} name='id' />
              <CFormLabel htmlFor="name">Nombre</CFormLabel>
              <CFormInput
                type="text"
                className="form-control"
                id="name"
                value={updatedUser?.name || ''}
                name='name'
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                type="email"
                className="form-control"
                id="email"
                value={updatedUser?.email || ''}
                name='email'
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <CFormLabel htmlFor="phone">Phone</CFormLabel>
              <CFormInput
                type="phone"
                className="form-control"
                id="phone"
                value={updatedUser?.phone || ''}
                name='phone'
                onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormInput
                type="address"
                className="form-control"
                id="address"
                value={updatedUser?.address || ''}
                name='address'
                onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              <CFormLabel htmlFor="address">Type identification</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                options={[
                  { value: 'CC', label: 'CC' },
                  { value: 'CE', label: 'CE' },
                  { value: 'TI', label: 'TI' },
                  { value: 'PP', label: 'PP' },
                  { value: 'OTRO', label: 'OTRO' },
                ]}
                value={updatedUser?.type_identification || ''}
                onChange={(e) => setUpdatedUser({ ...updatedUser, type_identification: e.target.value })}
              />
            </div>
            <br />
            <div className="form-group">
              <CFormLabel htmlFor="identification">Identification</CFormLabel>
              <CFormInput
                type="identification"
                className="form-control"
                id="identification"
                value={updatedUser?.identification || ''}
                name='identification'
                onChange={(e) => setUpdatedUser({ ...updatedUser, identification: e.target.value })}
              />
            </div>
            <br />
            <Button type="submit" variant="primary">Actualizar</Button>
          </CForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRequestClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /* FUNCIONES PARA EL CRUD DE USUARIOS */
  //TODO Función para cambiar el estado de un usuario! */
  const toggleUserActivation = async (userId, isActive) => {
    try {
      if (isActive) {
        await api.get(`users/desactivate_user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await api.get(`users/activate_user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: isActive ? 0 : 1 } : user
      ));
    } catch (error) {
      console.error('Error al cambiar el estado del usuario', error);
    }
  };

  //TODO Función para registrar usuario! */
  const handleRegisterUser = async (newUser) => {
    try {
      const response = await api.post(environment.REGISTER, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const registeredUser = response.data.status.data;  // El nuevo usuario registrado
      // Agregar el nuevo usuario a la lista de usuarios existente en el estado
      setUsers([...users, registeredUser]);
      setRegisterModalOpen(false);
    } catch (error) {
      // Verifica si hay un error de respuesta del backend
      if (error.response) {
        console.error('Error en onRegister:', error.response.data.message);
        return {
          status: {
            code: error.response.status,
            message: error.response.data.message || 'Error al registrar el usuario',
          },
        };
      } else {
        // Otro tipo de error (red, etc.)
        console.error('Error de red u otro:', error.message);
        return {
          status: {
            code: 500,
            message: 'Error de red o inesperado',
          },
        };
      }
    }
  };

  //TODO Función para actualizar usuario! */
  const handleUpdateUser = async (updatedUser) => {
    try {
      await api.put(environment.UPDATE_USER + updatedUser.id, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

  //TODO Función para eliminar usuario! */
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(environment.DELETE_USER + userId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response && response.data) {
          setUsers(users.filter(user => user.id !== userId));
        }
      })
        .catch((error) => {
          console.error(error);
        });

    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const RegisterUserModal = ({ isOpen, onRequestClose, onRegister, token }) => {
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [newUser, setNewUser] = useState({
      id: '',
      role_id: '',
      name: '',
      nickname: '',
      email: '',
      image: '',
      status: '',
      password: ''
    });

    const handleRegisterUser = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', newUser.name);
      formData.append('email', newUser.email);
      formData.append('role_id', newUser.role_id);
      formData.append('password', newUser.password);
      if (newUser.image) {
        formData.append('image', newUser.image);
      }

      try {
        const response = await onRegister(newUser);
        if (response && response.status.code === 200) {
          setNewUser({ id: newUser.id, role_id: newUser.role_id, name: newUser.name, nickname: newUser.nickname, image: newUser.image, email: newUser.email, status: newUser.status, password: newUser.password });
          onRequestClose(); // Cierra el modal si la respuesta es exitosa (200)
          // console.log('Usuarios actuales después de registrar:', currentUsers);
        } else if (response) {
          const errorData = response.status.message; // Este es el objeto con el mensaje de error
          if (typeof errorData === 'object') {
            // Accede a los mensajes y los convierte en una cadena
            setNewUser({ id: newUser.id, role_id: newUser.role_id, name: newUser.name, nickname: newUser.nickname, image: newUser.image, email: newUser.email, status: newUser.status, password: newUser.password });
            setNewUser({ id: newUser.id, role_id: newUser.role_id, name: newUser.name, nickname: newUser.nickname, image: newUser.image, email: newUser.email, status: newUser.status, password: newUser.password });
          } else {
            console.error(errorData);
          }
        } else {
          setErrorMessage('No se recibió una respuesta válida del servidor.');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setErrorMessage('Error al procesar la solicitud. Por favor, inténtalo más tarde.');
      }
    };

    //TODO OBTENER ROLES
    useEffect(() => {
      const fechtDataRoles = async () => {
        const fecthRoles = await getRoles();
        setRoles(fecthRoles);
      };
      fechtDataRoles();
    }, [])

    //TODO RETURN DE MODAL DE REGISTRO
    return (
      <>
        <Modal show={isOpen} onHide={onRequestClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )} */}
            <form onSubmit={handleRegisterUser}>
              <div className="form-group">
                <CFormLabel htmlFor="image">Image profile</CFormLabel>
                <CFormInput
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={
                    (e) => {
                      // handleChangeImage(e);
                      // e.preventDefault();
                      setNewUser({ ...newUser, image: e.target.files[0] });
                      // setFile(URL.createObjectURL(e.target.files[0]));
                    }}
                  style={{ display: 'none' }}
                />
                {/* <CFormInput
                  type="file"
                  id="image"
                  name="image"
                  onChange={
                  (e) => {
                    handleChangeImage(e);
                    setNewUser({ ...newUser, image: file });
                  }}
                  style={{ display: 'none' }}
                /> */}
                {/* <div
                  color="primary"
                  type="button"
                  display="flex"
                  onClick={() => document.getElementById('image').click()}
                  style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', cursor: 'pointer', height: '150px', width: '150px' }}
                >

                    <img
                      src= {file ? file : ("src/assets/images/avatars/avatar.png")}
                      alt="Default"
                      name="image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', marginRight: '10px', borderRadius: '50%' }}
                    />
                </div> */}
              </div>

              <br />
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon" role="img" aria-hidden="true">
                      <path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" className="ci-primary"></path>
                    </svg>
                  </span>
                  <CFormInput
                    type="text"
                    className="form-control"
                    id="name"
                    name='name'
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text">@</span>
                  <CFormInput
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text"><CIcon icon={cilPeople} /></span>
                  <CFormSelect
                    aria-label="Default select example"
                    name="role_id"
                    id="role_id"
                    className='form-control'
                    onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
                    required
                  >
                    <option value="">Select a role</option>
                    {roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>{rol.name}</option>
                    ))}
                  </CFormSelect>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <span className="input-group-text"><CIcon icon={cilLockLocked} /></span>
                  <CFormInput
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                    placeholder="Password"
                  />
                </div>
              </div>
              <Button type="submit" className="btn btn-primary">
                Register
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onRequestClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //TODO OBTENER USUARIOS
  useEffect(() => {
    const fechtDataUsers = async () => {
      const fecthUsers = await getUsers();
      setUsers(fecthUsers);
    };
    fechtDataUsers();
  }, [])

  //TODO SALTAR EL PAGINADO, SI YA NO HAY USUARIOS EN LA LISTA
  useEffect(() => {
    if (currentUsers.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [users, currentUsers, currentPage]);

  return (
    <>
      <h1>Users</h1>
      <CButton color="primary" onClick={() => setRegisterModalOpen(true)}>New register <CIcon icon={cilUserFollow} /></CButton>
      <br />
      <br />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Users</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">#</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Rol</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentUsers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.image} status={item.status === 1 ? 'success' : 'warning'} />
                      </CTableDataCell>
                      <CTableDataCell className='text-center'>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell className='text-center'>
                        <div className="fw-semibold">{item.rol}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButtonGroup>
                          <CButton color={item.status === 1 ? 'success' : 'warning'} size="sm" style={{ color: 'white' }}>
                            {item.status === 1 ? 'Active' : 'Inactive'}
                          </CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton color="primary" size="sm" className="me-1" onClick={() => openViewModal(item)}>
                          <CIcon icon={cilContact} />
                        </CButton>
                        <CButton color="primary" size="sm" className="me-1" onClick={() => openEditModal(item)}>
                          <CIcon icon={cilPenAlt} />
                        </CButton>
                        <CButton color={item.status === 1 ? "success" : "warning"} size="sm" className="me-1" onClick={() => toggleUserActivation(item.id, item.status)}>
                          <CIcon icon={item.status === 1 ? cilLockLocked : cilLockUnlocked} style={{ color: 'white' }} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDeleteUser(item.id)}>
                          <CIcon icon={cilTrash} style={{ color: 'white' }} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <br />
              <nav className="d-flex justify-content-end">
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                    <li key={index + 1} className="page-item">
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <RegisterUserModal
        isOpen={isRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
        token={token}
        onRegister={handleRegisterUser}
      />

      <ViewUserModal
        isOpen={isViewModalOpen}
        onRequestClose={() => setViewModalOpen(false)}
        user={selectedUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </>
  )
}

export default User
