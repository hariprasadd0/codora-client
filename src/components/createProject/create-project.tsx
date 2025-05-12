import React, { ReactNode, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Calendar as CalendarIcon, Users, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCreateProject } from '@/modules/projects/hooks/useProjects';
import { CreateProjectFormValues } from './types';
import { toggleMember } from './utils';
import {getInitialsFromName} from "@/lib/utils.ts";

interface Props {
  trigger?: ReactNode;
}

const NewProjectDialog = ({ trigger }: Props) => {
  const isDesktop = useIsMobile();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('basic');
  const { mutate, isSuccess } = useCreateProject();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormValues>({
    defaultValues: {
      name: '',
      description: '',
      status: 'PENDING',
      priority: 'MEDIUM',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      teamId: undefined,
    },
  });

  const projectName = watch('name');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const [team, setTeam] = useState([
    { id: 1, name: 'You', avatar: '', initial: 'Y', selected: true },
    { id: 2, name: 'Alex Kim', avatar: '', initial: 'AK', selected: true },
    { id: 3, name: 'Taylor Moore', avatar: '', initial: 'TM', selected: true },
  ]);

  const statuses = [
    { value: 'PENDING', label: 'Planning', color: 'bg-blue-500' },
    { value: 'IN-PROGRESS', label: 'In Progress', color: 'bg-amber-500' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-green-500' },
    { value: 'DELAYED', label: 'Delayed', color: 'bg-gray-500' },
  ];

  const priorities = [
    { value: 'LOW', label: 'Low', color: 'bg-slate-500' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-amber-500' },
    { value: 'HIGH', label: 'High', color: 'bg-red-500' },
  ];

  const onSubmit = (data: CreateProjectFormValues) => {
    console.log('Form data:', data);
    mutate(data);
    setOpen(false);
  };

  if (!isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          {trigger || (
            <Button className="text-xs h-9 border border-gray-300">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 gap-0  border rounded-xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <DialogHeader className="p-6 ">
                <DialogTitle className="text-lg font-medium">
                  Create New Project
                </DialogTitle>
                <DialogDescription className="text-sm opacity-75">
                  Get started with a new project in your workspace
                </DialogDescription>
              </DialogHeader>

              <Tabs
                defaultValue="basic"
                className="w-full"
                value={selectedTab}
                onValueChange={setSelectedTab}
              >
                <div className="px-6">
                  <TabsList className="w-full grid grid-cols-3 mb-2">
                    <TabsTrigger
                      value="basic"
                      className="text-xs"
                    >
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="team"
                      className="text-xs"
                    >
                      Choose a Team
                    </TabsTrigger>
                    <TabsTrigger
                      value="dates"
                      className="text-xs"
                    >
                      Timeline
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 pt-4 pb-8">
                  <TabsContent
                    value="basic"
                    className="mt-0 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getInitialsFromName(projectName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: 'Project name is required' }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="text-lg font-medium border-0 border-b border-dashed rounded-none px-0 pb-1 focus-visible:ring-0 focus-visible:border-b-black transition-colors"
                              type="text"
                              placeholder="Project Name"
                            />
                          )}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            className="min-h-24 max-h-40 text-sm focus-visible:ring-0"
                            placeholder="Describe what this project is about..."
                          />
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Status</Label>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statuses.map((statusOption) => (
                                  <SelectItem
                                    key={statusOption.value}
                                    value={statusOption.value}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-2 ${statusOption.color}`}
                                      ></div>
                                      {statusOption.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Priority</Label>
                        <Controller
                          name="priority"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {priorities.map((priorityOption) => (
                                  <SelectItem
                                    key={priorityOption.value}
                                    value={priorityOption.value}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-2 ${priorityOption.color}`}
                                      ></div>
                                      {priorityOption.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="team"
                    className="mt-0 space-y-4"
                  >
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Available Teams
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {team.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleMember(item.id, setTeam, team)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                              item.selected
                                ? 'bg-indigo-50 border-indigo-200'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback
                                className={`text-xs ${
                                  item.selected
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {item.initial}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{item.name}</span>
                            {item.selected && (
                              <Check className="h-4 w-4 text-indigo-500" />
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-muted-foreground text-xs mt-5">
                        skip this to continue without a team{' '}
                      </span>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="dates"
                    className="mt-0 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">
                          Start Date
                        </Label>
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal h-9"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
                                  {format(field.value || new Date(), 'PPP')}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    // Update end date to be at least after start date
                                    const currentEndDate = watch('endDate');
                                    if (
                                      date &&
                                      (!currentEndDate ||
                                        date > new Date(currentEndDate))
                                    ) {
                                      setValue(
                                        'endDate',
                                        new Date(
                                          date.getTime() +
                                            14 * 24 * 60 * 60 * 1000,
                                        ).toISOString(),
                                      );
                                    }
                                  }}
                                  initialFocus
                                  disabled={(date) => {
                                    const currentDate = new Date();
                                    currentDate.setHours(0, 0, 0, 0);
                                    return date < currentDate;
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">
                          Estimated End Date
                        </Label>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal h-9"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-red-500" />
                                  {format(field.value || new Date(), 'PPP')}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) => {
                                    const startDate = watch('startDate');
                                    // Disable dates before start date
                                    return startDate
                                      ? date < new Date(startDate)
                                      : false;
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Time Estimate (hours)
                      </Label>
                      <Controller
                        name="timeEstimate"
                        control={control}
                        rules={{
                          min: {
                            value: 0,
                            message: 'Value cannot be negative',
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            placeholder="0"
                            min="0"
                            className="h-9"
                          />
                        )}
                      />
                      {errors.timeEstimate && (
                        <p className="text-xs text-red-500">
                          {errors.timeEstimate.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <DialogFooter className="flex md:justify-between p-4 bg-muted/50 border-t">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="hidden md:flex items-center mr-4">
                  <Users className="w-4 h-4 mr-1 opacity-70" />
                  {team.filter((m) => m.selected).length > 1 ? (
                    <span>{team.filter((m) => m.selected).length} members</span>
                  ) : (
                    <span>{team.filter((m) => m.selected).length} member</span>
                  )}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1 opacity-70" />
                  <span>
                    {format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-9 text-xs font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-medium"
                >
                  Create Project
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>
          {trigger || (
            <Button className="text-xs">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-md md:max-w-lg lg:max-w-xl p-0 gap-0 overflow-hidden border shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col h-full">
              <DrawerHeader className="p-6 pb-4">
                <DialogTitle className="text-lg font-medium">
                  Create New Project
                </DialogTitle>
                <DialogDescription className="text-sm opacity-75">
                  Get started with a new project in your workspace
                </DialogDescription>
              </DrawerHeader>

              <Tabs
                defaultValue="basic"
                className="w-full"
                value={selectedTab}
                onValueChange={setSelectedTab}
              >
                <div className="px-6">
                  <TabsList className="w-full grid grid-cols-3 mb-2">
                    <TabsTrigger
                      value="basic"
                      className="text-xs"
                    >
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger
                      value="team"
                      className="text-xs"
                    >
                      Choose a Team
                    </TabsTrigger>
                    <TabsTrigger
                      value="dates"
                      className="text-xs"
                    >
                      Timeline
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 pt-4 pb-8">
                  <TabsContent
                    value="basic"
                    className="mt-0 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getInitialsFromName(projectName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <Controller
                          name="name"
                          control={control}
                          rules={{ required: 'Project name is required' }}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="text-lg font-medium border-0 border-b border-dashed rounded-none px-0 pb-1 focus-visible:ring-0 focus-visible:border-b-black transition-colors"
                              type="text"
                              placeholder="Project Name"
                            />
                          )}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            className="min-h-24 max-h-36 text-sm"
                            placeholder="Describe what this project is about..."
                          />
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Status</Label>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statuses.map((statusOption) => (
                                  <SelectItem
                                    key={statusOption.value}
                                    value={statusOption.value}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-2 ${statusOption.color}`}
                                      ></div>
                                      {statusOption.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Priority</Label>
                        <Controller
                          name="priority"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {priorities.map((priorityOption) => (
                                  <SelectItem
                                    key={priorityOption.value}
                                    value={priorityOption.value}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={`w-2 h-2 rounded-full mr-2 ${priorityOption.color}`}
                                      ></div>
                                      {priorityOption.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="team"
                    className="mt-0 space-y-4"
                  >
                    <div className="space-y-3">
                      <Label className="text-xs font-medium">Team</Label>
                      <div className="flex flex-wrap gap-2">
                        {team.map((member) => (
                          <div
                            key={member.id}
                            onClick={() =>
                              toggleMember(member.id, setTeam, team)
                            }
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                              member.selected
                                ? 'bg-primary/10 border-green-200'
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback
                                className={`text-xs ${
                                  member.selected
                                    ? ''
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {member.initial}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{member.name}</span>
                            {member.selected && (
                              <Check className="h-4 w-4 text-indigo-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="dates"
                    className="mt-0 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">
                          Start Date
                        </Label>
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal h-9"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(
                                    field.value
                                      ? new Date(field.value)
                                      : new Date(),
                                    'PPP',
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    // Update end date to be at least after start date
                                    const currentEndDate = watch('endDate');
                                    if (
                                      date &&
                                      (!currentEndDate ||
                                        date > new Date(currentEndDate))
                                    ) {
                                      setValue(
                                        'endDate',
                                        new Date(
                                          date.getTime() +
                                            14 * 24 * 60 * 60 * 1000,
                                        ).toISOString(),
                                      );
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">
                          Estimated End Date
                        </Label>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal h-9"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(field.value, 'PPP')}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) => {
                                    const startDate = watch('startDate');
                                    // Disable dates before start date
                                    return date < startDate;
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Time Estimate (hours)
                      </Label>
                      <Controller
                        name="timeEstimate"
                        control={control}
                        rules={{
                          min: {
                            value: 0,
                            message: 'Value cannot be negative',
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            placeholder="0"
                            min="0"
                            className="h-9"
                          />
                        )}
                      />
                      {errors.timeEstimate && (
                        <p className="text-xs text-red-500">
                          {errors.timeEstimate.message}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <DrawerFooter className="flex flex-row sm:justify-between justify-between p-4 bg-muted border-t">
              <div className="flex items-center text-sm text-gray-500">
                <div className="hidden md:flex items-center mr-4">
                  <Users className="w-4 h-4 mr-1 opacity-70" />
                  <span>{team.filter((m) => m.selected).length} members</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1 opacity-70" />
                  <span>
                    {format(startDate, 'MMM d')}- {format(endDate, 'MMM d')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-9 text-xs font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs font-medium"
                >
                  Create Project
                </Button>
              </div>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default NewProjectDialog;
