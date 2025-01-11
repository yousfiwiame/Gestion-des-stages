import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../service/useAuth';

const PrivateRoute = () => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/dashboard" />;
};

export default PrivateRoute;


