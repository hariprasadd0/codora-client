import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ClipboardList,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {Task} from "@/modules/tasks/types.ts";
import {taskIcon,priorityIcon} from "../utils"

const AssignedTasks = ({ tasks }: { tasks: Task[] }) => {
  const navigate = useNavigate();
  const taskNotExist = tasks.length === 0 || !tasks;

  return (
    <Card className="rounded-md shadow-none border overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center p-3 bg-[#FAFAFA] dark:bg-transparent border-b">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-gray-500" /> Assigned Tasks
        </CardTitle>
         {taskNotExist ? <span className={'p-3'}></span> :
        <Button
          onClick={() => navigate(`/tasks`)}
          variant="ghost"
          className="text-xs text-muted-foreground shadow-none  hover:bg-transparent"
        >
          Show All
        </Button>
          }
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-muted">
            {taskNotExist && (
                <div className="p-4 text-muted-foreground text-sm w-full h-full translate-x-1/3 translate-y-1/2">
                    <span>No task found </span>
                </div>
            )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 hover:bg-secondary cursor-pointer"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm">{task.name}</span>
                <span className="text-xs text-muted-foreground">
                  {task.project.name}
                </span>
              </div>
              <div className="flex items-center gap-1 justify-between">
                <Badge
                  variant={'outline'}
                  className="text-muted-foreground text-xs sm:min-w-[100px] min-w-5 px-1.5 flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  {taskIcon(task.status)}
                </Badge>
                <Badge
                  className="border-none"
                  variant={'outline'}
                >
                  {priorityIcon(task.priority)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default AssignedTasks;
