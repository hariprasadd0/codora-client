import NotFound from '@/components/NotFound';
import Settings from '@/modules/users/Settings';
import {lazy} from 'react';

const Dashboard = lazy(()=>import("../modules/users/Dashboard"))
const Project = lazy(()=>import("../pages/Project"))

const protectedRoutes = [
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/projects",
        element: <Project/>,
        children : [
            {
                path: ":projectId",
                element: <Project />
            }
        ]
        
    },
    {
        path: "/settings",
        element: <Settings />
    }
    ,
    {
        path: "*",
        element: <NotFound />
    }
]

export default protectedRoutes