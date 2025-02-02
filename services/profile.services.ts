import { Profile } from '@/db/schema';
import { ApiResponse } from '@/types/api';

export const getProfile = async (
): Promise<ApiResponse<Profile>> => {
  const res = await fetch(
    `/api/profile`,
  );
  const data = await res.json();
  return data;
};

export const updateProfile = async (
  profile: Partial<Profile>,
): Promise<ApiResponse<Profile>> => {
  const res = await fetch(
    `/api/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    },
  );
  const data = await res.json();
  return data;
};
