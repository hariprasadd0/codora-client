import { apiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PasswordReset } from '../validation/schema';
import {useAuthStore} from "@/modules/auth/store/auth.store.ts";

type LoginCredentials = {
  email: string;
  password: string;
};
type NewPassword = {
  token: string;
  newPassword: string;
};

const userQueryKey = ['user'] as const;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const {setAuth} = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('users/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.loggedUser);
      setAuth(data.loggedUser,data.accessToken)
    },
  });
};

export const useLogout = () => {
 const logoutUser = useAuthStore((state)=> state.clearAuth)
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
        await apiClient.post('users/logout');
    },
    onSuccess: async() => {
     logoutUser();
     queryClient.setQueryData(userQueryKey, null);
      await queryClient.invalidateQueries({queryKey:userQueryKey}) ;
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const {setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('users/register', credentials);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      setAuth(data.user,data.accessToken)

    },
  });
};

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: async (email: PasswordReset) => {
      const response = await apiClient.post('users/request-reset', email);

      return response.data;
    },
  });
};

export const usePasswordCreation = () => {
  return useMutation({
    mutationFn: async (data: NewPassword) => {
      const response = await apiClient.post('users/reset-password', data);

      return response.data;
    },
  });
};
