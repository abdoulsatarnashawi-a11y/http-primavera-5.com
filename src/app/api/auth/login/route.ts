import { NextRequest, NextResponse } from 'next/server';
import { loginUser, createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await loginUser(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Грешни данни за вход' }, { status: 401 });
  }
  const token = await createToken(user);
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return NextResponse.json({ user });
}
