import { createBlogPost, updateBlogPost } from '@/lib/db/actions/blog';
import { NextApiRequest, NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { title, content } = await req.json()

  try {
    await createBlogPost(title, content);

    return NextResponse.json({
      message: 'Blog post created'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
};

export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;
  const postId = req.query.id;

  if (!title || !content) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  if (!postId) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  await updateBlogPost(postId as string, title, content);

  res.status(200).json({ message: 'Blog post updated' });
}

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}; 