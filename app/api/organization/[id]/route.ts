import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { organizationMembers } from '@/db/schema';
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
      .from(organizationMembers)
      .where(eq(organizationMembers.id, id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'Organization member not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Organization member fetched successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch organization member',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const body = await request.json();
    const result = await db
      .update(organizationMembers)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(organizationMembers.id, id))
      .returning();

    if (!result[0]) {
      return NextResponse.json({
        message: 'Organization member not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Organization member updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update organization member',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await params
  try {
    const result = await db
      .delete(organizationMembers)
      .where(eq(organizationMembers.id, id))
      .returning();

    if (!result) {
      return NextResponse.json({
        message: 'Organization member not found',
        error: 'Not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Organization member deleted successfully',
      data: result
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete organization member',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}