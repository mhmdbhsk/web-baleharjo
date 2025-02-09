
import { db } from '@/db/drizzle';
import { guestBooks } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = await db.insert(guestBooks).values(json).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  try {
    const result = await db.select().from(guestBooks).orderBy(desc(guestBooks.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}