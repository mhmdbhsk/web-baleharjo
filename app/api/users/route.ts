import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { desc, sql, isNull } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { hashPassword } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({
        message: 'Unauthorized access',
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [userList, totalCount] = await Promise.all([
      db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt
        })
        .from(users)
        .where(isNull(users.deletedAt))
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(isNull(users.deletedAt))
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Users fetched successfully',
      data: userList,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Hash password if provided
    const passwordHash = body.password ? await hashPassword(body.password) : undefined;

    const user = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
        role: body.role,
        passwordHash: passwordHash!, // Now required
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}