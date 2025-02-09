import { NextRequest, NextResponse } from 'next/server';

import { potential } from '@/db/schema';
import { desc, eq, like, sql } from 'drizzle-orm';
import { db } from '@/db/drizzle';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      db
        .select()
        .from(potential)
        .where(like(potential.title, `%${search}%`))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(potential.createdAt)),
      db
        .select({ count: sql<number>`count(*)` })
        .from(potential)
        .where(like(potential.title, `%${search}%`)),
    ]);

    return NextResponse.json({
      data,
      metadata: {
        totalItems: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching potentials:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newPotential = await db
      .insert(potential)
      .values({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newPotential[0]);
  } catch (error) {
    console.error('Error creating potential:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}