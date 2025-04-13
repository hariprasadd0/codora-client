import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import logo from './assets/codora.svg';
import { useForm } from 'react-hook-form';
import { PasswordCreation, newPasswordSchema } from './validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePasswordCreation } from './api/authApi';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const CreateNewPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const {
    mutate: createPassword,
    isPending,
    isSuccess,
  } = usePasswordCreation();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordCreation>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data: PasswordCreation) => {
    if (!token) {
      toast.error('Invalid token. Please try again.');
      return;
    }
    const payload = {
      token: token,
      newPassword: data.password,
    };
    createPassword(payload, {
      onSuccess() {
        toast.success('Password successfully created!');
      },
      onError: () => {
        toast.error('Something went wrong. Try again later!');
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
          <CardTitle>Create New Password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter and confirm your new password
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                className="text-sm"
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                className="text-sm"
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <Button
            disabled={isPending}
            className="w-full h-10 my-4"
          >
            {isPending ? 'Creating Password...' : 'Create Password'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center overflow-hidden">
        {isSuccess && (
          <p className="text-muted-foreground text-sm">
            Your password has been successfully created.
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateNewPassword;
