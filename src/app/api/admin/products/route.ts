import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

function forbidden() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return forbidden();
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return forbidden();
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}
