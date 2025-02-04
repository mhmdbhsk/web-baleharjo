import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { activity } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';
import { format, formatISO } from 'date-fns';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .select()
      .from(activity)
      .where(eq(activity.id, params.id))
      .limit(1);

    if (!result[0]) {
      const response: ApiResponse<null> = {
        message: 'Activity not found',
        error: 'Not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<typeof result[0]> = {
      message: 'Activity fetched successfully',
      data: result[0]
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      message: 'Failed to fetch activity',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const result = await db
      .update(activity)
      .set({
        ...body,
        date: formatISO(body.date),
        updatedAt: new Date()
      })
      .where(eq(activity.id, await params.id))
      .returning();

    if (!result[0]) {
      const response: ApiResponse<null> = {
        message: 'Activity not found',
        error: 'Not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<typeof result[0]> = {
      message: 'Activity updated successfully',
      data: result[0]
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      message: 'Failed to update activity',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .delete(activity)
      .where(eq(activity.id, params.id))
      .returning();

    if (!result[0]) {
      const response: ApiResponse<null> = {
        message: 'Activity not found',
        error: 'Not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<typeof result[0]> = {
      message: 'Activity deleted successfully',
      data: result[0]
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      message: 'Failed to delete activity',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return NextResponse.json(response, { status: 500 });
  }
}