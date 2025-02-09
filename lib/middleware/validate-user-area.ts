import { NextResponse } from 'next/server';

export async function validateUserAreaMiddleware(req: Request) {
  const data = await req.json();

  if (data.role === 'RT' && !data.areaRt) {
    return NextResponse.json(
      { error: 'Area RT is required for RT role' },
      { status: 400 }
    );
  }

  if (data.role === 'RW' && !data.areaRw) {
    return NextResponse.json(
      { error: 'Area RW is required for RW role' },
      { status: 400 }
    );
  }

  return NextResponse.next();
}