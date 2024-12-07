import { Navigate, Outlet } from 'react-router-dom';

const protectedRoute = ({
  token,
  userAuth,
  redirectpath = '/login'
}) => {

  if (userAuth.role !== 'Admin') {
    return <Navigate to={redirectpath} replace/>;
  }
  return <Outlet />;
}

export default protectedRoute;
