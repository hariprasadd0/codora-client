import { Outlet } from "react-router-dom"
import {AppSidebar} from "../sidebar/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"


const Layout = () => {
  return (
    <SidebarProvider>
    
            <AppSidebar/>
            <div className="h-screen overflow-y-scroll w-screen bg-[hsl(0,0%,98%)] dark:bg-[hsl(0,0%,0%)]">
              <main className=" overflow-y-scroll rounded-lg md:h-[97vh] my-2  border mx-2 shadow-sm bg-[hsl(0,0%,100%)] dark:bg-[hsl(240,6%,7%)]">
                <SidebarTrigger className="mx-2 my-2 absolute"/>
                <Outlet/>
             </main>
            </div>
       
    
    </SidebarProvider>
  )
}

export default Layout