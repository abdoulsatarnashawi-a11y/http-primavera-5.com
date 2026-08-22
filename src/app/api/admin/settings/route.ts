import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return forbidden();
  const data = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  return NextResponse.json(settings);
}
