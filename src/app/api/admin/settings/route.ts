import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  return NextResponse.json(settings);
}
