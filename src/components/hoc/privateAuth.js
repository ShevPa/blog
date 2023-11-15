import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAuth = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem('token'));
  if (!auth) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};
export default PrivateAuth;
