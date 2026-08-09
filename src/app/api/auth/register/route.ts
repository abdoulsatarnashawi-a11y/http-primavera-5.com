import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { name, email, phone, password } = await req.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Този имейл вече е регистриран' }, { status: 400 });
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, phone, password: hashed, role: 'customer' },
  });
  const sessionUser = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = await createToken(sessionUser);
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
  return NextResponse.json({ user: sessionUser });
}
