import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import ProductForm from '@/components/ProductForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect('/auth/login');

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.admin.editProduct}</h1>
      <ProductForm product={product} />
    </div>
  );
}
