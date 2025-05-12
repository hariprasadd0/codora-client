import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import logo from './assets/codora.svg';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useLogin } from './api/authApi';
import { useAuthStore } from './store/auth.store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './validation/schema';
import { LoginForm } from './validation/schema';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { setUser, user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  const onSubmit = (data: LoginForm) => {
    login(data, {
      onSuccess(data) {
        setUser(data.loggedUser, data.accessToken);
        navigate('/dashboard', { replace: true });
      },
      onError: (error: any) => {
        if (error?.response?.status === 401) {
          toast.error('We couldn’t find your account on Codora.', {
            style: {
              background: 'red',
              color: 'white',
              border: 'none',
            },
          });
        } else {
          toast.warning('Something went wrong. Try again later!.', {
            style: {
              background: 'orange',
              color: 'white',
              border: 'none',
            },
          });

        }
      },
    });
    reset();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className="w-11 h-11 rounded-none">
          <AvatarImage
            className="rounded-[10px]"
            src={logo}
          />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <CardTitle>Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to login
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-sm"
                id="email"
                placeholder="john.doe@example.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                className="text-sm"
                id="password"
                placeholder="Enter your password"
                type="password"
                passwordToggle
                {...register('password')}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
              <span className="flex items-center justify-end p-0">
                <NavLink
                  className="text-muted-foreground text-sm"
                  to="/forgot-password"
                >
                  Forgot password?
                </NavLink>
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-10 my-4   relative inline-flex items-center justify-center gap-x-1.5 overflow-hidden
    rounded-md px-3 py-1.5
    shadow-[inset_0_0.75px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.4),0_0_0_1px_#18181b]
    transition-colors duration-150 ease-in-out
    outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3b82f6]
    hover:bg-[#3f3f46]
    active:bg-[#52525b]"
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <CardFooter className="flex flex-col items-center gap-4 overflow-hidden w-full p-0">
          <span className="w-full flex items-center gap-2 justify-center text-muted-foreground">
            <Separator />
            or
            <Separator />
          </span>
          <Button
            className="w-full h-10 text-muted-foreground display-flex items-center justify-center gap-2"
            variant="outline"
          >
            <FcGoogle style={{ width: '20px', height: '20px' }} /> Login with
            Google
          </Button>
          <p className="text-muted-foreground text-sm">
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Login;
