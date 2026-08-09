import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import ProductForm from '@/components/ProductForm';

export default async function NewProductPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/auth/login');

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.admin.addProduct}</h1>
      <ProductForm />
    </div>
  );
}
