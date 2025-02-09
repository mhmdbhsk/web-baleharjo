import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { rw, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  try {
    const data = await db.query.rw.findFirst({
      where: eq(rw.id, id),
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
    return NextResponse.json({ error: 'Failed to fetch RW' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const [updatedRW] = await db
      .update(rw)
      .set(data)
      .where(eq(rw.id, params.id))
      .returning();
    return NextResponse.json(updatedRW);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update RW' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [deletedRW] = await db
      .delete(rw)
      .where(eq(rw.id, params.id))
      .returning();
    return NextResponse.json(deletedRW);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete RW' }, { status: 500 });
  }
}