import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoggedIn } = currentUser;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;