
import { db } from '../drizzle';
import { desc, eq } from 'drizzle-orm';
import { activity } from '../schema';
import { UserService } from './users';
import { revalidatePath } from 'next/cache';

export class ActivityService {
  static async getAll() {
    try {
      const activities = await db
        .select()
        .from(activity)
        .orderBy(desc(activity.date));

      return { data: activities };
    } catch (error) {
      return { error: 'Failed to fetch activities' };
    }
  }

  static async getById(id: string) {
    try {
      const result = await db
        .select()
        .from(activity)
        .where(eq(activity.id, id))
        .limit(1);

      return { data: result[0] || null };
    } catch (error) {
      return { error: 'Failed to fetch activity' };
    }
  }

  static async create(data: {
    title: string;
    description: string;
    date: Date;
    location: string;
    image?: string;
    blurhash?: string;
  }) {
    try {
      const user = await UserService.getCurrentUser();
      if (!user) return { error: 'Unauthorized' };

      const result = await db.insert(activity).values(data);
      revalidatePath('/dasbor/kegiatan');
      return { data: result };
    } catch (error) {
      return { error: 'Failed to create activity' };
    }
  }

  static async update(id: string, data: Partial<typeof activity.$inferInsert>) {
    try {
      const user = await UserService.getCurrentUser();
      if (!user) return { error: 'Unauthorized' };

      const result = await db
        .update(activity)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(activity.id, id));

      revalidatePath('/dasbor/kegiatan');
      return { data: result };
    } catch (error) {
      return { error: 'Failed to update activity' };
    }
  }

  static async delete(id: string) {
    try {
      const user = await UserService.getCurrentUser();
      if (!user) return { error: 'Unauthorized' };

      const result = await db.delete(activity).where(eq(activity.id, id));
      revalidatePath('/dasbor/kegiatan');
      return { data: result };
    } catch (error) {
      return { error: 'Failed to delete activity' };
    }
  }
}