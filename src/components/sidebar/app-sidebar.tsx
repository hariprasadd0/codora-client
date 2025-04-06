import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Home,
  Plus,
  Puzzle,
  Settings,
} from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CustomDialog from '../Dialog';
import NewProjectDialog from '../create-project';
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

const projects = [
  {
    id: '1',
    title: 'New Project',
    icon: Puzzle,
  },
];

export function AppSidebar({ side }: { side: 'left' | 'right' }) {
  const location = useLocation();

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
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={
                        location.pathname === item.url
                          ? 'bg-background dark:bg-secondary shadow-sm border'
                          : 'text-muted-foreground'
                      }
                    >
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
              {projects.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={`projects/${item.id}`}
                      className={
                        location.pathname === `/projects/${item.id}`
                          ? 'bg-background dark:bg-secondary shadow-sm '
                          : 'text-muted-foreground'
                      }
                    >
                      <item.icon size={12} />
                      <span>{item.title}</span>
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
                    <AvatarFallback>HP</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <span className="font-medium">Hariprasad</span>
                  </div>
                  <div className="ml-auto">
                    <ChevronUp size={12} />
                    <ChevronDown size={12} />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
