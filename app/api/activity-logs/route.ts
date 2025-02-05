import { NextRequest, NextResponse } from 'next/server';

import { activityLogs, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/db/drizzle';

export async function GET() {
  try {
    const logs = await db
      .select({
        id: activityLogs.id,
        action: activityLogs.action,
        timestamp: activityLogs.timestamp,
        ipAddress: activityLogs.ipAddress,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(activityLogs)
      .leftJoin(users, eq(activityLogs.userId, users.id))
      .orderBy(desc(activityLogs.timestamp))
      .limit(50);

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const log = await db
      .insert(activityLogs)
      .values({
        action: body.action,
        userId: body.userId,
        ipAddress: body.ipAddress,
        timestamp: new Date(),
      })
      .returning();

    return NextResponse.json(log[0]);
  } catch (error) {
    console.error('Error creating activity log:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}