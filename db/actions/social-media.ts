import { db } from '../drizzle';
import { desc, eq } from 'drizzle-orm';
import { socialMedia } from '../schema';
import { UserService } from './users';

export class SocialMediaService {
  static async getAll() {
    return await db
      .select()
      .from(socialMedia)
      .orderBy(desc(socialMedia.createdAt));
  }

  static async getById(id: string) {
    const result = await db
      .select()
      .from(socialMedia)
      .where(eq(socialMedia.id, id))
      .limit(1);

    return result[0] || null;
  }

  static async create(data: {
    platform: string;
    url: string;
    icon?: string;
  }) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.insert(socialMedia).values(data);
  }

  static async update(id: string, data: Partial<typeof socialMedia.$inferInsert>) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db
      .update(socialMedia)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(socialMedia.id, id));
  }

  static async delete(id: string) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.delete(socialMedia).where(eq(socialMedia.id, id));
  }
}