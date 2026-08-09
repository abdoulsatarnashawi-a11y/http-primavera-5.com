import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Необходим е вход' }, { status: 401 });
  }
  const { ids } = await req.json();
  const products = await prisma.product.findMany({
    where: { id: { in: ids }, active: true },
    select: { id: true, name: true, retailPrice: true, image: true, stock: true },
  });
  return NextResponse.json(products);
}
