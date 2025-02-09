import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/get-current-user';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(null);
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(null);
  }
}