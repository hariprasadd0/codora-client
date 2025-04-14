import CreateNewPassword from '@/modules/auth/resetPassword';
import { lazy } from 'react';

const Login = lazy(() => import('../modules/auth/login'));
const SignUp = lazy(() => import('../modules/auth/signUp'));
const ForgotPassword = lazy(() => import('../modules/auth/forgotPassword'));

const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <CreateNewPassword />,
  },
];

export default publicRoutes;
