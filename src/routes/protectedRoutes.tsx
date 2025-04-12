import NotFound from '@/components/NotFound';
import { Calendar } from '@/modules/calendar/Calendar.tsx';
import Task from '@/modules/tasks/components/Task.tsx';
import Tasks from '@/modules/tasks/Tasks.tsx';
import Settings from '@/modules/users/Settings';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../modules/users/Dashboard'));
const Projects = lazy(() => import('../modules/projects/AllProjects.tsx'));
const Project = lazy(() => import('../modules/projects/Project'));

const protectedRoutes = [
  {
    path: '/',
    element: (
      <Navigate
        to="/dashboard"
        replace
      />
    ),
  },
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
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default protectedRoutes;
