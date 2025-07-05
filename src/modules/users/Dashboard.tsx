import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BellDot,
  CheckCircle2,
  Clock,
  Folder,
  AlertCircle,
  ClipboardList, Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatsCard from './components/statsCard';
import AssignedTasks from './components/assignedTasks';
import {Task} from "@/modules/tasks/types.ts";
import ProjectCard from './components/projectCard';
import { useProjects } from '../projects/hooks/useProjects';
import {Loader} from '@/components/Loader'
import {useTasks} from '@/modules/tasks/hooks/useTasks.tsx'

const Dashboard = () => {
  // Dummy data for assigned tasks
  const {data:tasks} = useTasks()
  const assignedTasks = Array.isArray(tasks)? tasks as Task[]:[];
  const { data,isLoading } = useProjects();

  const projects = data?.projects || [];

  const cardContents = [
    {
      title: 'Total Projects',
      previousCount: 0,
      currentCount: projects.length,
      icon: <Folder className="w-4 h-4 text-gray-500" />,
    },
    {
      title: 'Total Tasks',
      previousCount: 10,
      currentCount: 24,
      icon: <ClipboardList className="w-4 h-4 text-gray-500" />,
    },
    {
      title: 'Completed Tasks',
      previousCount: 8,
      currentCount: 15,
      icon: <CheckCircle2 className="w-4 h-4 text-gray-500" />,
    },
    {
      title: 'Pending Tasks',
      previousCount: 10,
      currentCount: 9,
      icon: <Clock className="w-4 h-4 text-gray-500" />,
    },
  ];
  // Dummy data for recent activity
  const recentActivities = [
    {
      id: 1,
      action: 'Task completed',
      description: 'Design homepage mockup',
      user: 'Alex',
      time: '2 hours ago',
      avatar: 'A',
    },
    {
      id: 2,
      action: 'New comment',
      description: 'On task: Database schema design',
      user: 'Maria',
      time: '4 hours ago',
      avatar: 'M',
    },
    {
      id: 3,
      action: 'New task created',
      description: 'Implement payment gateway',
      user: 'John',
      time: '6 hours ago',
      avatar: 'J',
    },
  ];
  // Dummy data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Present prototype to client',
      project: 'E-commerce Platform',
      dueDate: '2025-03-25',
      daysLeft: 1,
    },
    {
      id: 2,
      title: 'Complete API documentation',
      project: 'Mobile App',
      dueDate: '2025-03-27',
      daysLeft: 3,
    },
    {
      id: 3,
      title: 'Testing phase begins',
      project: 'CRM System',
      dueDate: '2025-03-29',
      daysLeft: 5,
    },
  ];

  if (isLoading){
    return(
        <Loader/>
    )
  }else {
    return (
        <section className="p-6 min-h-screen">
          {/* Stats Cards */}
          <StatsCard cardContents={cardContents}/>

          {/* Main Content */}
          <section className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {/* Assigned Tasks */}
            <AssignedTasks tasks={assignedTasks}/>

            {/* Projects */}
            <ProjectCard projects={projects}/>

            {/* Recent Activity */}
            <Card className="rounded-md shadow-none overflow-hidden ">
              <CardHeader
                  className="flex flex-row justify-between items-center overflow-hidden p-3 bg-[#FAFAFA] dark:bg-transparent pb-2 border-b ">
                <CardTitle className="text-xs text-muted-foreground font-medium  flex items-center gap-2">
                  <BellDot className="w-4 h-4"/> Recent Activity
                </CardTitle>
                <Button
                    variant="ghost"
                    className="text-xs text-muted-foreground shadow-none  hover:bg-transparent"
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-muted">
                  {recentActivities.map((activity) => (
                      <div
                          key={activity.id}
                          className="flex items-start gap-3 p-4 hover:bg-secondary"
                      >
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-secondary ">
                            {activity.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                    <span className="text-sm font-medium ">
                      {activity.action}
                    </span>
                          <span className="text-xs text-muted-foreground">
                      {activity.description}
                    </span>
                          <span className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </span>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="rounded-md shadow-none border overflow-hidden">
              <CardHeader
                  className="flex flex-row justify-between items-center p-3 bg-[#FAFAFA] dark:bg-transparent pb-2 border-b">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 "/> Upcoming Deadlines
                </CardTitle>
                <Button
                    variant="ghost"
                    className="text-xs text-gray-500 shadow-none hover:text-gray-900 hover:bg-gray-50"
                >
                  View Calendar
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-muted">
                  {upcomingDeadlines.map((deadline) => (
                      <div
                          key={deadline.id}
                          className="p-4 hover:bg-secondary"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{deadline.title}</span>
                            <span className="text-xs text-muted-foreground">
                        {deadline.project}
                      </span>
                          </div>
                          <Badge
                              variant={'outline'}
                              className={`text-xs font-medium px-2 py-0.5 ${
                                  deadline.daysLeft <= 2
                                      ? 'text-red-600'
                                      : deadline.daysLeft <= 5
                                          ? ' text-amber-600'
                                          : ' text-green-600'
                              }`}
                          >
                            {deadline.daysLeft} day
                            {deadline.daysLeft !== 1 ? 's' : ''} left
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3"/> Due: {deadline.dueDate}
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </section>
    );
  }
};

export default Dashboard;
