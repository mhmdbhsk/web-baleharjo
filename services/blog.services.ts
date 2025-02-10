

import { z } from 'zod';

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  image: z.string(),
  blurhash: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export async function getBlogPosts({ page, limit }: { page?: number; limit?: number }) {
  const res = await fetch(`/api/blog?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

export async function getBlogPostBySlug(slug: string) {
  const res = await fetch(`/api/blog/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch blog post');
  return res.json();
}

export async function createBlogPost(data: Partial<BlogPost>) {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create blog post');
  return res.json();
}

export async function updateBlogPost(slug: string, data: Partial<BlogPost>) {
  const res = await fetch(`/api/blog/${slug}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update blog post');
  return res.json();
}

export async function deleteBlogPost(slug: string) {
  const res = await fetch(`/api/blog/${slug}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete blog post');
  return res.json();
}