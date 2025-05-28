import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePaths } from '../routes/paths';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={RoutePaths.LOGIN} replace />;
    }
    return children;
};

export default ProtectedRoute;
