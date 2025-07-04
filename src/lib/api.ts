import { useAuthStore } from '@/modules/auth/store/auth.store';
import axios from 'axios';

const BASE_API = import.meta.env.VITE_BASE_API;

export const apiClient = axios.create({
  baseURL: `${BASE_API}/`,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//refresh

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.data.error == 'TokenExpiredError' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${BASE_API}/users/refresh`,
          {},
          { withCredentials: true },
        );

        useAuthStore.getState().setAuth(undefined!, res.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        console.log(err);

        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
