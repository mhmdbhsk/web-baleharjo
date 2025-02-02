import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { potential } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .select()
      .from(potential)
      .where(eq(potential.id, params.id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'Potential not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Potential fetched successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch potential',
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
      .update(potential)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(potential.id, params.id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Potential not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Potential updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update potential',
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
      .delete(potential)
      .where(eq(potential.id, params.id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Potential not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Potential deleted successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete potential',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}