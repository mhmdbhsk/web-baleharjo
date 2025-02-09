import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { rt, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.query.rt.findMany({
      with: {
        user: true,
        rw: {
          with: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RT data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const [newRT] = await db.insert(rt).values(data).returning();
    
    // Update user role
    await db
      .update(users)
      .set({ role: 'RT', areaRt: data.number })
      .where(eq(users.id, data.userId));

    return NextResponse.json(newRT);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create RT' }, { status: 500 });
  }
}