import publicRoutes from "./publicRoutes"
import protectedRoutes from "./protectedRoutes" 
import AuthLayout from "@/components/layout/AuthLayout";
import Layout from "@/components/layout/Layout";


const appRoutes = [
    {
        element: <AuthLayout />,
        children: publicRoutes
    },
    {
        element: <Layout />,
        children: protectedRoutes
    },
    
]

export default appRoutes