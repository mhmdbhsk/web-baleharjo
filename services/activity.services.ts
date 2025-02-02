import { Activity } from '@/db/schema';
import { ApiResponse } from '@/types/api';

export async function getActivities(page = 1, limit = 10): Promise<ApiResponse<Activity[]>> {
  const response = await fetch(`/api/activities?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch activities');
  return response.json();
}

export async function getActivity(id: string): Promise<ApiResponse<Activity>> {
  const response = await fetch(`/api/activities/${id}`);
  if (!response.ok) throw new Error('Failed to fetch activity');
  return response.json();
}

export async function createActivity(data: ActivityDto): Promise<ApiResponse<Activity>> {
  const response = await fetch('/api/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create activity');
  return response.json();
}

export async function updateActivity(
  id: string,
  data: Partial<ActivityDto>
): Promise<ApiResponse<Activity>> {
  const response = await fetch(`/api/activities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update activity');
  return response.json();
}

export async function deleteActivity(id: string): Promise<ApiResponse<Activity>> {
  const response = await fetch(`/api/activities/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete activity');
  return response.json();
}