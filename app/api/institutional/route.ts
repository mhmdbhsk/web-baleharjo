import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { institutional } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [institutions, totalCount] = await Promise.all([
      db
        .select()
        .from(institutional)
        .orderBy(desc(institutional.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(institutional)
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Institutions fetched successfully',
      data: institutions,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch institutions',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(institutional).values(body);

    return NextResponse.json({
      message: 'Institution created successfully',
      data: result
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to create institution',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}