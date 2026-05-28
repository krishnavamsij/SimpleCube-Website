import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Example: Echo back the posted JSON
  const data = await request.json();
  return NextResponse.json({ received: data });
}








