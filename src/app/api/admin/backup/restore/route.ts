import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { type BackupPayload, restoreBackupPayload } from '@/lib/backup';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return forbidden();

  const body = await req.json();
  const payload = (body.payload ?? body) as BackupPayload;

  try {
    await restoreBackupPayload(payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Грешка при възстановяване';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
