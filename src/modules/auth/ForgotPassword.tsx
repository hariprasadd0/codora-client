import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import logo from './assets/codora.svg';
import { useForm } from 'react-hook-form';
import { PasswordReset, passwordResetSchema } from './validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePasswordReset } from './api/authApi';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const {
    mutate: passReset,
    isError,
    isPending,
    isSuccess,
  } = usePasswordReset();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordReset>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = (data: PasswordReset) => {
    passReset(data, {
      onSuccess() {},
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast.error('We couldn’t find your account on Codora.', {
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
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar className=" w-11 h-11 rounded-none self-start">
          <AvatarImage
            className="rounded-[10px]"
            src={logo}
          />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 p-0 ">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to reset your password
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
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
          </div>
          <Button
            disabled={isPending}
            className="w-full h-10 my-4"
          >
            {isPending ? 'Sending Reset Link ' : 'Send Reset Link'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center  overflow-hidden">
        {isSuccess && (
          <p className="text-muted-foreground text-sm">
            A reset link has been sent to your email.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
