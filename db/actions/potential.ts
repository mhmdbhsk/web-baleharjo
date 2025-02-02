import { db } from '../drizzle';
import { desc, eq } from 'drizzle-orm';
import { potential } from '../schema';
import { UserService } from './users';

export class PotentialService {
  static async getAll() {
    return await db
      .select()
      .from(potential)
      .orderBy(desc(potential.createdAt));
  }

  static async getById(id: string) {
    const result = await db
      .select()
      .from(potential)
      .where(eq(potential.id, id))
      .limit(1);

    return result[0] || null;
  }

  static async create(data: {
    title: string;
    description: string;
    category: string;
    image?: string;
    blurhash?: string;
  }) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.insert(potential).values(data);
  }

  static async update(id: string, data: Partial<typeof potential.$inferInsert>) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db
      .update(potential)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(potential.id, id));
  }

  static async delete(id: string) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.delete(potential).where(eq(potential.id, id));
  }
}