
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { blogPosts } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [posts, totalCount] = await Promise.all([
      db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(blogPosts)
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Blog posts fetched successfully',
      data: posts,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch blog posts',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({
        message: 'Unauthorized access',
        error: 'Admin privileges required'
      }, { status: 401 });
    }

    const body = await request.json();
    const result = await db.insert(blogPosts).values(body);

    return NextResponse.json({
      message: 'Blog post created successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to create blog post',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;
  const postId = req.query.id;

  if (!title || !content) {
    return res.status(400).json({ error: 'Invalid body' });
  }

  if (!postId) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  res.status(200).json({ message: 'Blog post updated' });
}

export const handleMethodNotAllowed = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
