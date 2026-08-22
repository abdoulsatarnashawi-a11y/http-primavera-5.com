import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function PUT(req: NextRequest, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return forbidden();
  const { id } = await params;
  const { status } = await req.json();
  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json(order);
}
