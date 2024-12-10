export const TokenValidate = () => {
  // REFRESCAR TOKEN
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/refresh_token', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
      if (response.data.status === 200) {
        localStorage.setItem('token', response.data.token); // Guarda el nuevo token
        Swal.fire({
          title: 'Token Refrescado',
          text: 'Tu sesión ha sido extendida exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'El token ha caducado o ha sido alterado. Por favor, inicia sesión nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          localStorage.removeItem('userAuth');
          console.log(result)
        }
      });
    }
  // Ejecutar la función cada 1 hora
  setInterval(refreshToken, 3600000);
  };

  const alteredToken = () => {
    Swal.fire({
      title: 'Token alterado, invalido o esta en la lista negra.',
      text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userAuth');
        window.redirect('/login');  // O usa navigate('/login') si deseas redirigir
      }
    });
  };

  // VALIDAR TOKEN
  const  validateToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await api.post('/validate_token', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status.code === 401) {
                Swal.fire({
                    title: 'Sesión Expirada',
                    text: 'Tu sesión ha expirado. ¿Deseas refrescar el token?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Refrescar',
                    cancelButtonText: 'Cerrar sesión'
                }).then((result) => {
                    if (result.isConfirmed) {
                        refreshToken(); // Intenta refrescar el token
                        return false;
                    } else {
                        alteredToken();
                        return false;
                    }
                });
            }else{
                if (response.data.code === 200) {
                    return true; // Token válido
                }
            }
        } catch (error) {
            if (error.response) {
                // Si el error es un token blacklisted (revocado)
                if (error.response.data.message === 'The token has been blacklisted') {
                    alteredToken();  // Llamamos a la función para manejar el token blacklisted
                }
                // Otros errores de validación de token
                if (error.response.data.code === 401) {
                    alteredToken();  // Llamamos a la misma función si hay un 401
                }
            }
            return false; // Token inválido o expirado
        }
        return false;
    }
  }
  
  return {
    refreshToken,
    alteredToken,
    validateToken
  }
}
