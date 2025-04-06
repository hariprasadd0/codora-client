import publicRoutes from './publicRoutes';
import protectedRoutes from './protectedRoutes';
import AuthLayout from '@/components/layout/AuthLayout';
import Layout from '@/components/layout/Layout';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';

const appRoutes = [
  {
    element: <AuthLayout />,
    children: publicRoutes,
  },
  {
    element: (
      <ProtectedRouteWrapper>
        <Layout />
      </ProtectedRouteWrapper>
    ),
    children: protectedRoutes,
  },
];

export default appRoutes;
