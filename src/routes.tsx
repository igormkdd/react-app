import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { RoutePaths } from './routes/paths';

const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const HistoryPage = lazy(() => import('./pages/History'));
const AppPage = lazy(() => import('./pages/App'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export const routes: RouteObject[] = [
    {
        path: RoutePaths.HOME,
        element: (
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        ),
    },
    {
        path: RoutePaths.LOGIN,
        element: <LoginPage />,
    },
    {
        path: RoutePaths.REGISTER,
        element: <RegisterPage />,
    },
    {
        path: RoutePaths.HISTORY,
        element: (
            <ProtectedRoute>
                <HistoryPage />
            </ProtectedRoute>
        ),
    },
    {
        path: RoutePaths.APP,
        element: (
            <ProtectedRoute>
                <AppPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
