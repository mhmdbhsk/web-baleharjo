import { ActivityLog } from '@/db/schema';

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const response = await fetch('/api/activity-logs');
  return response.json();
}

export async function createActivityLog(data: {
  action: string;
  userId?: string;
  ipAddress?: string;
}) {
  const response = await fetch('/api/activity-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}