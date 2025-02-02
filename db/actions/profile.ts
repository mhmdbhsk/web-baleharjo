import { db } from '../drizzle';
import { eq } from 'drizzle-orm';
import { profile } from '../schema';
import { UserService } from './users';

export class ProfileService {
  static async get() {
    const result = await db
      .select()
      .from(profile)
      .limit(1);

    return result[0] || null;
  }

  static async update(data: Partial<typeof profile.$inferInsert>) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const existing = await this.get();
    if (!existing) {
      // For insert, we need to ensure required fields are present
      if (!data.title || !data.description) {
        throw new Error('Title and description are required fields');
      }

      const insertData = {
        title: data.title,
        description: data.description,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return await db.insert(profile).values(insertData);
    }

    // For update, we only update the fields that are provided
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    return await db
      .update(profile)
      .set(updateData)
      .where(eq(profile.id, existing.id));
  }
}