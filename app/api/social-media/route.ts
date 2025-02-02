import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { socialMedia } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';
import { UserService } from '@/db/actions/users';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [socials, totalCount] = await Promise.all([
      db
        .select()
        .from(socialMedia)
        .orderBy(desc(socialMedia.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(socialMedia)
        .then(res => Number(res[0].count))
    ]);

    return NextResponse.json({
      message: 'Social media accounts fetched successfully',
      data: socials,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch social media accounts',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await UserService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({
        message: 'Unauthorized access',
        error: 'Admin privileges required'
      }, { status: 401 });
    }

    const body = await request.json();
    const result = await db.insert(socialMedia).values({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return NextResponse.json({
      message: 'Social media account created successfully',
      data: result[0]
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to create social media account',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}