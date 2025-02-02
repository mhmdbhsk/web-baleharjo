import { db } from '../drizzle';
import { desc, eq } from 'drizzle-orm';
import { institutional } from '../schema';
import { UserService } from './users';

export class InstitutionalService {
  static async getAll() {
    return await db
      .select()
      .from(institutional)
      .orderBy(desc(institutional.createdAt));
  }

  static async getById(id: string) {
    const result = await db
      .select()
      .from(institutional)
      .where(eq(institutional.id, id))
      .limit(1);

    return result[0] || null;
  }

  static async create(data: {
    name: string;
    description: string;
    logo?: string;
    blurhash?: string;
  }) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.insert(institutional).values(data);
  }

  static async update(id: string, data: Partial<typeof institutional.$inferInsert>) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db
      .update(institutional)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(institutional.id, id));
  }

  static async delete(id: string) {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    return await db.delete(institutional).where(eq(institutional.id, id));
  }
}