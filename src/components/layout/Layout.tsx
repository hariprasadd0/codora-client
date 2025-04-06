import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../sidebar/app-sidebar';
import { SidebarProvider } from '../ui/sidebar';
import Navbar from '../navbar/app-navbar';
import { useEffect, useRef } from 'react';
import { useSettingsStore } from '@/modules/users/store/user.store';

const Layout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  const side = useSettingsStore((state) => state.position);
  return (
    <SidebarProvider>
      {side == 'left' && <AppSidebar side={side} />}

      <div className="h-screen  w-screen bg-[hsl(0,0%,98%)] dark:bg-[hsl(0,0%,0%)]">
        <main
          ref={mainRef}
          className=" overflow-x-hidden rounded-lg md:h-[97vh] my-2  border mx-2 shadow-sm bg-[hsl(0,0%,100%)] dark:bg-[hsl(240,6%,7%)]"
        >
          <Navbar location={location} />
          <Outlet />
        </main>
      </div>
      {side == 'right' && <AppSidebar side={side} />}
    </SidebarProvider>
  );
};

export default Layout;
