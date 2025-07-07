import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRole }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) return <Navigate to="/" replace />;
    if (currentUser.role !== allowedRole) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
