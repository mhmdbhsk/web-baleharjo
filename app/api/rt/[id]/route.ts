import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { rt, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  try {
    const data = await db.query.rt.findFirst({
      where: eq(rt.id, id),
      with: {
        user: true,
        rw: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json({ error: 'RT not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RT' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const [updatedRT] = await db
      .update(rt)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(rt.id, params.id))
      .returning();

    if (data.userId) {
      await db
        .update(users)
        .set({ role: 'RT', areaRt: data.number })
        .where(eq(users.id, data.userId));
    }

    return NextResponse.json(updatedRT);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update RT' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [deletedRT] = await db.delete(rt).where(eq(rt.id, params.id)).returning();

    if (deletedRT?.userId) {
      await db
        .update(users)
        .set({ role: 'ADMIN', areaRt: null })
        .where(eq(users.id, deletedRT.userId));
    }

    return NextResponse.json(deletedRT);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete RT' }, { status: 500 });
  }
}