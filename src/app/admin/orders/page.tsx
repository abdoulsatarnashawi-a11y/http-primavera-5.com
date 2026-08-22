import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { BG, formatPrice } from '@/lib/i18n';
import OrderStatusSelect from '@/components/OrderStatusSelect';

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session) redirect('/auth/login');

  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.admin.orders}</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">#{order.id.slice(-8).toUpperCase()}</p>
                <p className="text-sm text-gray-500">{order.user.name} ({order.user.email})</p>
                <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString('bg-BG')}</p>
              </div>
              <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
            </div>
            <div className="space-y-1 text-sm mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <p className="font-bold text-accent">{BG.admin.total}: {formatPrice(order.total)}</p>
          </div>
        ))}
      </div>
      <Link href="/admin" className="inline-block mt-4 text-primary hover:underline">← {BG.admin.dashboard}</Link>
    </div>
  );
}
