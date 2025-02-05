import { createActivityLog } from '@/services/activity-log.services';
import { ActivityType } from '@/db/schema';

export async function logActivity(
  action: ActivityType,
  userId?: string,
  ipAddress?: string
) {
  try {
    await createActivityLog({
      action,
      userId,
      ipAddress,
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}