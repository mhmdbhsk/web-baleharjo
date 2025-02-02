import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { socialMedia } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .select()
      .from(socialMedia)
      .where(eq(socialMedia.id, params.id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'Social media account not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Social media account fetched successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch social media account',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await db
      .update(socialMedia)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(socialMedia.id, params.id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Social media account not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Social media account updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update social media account',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .delete(socialMedia)
      .where(eq(socialMedia.id, params.id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Social media account not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Social media account deleted successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete social media account',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}