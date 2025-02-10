import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { institutional } from '@/db/schema';
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
      .from(institutional)
      .where(eq(institutional.id, id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'Institution not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Institution fetched successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch institution',
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
    const body = await request.json();
    const result = await db
      .update(institutional)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(institutional.id, id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Institution not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Institution updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update institution',
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
      .delete(institutional)
      .where(eq(institutional.id, id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Institution not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Institution deleted successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete institution',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}