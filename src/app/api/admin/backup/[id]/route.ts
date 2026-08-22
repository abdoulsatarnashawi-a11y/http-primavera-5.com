import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Props {
  params: Promise<{ id: string }>;
}

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET(_req: NextRequest, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return forbidden();

  const { id } = await params;
  const backup = await prisma.siteBackup.findUnique({ where: { id } });
  if (!backup) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const payload = JSON.parse(backup.payload);
  return NextResponse.json({
    id: backup.id,
    label: backup.label,
    createdAt: backup.createdAt,
    payload,
  });
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return forbidden();

  const { id } = await params;
  await prisma.siteBackup.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
