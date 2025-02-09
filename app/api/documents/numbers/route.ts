import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { documentNumbers } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [numbers, totalCount] = await Promise.all([
      db
        .select()
        .from(documentNumbers)
        .orderBy(desc(documentNumbers.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(documentNumbers)
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Document numbers fetched successfully',
      data: numbers,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch document numbers',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = await db.insert(documentNumbers).values({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: 'Document number created successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to create document number',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}