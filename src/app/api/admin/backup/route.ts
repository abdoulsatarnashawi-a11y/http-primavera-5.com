import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { collectBackupPayload } from '@/lib/backup';
import { prisma } from '@/lib/prisma';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return forbidden();

  const backups = await prisma.siteBackup.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      label: true,
      createdBy: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ backups });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return forbidden();

  const body = await req.json().catch(() => ({}));
  const label =
    typeof body.label === 'string' && body.label.trim()
      ? body.label.trim()
      : new Date().toLocaleString('bg-BG');

  const payload = await collectBackupPayload();

  const backup = await prisma.siteBackup.create({
    data: {
      label,
      payload: JSON.stringify(payload),
      createdBy: session.email,
    },
    select: {
      id: true,
      label: true,
      createdBy: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ backup });
}
