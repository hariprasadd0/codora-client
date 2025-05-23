import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Home,
  Plus,
  Puzzle,
    LogOut,
  Settings,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import NewProjectDialog from '../createProject/create-project';
import { useProjects } from '@/modules/projects/hooks/useProjects';
import {useUserData} from "@/hooks/use-user.tsx";
import {getInitialsFromName} from "@/lib/utils.ts";
import {useLogout} from "@/modules/auth/api/authApi.ts";
import {useAuthStore} from "@/modules/auth/store/auth.store.ts";
// Menu items.
const items = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Calendar',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: Puzzle,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: ClipboardList,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar({ side }: { side: 'left' | 'right' }) {
  const location = useLocation();
  const { data } = useProjects();
  const { mutate: Logout,isSuccess } = useLogout();
  const {data:userData} = useUserData();
  const project = data?.projects || [];
  const {logoutUser} = useAuthStore()

  const handleLogout = ()=>{
     Logout()
    if (isSuccess) {
      logoutUser()
    }
  }
  return (
    <Sidebar side={side}>
      <SidebarContent>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-transparent active:bg-transparent outline-none h-14 w-full mt-1 py-1 border-b rounded-none">
                <Avatar>
                  <AvatarImage
                    src="/avatars/01.png"
                    alt="@codora"
                  />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="font-medium">Codora</span>
                </div>
                <div className="ml-auto">
                  <ChevronUp size={12} />
                  <ChevronDown size={12} />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname === item.url
                        ? 'bg-background dark:bg-secondary shadow-sm border hover:bg-background'
                        : 'text-muted-foreground'
                    }
                  >
                    <NavLink to={item.url}>
                      <item.icon size={12} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="my-1">Projects</SidebarGroupLabel>
          <SidebarGroupAction>
            <NewProjectDialog trigger={<Plus className="w-4 h-4" />} />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {project.slice(-3).map((item: { id: number; name: string }) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname === `/projects/${item.id}`
                        ? 'bg-background dark:bg-secondary shadow-sm border hover:bg-background'
                        : 'text-muted-foreground'
                    }
                  >
                    <NavLink to={`projects/${item.id}`}>
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="outline-none h-14 w-full mb-1 py-1 border-t rounded-none hover:bg-transparent focus-visible:ring-0">
                  <Avatar>
                    <AvatarImage
                      src="/avatars/01.png"
                      alt="@hariprasad"
                    />
                    <AvatarFallback>{getInitialsFromName(userData?.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <span className="font-medium">{userData?.name}</span>
                  </div>
                  <div className="ml-auto">
                    <ChevronUp size={12} />
                    <ChevronDown size={12} />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem onClick={handleLogout} >
                  <span className={'flex gap-2 items-center text-muted-foreground hover:text-primary cursor-pointer'}><LogOut size={16}/>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
