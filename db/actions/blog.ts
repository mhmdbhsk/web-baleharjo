import { db } from '../drizzle';
import { desc, and, eq } from 'drizzle-orm';
import { users, blogPosts } from '../schema';
import { UserService } from './users';

export class BlogService {
  static async getAllBlogPosts() {
    return await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        content: blogPosts.content,
        excerpt: blogPosts.excerpt,
        coverImage: blogPosts.coverImage,
        blurhash: blogPosts.blurhash,
        isHighlighted: blogPosts.isHighlighted,
        slug: blogPosts.slug,
        createdAt: blogPosts.createdAt,
        authorName: users.name,
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .orderBy(desc(blogPosts.createdAt));
  }

  static async getBlogPostById(postId: string) {
    const result = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        content: blogPosts.content,
        createdAt: blogPosts.createdAt,
        authorName: users.name,
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(eq(blogPosts.id, postId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  static async createBlogPost(
    title: string,
    content: string,
    slug: string,
    excerpt: string,
    blurhash: string,
    coverImage: string,
    isHighlighted: boolean
  ) {
    const user = await UserService.getCurrentUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    return await db.insert(blogPosts).values({
      title,
      content,
      slug,
      excerpt,
      blurhash,
      coverImage,
      isHighlighted: isHighlighted ? "1" : "0",
      authorId: user.id,
    });
  }

  static async updateBlogPost(postId: string, title: string, content: string) {
    const user = await UserService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await db
      .update(blogPosts)
      .set({
        title,
        content,
      })
      .where(eq(blogPosts.id, postId));
  }

  static async deleteBlogPost(postId: string) {
    const user = await UserService.getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    return await db
      .delete(blogPosts)
      .where(
        and(
          eq(blogPosts.id, postId),
          eq(blogPosts.authorId, user.id)
        )
      );
  }
}