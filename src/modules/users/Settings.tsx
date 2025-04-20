import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UserProfileForm,
  userProfileSchema,
} from './validation/userProfileSchema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Bell,
  PanelLeft,
  PanelRight,
  Clock,
  Lock,
  Shield, BlocksIcon,
} from 'lucide-react';
import { useSettingsStore } from './store/user.store';
import { useUpdateUserProfile } from './hooks/useUserProfile';
import { useEffect } from 'react';
import {Loader} from '@/components/Loader'
import {useUserData} from "@/hooks/use-user.tsx";
import {getInitialsFromName} from "@/lib/utils.ts";
import calendar from '@/assets/g-calendar.svg'


const Settings = () => {
  const { position, setPosition } = useSettingsStore();
  const { data: userProfile,isLoading } = useUserData();
  const updateUser = useUpdateUserProfile();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UserProfileForm>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: userProfile?.name,
      email: userProfile?.email,
      preference: userProfile?.preference,
    },
  });
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name,
        email: userProfile.email,
        preference: userProfile.preference,
      });
    }
  }, [userProfile, reset]);

  const onSubmit = async (formData: UserProfileForm) => {
    updateUser.mutate(formData);
  };
  if (isLoading){
    return (
        <Loader/>
    )
  }else {
    return (
        <section className="w-full px-4 sm:container sm:mx-auto py-4 sm:py-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-lg  font-medium mb-1">Settings</h1>
              <p className="text-muted-foreground text-sm">
                Manage your account settings and project preferences
              </p>
            </div>
          </div>

          <Tabs
              defaultValue="profile"
              className="w-full"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto inline-flex sm:grid sm:grid-cols-2 md:grid-cols-5 lg:w-3/4">
                <TabsTrigger
                    value="profile"
                    className="flex w-full items-center gap-1 sm:gap-2 text-xs"
                >
                  <User
                      size={16}
                      className="sm:size-4"
                  />
                  <span className="md:inline hidden ">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                    value="appearance"
                    className="flex w-full items-center gap-1 sm:gap-2 text-xs"
                >
                  <PanelLeft
                      size={16}
                      className="sm:size-4"
                  />
                  <span className="md:inline hidden">Appearance</span>
                </TabsTrigger>
                <TabsTrigger
                    value="notifications"
                    className="flex w-full items-center gap-1 sm:gap-2 text-xs"
                >
                  <Bell
                      size={16}
                      className="sm:size-4"
                  />
                  <span className="md:inline hidden">Notifications</span>
                </TabsTrigger>
                <TabsTrigger
                    value="preferences"
                    className="flex w-full items-center gap-1 sm:gap-2 text-xs"
                >
                  <Clock
                      size={16}
                      className="sm:size-4"
                  />
                  <span className="md:inline hidden">Preferences</span>
                </TabsTrigger>
                <TabsTrigger
                    value="integrations"
                    className="flex w-full items-center gap-1 sm:gap-2 text-xs"
                >
                  <BlocksIcon size={16} />
                  <span className="md:inline hidden">Integration</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid gap-4 sm:gap-6 relative">
                <Card className="shadow-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      User Profile
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Update your personal information and avatar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                          <AvatarImage
                              src="/api/placeholder/100/100"
                              alt="Profile"
                          />
                          <AvatarFallback>{getInitialsFromName(userProfile?.name)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 text-center sm:text-left">
                          <Button
                              type="button"
                              variant="outline"
                              size="sm"
                          >
                            Change Avatar
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, GIF or PNG. 1MB max.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                              htmlFor="full-name"
                              className="text-xs sm:text-sm"
                          >
                            Full Name
                          </Label>
                          <Input
                              id="full-name"
                              defaultValue={userProfile?.name}
                              className="text-xs sm:text-sm"
                              {...register('name')}
                          />
                          {errors.name && (
                              <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.name.message}
                              </p>
                          )}
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                              htmlFor="display-name"
                              className="text-xs sm:text-sm"
                          >
                            Work Preference
                          </Label>
                          <Select
                              defaultValue={userProfile?.preference}
                              {...register('preference')}
                              onValueChange={(value) => {
                                setValue(
                                    'preference',
                                    value as UserProfileForm['preference'],
                                );
                              }}
                          >
                            <SelectTrigger>
                              <SelectValue
                                  placeholder={`${
                                      userProfile?.preference
                                          ? userProfile?.preference
                                          : 'Select Preference'
                                  } `}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MORNING">MORNING</SelectItem>
                              <SelectItem value="AFTERNOON">AFTERNOON</SelectItem>
                              <SelectItem value="NIGHT">NIGHT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                              htmlFor="email"
                              className="text-xs sm:text-sm"
                          >
                            Email
                          </Label>
                          <Input
                              id="email"
                              type="email"
                              defaultValue={userProfile?.email}
                              className="text-xs sm:text-sm"
                              {...register('email')}
                          />
                          {errors.email && (
                              <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.email.message}
                              </p>
                          )}
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <Label
                              htmlFor="role"
                              className="text-xs sm:text-sm"
                          >
                            Role
                          </Label>
                          <Input
                              id="role"
                              defaultValue="Project Manager"
                              readOnly
                              className="text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label
                            htmlFor="bio"
                            className="text-xs sm:text-sm"
                        >
                          Bio
                        </Label>
                        <textarea
                            id="bio"
                            className="w-full min-h-16 sm:min-h-20 p-2 rounded-md border border-input bg-background text-xs sm:text-sm"
                            defaultValue="Project manager with 5+ years of experience in software development teams."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                            type="submit"
                            size="sm"
                            className="text-xs sm:text-sm absolute top-5"
                            disabled={!isDirty}
                        >
                          Save Profile
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <div className="grid gap-4 sm:gap-6">
                <Card className="shadow-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Theme</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Customize your interface theme preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col justify-between flex-wrap">
                      <div className="mb-4">
                        <h4 className="text-sm sm:text-base font-medium">
                          Color Mode
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Switch between light and dark mode
                        </p>
                      </div>
                      <ModeToggle />
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="text-sm sm:text-base font-medium mb-2">
                          Accent Color
                        </h4>
                        <div className="flex gap-2">
                          {[
                            'bg-blue-500',
                            'bg-purple-500',
                            'bg-green-500',
                            'bg-orange-500',
                            'bg-red-500',
                          ].map((color) => (
                              <div
                                  key={color}
                                  className={`${color} w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer ring-offset-2 hover:ring-2 hover:ring-ring`}
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Layout</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Configure your workspace layout preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="text-sm sm:text-base font-medium">
                          Sidebar Position
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3 sm:mb-4">
                          Choose where the navigation sidebar appears
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                          <div className="flex flex-col items-center">
                            <div
                                onClick={() => setPosition('left')}
                                className={`${
                                    position == 'left'
                                        ? 'ring-1 ring-muted-foreground ring-offset-1 bg-accent'
                                        : ''
                                }  border p-2 sm:p-4 rounded-md cursor-pointer  flex items-center justify-center mb-2`}
                            >
                              <PanelLeft
                                  size={20}
                                  className="sm:size-4"
                              />
                            </div>
                            <span className="text-xs sm:text-sm">Left</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div
                                onClick={() => setPosition('right')}
                                className={`${
                                    position == 'right'
                                        ? 'ring-1 ring-muted-foreground ring-offset-1 bg-accent '
                                        : ''
                                }  border p-2 sm:p-4 rounded-md cursor-pointer  flex items-center justify-center mb-2`}
                            >
                              <PanelRight
                                  size={18}
                                  className="sm:size-4"
                              />
                            </div>
                            <span className="text-xs sm:text-sm">Right</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm sm:text-base font-medium">
                              Compact Mode
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Reduce spacing for a denser layout
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="shadow-none">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg">
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-medium">
                      Email Notifications
                    </h4>
                    {[
                      {
                        title: 'Project updates',
                        description:
                            'When a project status changes or updates are made',
                      },
                      {
                        title: 'Task assignments',
                        description: "When you're assigned a new task",
                      },
                      {
                        title: 'Comments',
                        description: 'When someone comments on your tasks',
                      },
                      {
                        title: 'Due date reminders',
                        description: 'Upcoming and overdue task reminders',
                      },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <div>
                            <h5 className="text-xs sm:text-sm font-medium">
                              {item.title}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch />
                        </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base font-medium">
                      In-App Notifications
                    </h4>
                    {[
                      {
                        title: 'Real-time updates',
                        description: 'Show notifications for project activities',
                      },
                      {
                        title: 'Sound alerts',
                        description: 'Play sound when notifications arrive',
                      },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <div>
                            <h5 className="text-xs sm:text-sm font-medium">
                              {item.title}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch defaultChecked={i === 0} />
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <div className="grid gap-4 sm:gap-6">
                <Card className="shadow-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      Project Preferences
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Customize your project management experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label
                            htmlFor="default-view"
                            className="text-xs sm:text-sm"
                        >
                          Default Project View
                        </Label>
                        <Select defaultValue="board">
                          <SelectTrigger
                              id="default-view"
                              className="text-xs sm:text-sm"
                          >
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                                value="board"
                                className="text-xs sm:text-sm"
                            >
                              Kanban Board
                            </SelectItem>
                            <SelectItem
                                value="list"
                                className="text-xs sm:text-sm"
                            >
                              List View
                            </SelectItem>
                            <SelectItem
                                value="calendar"
                                className="text-xs sm:text-sm"
                            >
                              Calendar
                            </SelectItem>
                            <SelectItem
                                value="gantt"
                                className="text-xs sm:text-sm"
                            >
                              Gantt Chart
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label
                            htmlFor="date-format"
                            className="text-xs sm:text-sm"
                        >
                          Date Format
                        </Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger
                              id="date-format"
                              className="text-xs sm:text-sm"
                          >
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                                value="mdy"
                                className="text-xs sm:text-sm"
                            >
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem
                                value="dmy"
                                className="text-xs sm:text-sm"
                            >
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem
                                value="ymd"
                                className="text-xs sm:text-sm"
                            >
                              YYYY-MM-DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <Label
                            htmlFor="time-format"
                            className="text-xs sm:text-sm"
                        >
                          Time Format
                        </Label>
                        <Select defaultValue="12h">
                          <SelectTrigger
                              id="time-format"
                              className="text-xs sm:text-sm"
                          >
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                                value="12h"
                                className="text-xs sm:text-sm"
                            >
                              12-hour (1:30 PM)
                            </SelectItem>
                            <SelectItem
                                value="24h"
                                className="text-xs sm:text-sm"
                            >
                              24-hour (13:30)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium">
                              Auto-save changes
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Automatically save edits as you work
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-none">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      Task Preferences
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Configure task management behaviors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label
                            htmlFor="start-week"
                            className="text-xs sm:text-sm"
                        >
                          First Day of Week
                        </Label>
                        <Select defaultValue="monday">
                          <SelectTrigger
                              id="start-week"
                              className="text-xs sm:text-sm"
                          >
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                                value="sunday"
                                className="text-xs sm:text-sm"
                            >
                              Sunday
                            </SelectItem>
                            <SelectItem
                                value="monday"
                                className="text-xs sm:text-sm"
                            >
                              Monday
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium">
                              Show completed tasks
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Display completed tasks in project views
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium">
                              Task templates
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Enable task templates for quick creation
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integrations">
              <div className="grid gap-2">
                <Card className="shadow-none">
                  <CardHeader className="p-2 sm:p-3">
                    <CardTitle className="text-base sm:text-lg">
                      Integrations
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Manage your account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2">

                      <div className="">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className='flex  items-center'>
                              <img src={calendar} width={50} height={50} alt='calendar' />
                              <h4 className="text-xs sm:text-sm font-medium">Google Calendar</h4>
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>

                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
    )
  }

};

export default Settings;
