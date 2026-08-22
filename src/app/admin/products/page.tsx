import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { BG, formatPrice } from '@/lib/i18n';
import DeleteProductButton from '@/components/DeleteProductButton';

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/auth/login');

  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">{BG.admin.products}</h1>
        <Link href="/admin/products/new" className="btn-accent">{BG.admin.addProduct}</Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">{BG.admin.productName}</th>
              <th className="p-3 text-left">{BG.admin.brand}</th>
              <th className="p-3 text-left">{BG.admin.model}</th>
              <th className="p-3 text-left">{BG.admin.retailPrice}</th>
              <th className="p-3 text-left">{BG.admin.wholesalePrice}</th>
              <th className="p-3 text-left">{BG.admin.stock}</th>
              <th className="p-3 text-left">{BG.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{p.model}</td>
                <td className="p-3">{formatPrice(p.retailPrice)}</td>
                <td className="p-3">{formatPrice(p.wholesalePrice)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/products/${p.id}`} className="text-primary hover:underline text-xs">{BG.admin.editProduct}</Link>
                  <DeleteProductButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/admin" className="inline-block mt-4 text-primary hover:underline">← {BG.admin.dashboard}</Link>
    </div>
  );
}
