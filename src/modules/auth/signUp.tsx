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
import { useSignUp } from './api/authApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, SignUpForm } from './validation/schema';
import { useAuthStore } from './store/auth.store';
import { toast } from 'sonner';

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useSignUp();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(registerSchema),
  });

  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  const onSubmit = (data: SignUpForm) => {
    signup(data, {
      onSuccess() {
        navigate('/dashboard', { replace: true });
      },
      onError(error: any) {
        if (error.response?.status === 401) {
          toast.error('Account Already Exists.', {
            style: {
              background: 'red',
              color: 'white',
              border: 'none',
            },
          });
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      },
    });
    reset();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className=" w-11 h-11 rounded-none">
          <AvatarImage
            className="rounded-[10px]"
            src={logo}
          />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription className="text-muted-foreground">
            Create an account to get started
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">username</Label>
              <Input
                className="text-sm"
                id="name"
                placeholder="john"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
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
                placeholder="Enter a password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-10 mt-4"
          >
            Create an account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 overflow-hidden">
        <span className="w-full flex items-center gap-2 justify-center text-muted-foreground">
          <Separator />
          or
          <Separator />
        </span>
        <Button
          className="w-full h-10 text-muted-foreground display-flex items-center justify-center gap-2"
          variant="outline"
        >
          <FcGoogle style={{ width: '20px', height: '20px' }} /> Sign up with
          Google
        </Button>
        <p className="text-muted-foreground text-sm">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
