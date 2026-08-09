import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor } from '@/lib/visitors';

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  const stats = await trackVisitor(sessionId);
  return NextResponse.json(stats);
}
