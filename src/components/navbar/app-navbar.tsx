import { SidebarTrigger } from '../ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Notification from '@/modules/users/components/notification';
import type { Location } from 'react-router-dom';
import NewProjectDialog from '../createProject/create-project';
import { motion } from 'framer-motion';
import { breadcrumbConfig } from '@/lib/breadcrumb.config';
import { useQuery } from '@tanstack/react-query';
import { CommandMenu } from '@/components/command';

interface NavbarProps {
  location: Location;
}

const Navbar = ({ location }: NavbarProps) => {
  const path = location.pathname.slice(1);
  const segments = path ? path.split('/') : [];
  const type = segments[0];
  const id = segments[1];

  const config = breadcrumbConfig[type];

  const { data: breadcrumbData } = useQuery({
    queryKey: [type, id],
    queryFn: () => config?.fetchFn(id),
    enabled: !!config && !!id,
  });

  function getTrigger() {
    const commonProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3, ease: 'easeInOut' },
    };
    switch (location.pathname) {
      case '/dashboard':
        return (
          <motion.div {...commonProps}>
            <NewProjectDialog />
          </motion.div>
        );
      case '/settings':
        return (
          <motion.div {...commonProps}>
            <NewProjectDialog trigger={<div></div>} />
          </motion.div>
        );
      case '/tasks':
        return (
          // <NewTaskDialog />
          <div>dd</div>
        );
      default:
        return null;
    }
  }

  return (
    <nav
      style={{
        width: '-webkit-fill-available',
      }}
      className="sticky top-0 z-50 bg-inherit flex items-center justify-between border-b  gap-1"
    >
      <div className="flex items-center p-1">
        <SidebarTrigger className="backdrop-blur-sm hover:bg-transparent" />
        <Breadcrumb className="md:block hidden">
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const href = '/' + segments.slice(0, index + 1).join('/');
              const isDynamic = config && breadcrumbConfig[type];
              const dynamicName = isDynamic
                ? breadcrumbData?.[breadcrumbConfig[type].nameKey].name
                : null;

              const item = dynamicName ?? segment;

              return (
                <BreadcrumbItem key={href}>
                  <BreadcrumbSeparator />

                  {index === segments.length - 1 ? (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                    </>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-5 p-2">
        {CommandMenu()}
        <Notification />
        {getTrigger()}
      </div>
    </nav>
  );
};

export default Navbar;
