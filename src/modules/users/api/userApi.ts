import { apiClient } from '@/lib/api';
import { UserProfileForm } from '../validation/userProfileSchema';

export const fetchUserProfile = async (
  id: string,
): Promise<UserProfileForm> => {
  const response = await apiClient.get(`users/${id}`);
  return response.data;
};

export const updateUserProfile = async (data: Partial<UserProfileForm>) => {
  const response = await apiClient.patch(`users/me`, data);

  return response.data;
};

export const getRecentActivity = async ()=>{
    const response = await apiClient.get('users/recent')
    return response.data;
}