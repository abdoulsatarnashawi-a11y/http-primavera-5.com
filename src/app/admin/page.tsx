import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/auth/login');

  const [productCount, orderCount, userCount, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'customer' } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.admin.dashboard}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <p className="text-4xl font-bold text-primary">{productCount}</p>
          <p className="text-gray-600 mt-2">{BG.admin.totalProducts}</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-4xl font-bold text-accent">{orderCount}</p>
          <p className="text-gray-600 mt-2">{BG.admin.totalOrders}</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-4xl font-bold text-primary">{userCount}</p>
          <p className="text-gray-600 mt-2">{BG.admin.totalUsers}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <Link href="/admin/products" className="btn-primary">{BG.admin.products}</Link>
        <Link href="/admin/products/new" className="btn-accent">{BG.admin.addProduct}</Link>
        <Link href="/admin/orders" className="btn-outline">{BG.admin.orders}</Link>
        <Link href="/admin/settings" className="btn-outline">{BG.admin.settings}</Link>
      </div>

      <h2 className="text-xl font-bold mb-4">{BG.admin.orders}</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">{BG.admin.customer}</th>
              <th className="p-3 text-left">{BG.admin.total}</th>
              <th className="p-3 text-left">{BG.admin.orderStatus}</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id.slice(-8)}</td>
                <td className="p-3">{order.user.name}</td>
                <td className="p-3">{order.total.toFixed(2)} €</td>
                <td className="p-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
