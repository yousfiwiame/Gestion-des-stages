import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../service/useAuth';

export const PrivateRoute = ({ allowedRoles, children }) => {
    const { user, loading, checkRole } = useAuth();
    const location = useLocation();
    
    if (loading) {
        // You can replace this with a loading spinner
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (allowedRoles && !checkRole(allowedRoles)) {
        // Redirect to appropriate dashboard based on user's role
        const roleRoutes = {
            'ETUDIANT': '/student/dashboard',
            'ENTREPRISE': '/company/dashboard',
            'ADMIN': '/admin/dashboard'
        };
        return <Navigate to={roleRoutes[user.role]} replace />;
    }

    return children;
};