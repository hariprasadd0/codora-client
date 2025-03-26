import NotFound from '@/components/NotFound';
import Task from '@/modules/tasks/components/Task.tsx';
import Tasks from '@/modules/tasks/Tasks.tsx';
import Settings from '@/modules/users/Settings';
import { lazy } from 'react';

const Dashboard = lazy(() => import('../modules/users/Dashboard'));
const Projects = lazy(() => import('../modules/projects/AllProjects.tsx'));
const Project = lazy(() => import('../modules/projects/Project'));

const protectedRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/projects/:id',
    element: <Project />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/tasks',
    element: <Tasks />,
    children: [{ path: '/tasks/:taskId', element: <Task /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default protectedRoutes;
