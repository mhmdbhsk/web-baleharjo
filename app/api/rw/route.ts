import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { rw, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.query.rw.findMany({
      with: {
        user: true,
        rts: {
          with: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RW data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const [newRW] = await db.insert(rw).values(data).returning();
    
    // Update user role
    await db
      .update(users)
      .set({ role: 'RW', areaRw: data.number })
      .where(eq(users.id, data.userId));

    return NextResponse.json(newRW);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create RW' }, { status: 500 });
  }
}