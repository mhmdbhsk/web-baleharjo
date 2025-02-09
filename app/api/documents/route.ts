import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { documentRequests } from '@/db/schema';
import { desc, sql, eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = db.select().from(documentRequests);

    // Filter based on user role
    let whereClause;
    if (currentUser.role === 'RT') {
      whereClause = eq(documentRequests.rtId, currentUser.id);
    } else if (currentUser.role === 'RW') {
      whereClause = eq(documentRequests.rwId, currentUser.id);
    } else if (currentUser.role !== 'ADMIN') {
      whereClause = eq(documentRequests.userId, currentUser.id);
    }

    if (whereClause) {
      query = db.select().from(documentRequests).where(whereClause);
    }

    const [documents, totalCount] = await Promise.all([
      query
        .orderBy(desc(documentRequests.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(documentRequests)
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Documents fetched successfully',
      data: documents,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch documents',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}