import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { profile } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth/get-current-user';


export async function GET() {
  try {
    const result = await db
      .select()
      .from(profile)
      .limit(1);

    return NextResponse.json({
      message: 'Profile fetched successfully',
      data: result[0] || null
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch profile',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({
        message: 'Unauthorized access',
        error: 'Only administrators can modify profile'
      }, { status: 401 });
    }

    const body = await request.json();
    const existing = await db.select().from(profile).limit(1);

    let result;
    if (existing.length === 0) {
      if (!body.title || !body.description) {
        return NextResponse.json({
          message: 'Validation error',
          error: 'Title and description are required'
        }, { status: 400 });
      }

      result = await db.insert(profile).values({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
    } else {
      result = await db.update(profile)
        .set({
          ...body,
          updatedAt: new Date()
        })
        .where(eq(profile.id, existing[0].id))
        .returning();
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      data: result[0]
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to update profile',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}