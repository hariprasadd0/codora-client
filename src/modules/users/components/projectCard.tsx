import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder } from 'lucide-react';
import type { Project } from '@/types/types.ts'
import {useNavigate} from "react-router-dom";

interface ProjectCardProps {
  projects: Project[];
}

const ProjectCard = ({ projects }: ProjectCardProps) => {
    const navigate = useNavigate();
    return (
    <Card className="rounded-md shadow-none border overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center p-3 bg-[#FAFAFA] dark:bg-transparent border-b ">
        <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
          <Folder className="w-4 h-4 " /> Projects
        </CardTitle>
        <Button
            onClick={() => { navigate('/projects'); }}
          variant="ghost"
          className="text-xs text-gray-500 shadow-none hover:bg-secondary"
        >
          Show All
        </Button>
      </CardHeader>
      <CardContent className="p-0 ">
        <div className="divide-y divide-muted flex">
          {projects.length === 0 && (
            <div className="p-4 text-muted-foreground text-sm w-full h-full translate-x-1/3 translate-y-16">
              <span>No projects found </span>
            </div>
          )}
          {projects.map((project) => (
            <div
              onClick={() => navigate(`/projects/${project.id}`)}
              key={project.id}
              className="p-4 cursor-pointer flex items-center"
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Folder className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-medium text-xs">{project.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
