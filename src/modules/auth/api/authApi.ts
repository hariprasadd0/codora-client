import { apiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PasswordReset } from '../validation/schema';

type LoginCredentials = {
  email: string;
  password: string;
};
type NewPassword = {
  token: string;
  newPassword: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('users/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
        await apiClient.post('users/logout');
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries(['user']);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post('users/register', credentials);

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
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
