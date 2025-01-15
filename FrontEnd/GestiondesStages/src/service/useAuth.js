import { useState, useEffect } from 'react';
import AuthService from './AuthService';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing auth state on mount
        const initializeAuth = () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            
            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await AuthService.login(credentials.email, credentials.password);
            const { token, ...userData } = response.data;

            if (!token) {
                throw new Error('No token returned');
            }

            // Store token in localStorage
            localStorage.setItem('token', token);
            
            // Remove sensitive data and store user info
            const { password, ...safeUserData } = userData;
            setUser(safeUserData);
            localStorage.setItem('user', JSON.stringify(safeUserData));

            // Return the appropriate redirect path
            const roleRoutes = {
                'ADMIN': '/admin/dashboard',
                'ETUDIANT': '/student/dashboard',
                'ENTREPRISE': '/company/dashboard'
            };

            return roleRoutes[safeUserData.role] || '/';
        } catch (error) {
            console.error('Login error:', error);
            logout();
            throw new Error('Email ou mot de passe incorrect');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const checkRole = (allowedRoles) => {
        if (!user) return false;
        return Array.isArray(allowedRoles) 
            ? allowedRoles.includes(user.role)
            : user.role === allowedRoles;
    };

    return {
        user,
        login,
        logout,
        checkRole,
        isAuthenticated: !!user,
        loading
    };
};

export default useAuth;