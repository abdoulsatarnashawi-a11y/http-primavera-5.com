import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Необходим е вход' }, { status: 401 });
  }
  const { items } = await req.json();
  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Празна количка' }, { status: 400 });
  }

  let total = 0;
  const orderItems = [];
  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product || product.stock < item.quantity) {
      return NextResponse.json({ error: `Недостатъчна наличност: ${product?.name}` }, { status: 400 });
    }
    total += product.retailPrice * item.quantity;
    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.retailPrice,
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: session.id,
      total,
      items: { create: orderItems },
    },
  });

  for (const item of items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return NextResponse.json({ orderId: order.id });
}
