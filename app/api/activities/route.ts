import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { activity } from '@/db/schema';
import { desc, sql, ilike, or } from 'drizzle-orm';
import { ApiResponse } from '@/types/api';
import { formatISO } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    const baseQuery = db.select().from(activity);

    if (search) {
      baseQuery.where(
        or(
          ilike(activity.title, `%${search}%`),
          ilike(activity.description, `%${search}%`)
        )
      );
    }

    const [activities, totalCount] = await Promise.all([
      baseQuery
        .orderBy(desc(activity.date))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(activity)
        .where(
          search
            ? or(
              ilike(activity.title, `%${search}%`),
              ilike(activity.description, `%${search}%`)
            )
            : undefined
        )
        .then(res => Number(res[0].count))
    ]);

    const response: ApiResponse<typeof activities> = {
      message: 'Activities fetched successfully',
      data: activities,
      metadata: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      message: 'Failed to fetch activities',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(activity).values({
      ...body,
      date: formatISO(body.date),
    });

    const response: ApiResponse<typeof result> = {
      message: 'Activity created successfully',
      data: result
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      message: 'Failed to create activity',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    return NextResponse.json(response, { status: 500 });
  }
}