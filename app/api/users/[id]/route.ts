import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt
      })
      .from(users)
      .where(eq(users.id, params.id))
      .limit(1);

    if (!result[0]) {
      return NextResponse.json({
        message: 'User not found',
        error: 'Not found'
      }, { status: 404 });
    }

    const user = result[0];

    return NextResponse.json({
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch user',
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
      .update(users)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(users.id, params.id))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt
      });

    if (!result[0]) {
      return NextResponse.json({
        message: 'User not found',
        error: 'Not found'
      }, { status: 404 });
    }

    const user = result[0];

    return NextResponse.json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update user',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const user = await db
      .update(users)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(users.id, params.id))
      .returning();

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await db
      .update(users)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.id, params.id))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        deletedAt: users.deletedAt
      });

    if (!result[0]) {
      return NextResponse.json({
        message: 'User not found',
        error: 'Not found'
      }, { status: 404 });
    }

    const user = result[0];

    return NextResponse.json({
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete user',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}