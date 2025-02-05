'use server'

import { db } from '../drizzle';
import { desc, and, eq, } from 'drizzle-orm';
import { users, blogPosts } from '../schema';
import { getUser } from './users';


export async function getAllBlogPosts() {
  return await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      content: blogPosts.content,
      createdAt: blogPosts.createdAt,
      authorName: users.name,
    })
    .from(blogPosts)
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(desc(blogPosts.createdAt));
}

export async function getBlogPostById(postId: string) {
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

export async function createBlogPost(title: string, content: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db.insert(blogPosts).values({
    title,
    content,
    authorId: user.id,
  })
}

export async function updateBlogPost(postId: string, title: string, content: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db.update(blogPosts).set({
    title,
    content,
  }).where(eq(blogPosts.id, postId));
}

export async function deleteBlogPost(postId: string) {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db.delete(blogPosts).where(and(eq(blogPosts.id, postId), eq(blogPosts.authorId, user.id)));
}