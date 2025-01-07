import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../service/AuthService';

const LogoutComponent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutComponent;
