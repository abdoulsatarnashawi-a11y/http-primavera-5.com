import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG, formatPrice } from '@/lib/i18n';

interface Props {
  searchParams: Promise<{ success?: string }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session) redirect('/auth/login');

  const params = await searchParams;
  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const statusMap: Record<string, string> = {
    pending: BG.orders.pending,
    processing: BG.orders.processing,
    shipped: BG.orders.shipped,
    delivered: BG.orders.delivered,
    cancelled: BG.orders.cancelled,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.orders.title}</h1>
      {params.success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">{BG.orders.orderSuccess}</div>
      )}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">{BG.orders.noOrders}</p>
          <Link href="/products" className="btn-primary">{BG.nav.products}</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">{BG.orders.orderNumber}{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{BG.orders.date}: {new Date(order.createdAt).toLocaleDateString('bg-BG')}</p>
                </div>
                <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                  {statusMap[order.status] || order.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-3 flex justify-between font-bold">
                <span>{BG.cart.total}</span>
                <span className="text-accent">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
