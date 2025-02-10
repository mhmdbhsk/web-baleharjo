import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const result = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'Blog post not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Blog post fetched successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch blog post',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const body = await request
      .json();
    const result = await db
      .update(blogPosts)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Blog post not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Blog post updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update blog post',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const result = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Blog post not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete blog post',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}