import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

interface Props {
  searchParams: Promise<{ category?: string; brand?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const session = await getSession();

  const where: Record<string, unknown> = { active: true };
  if (params.category) where.category = params.category;
  if (params.brand) where.brand = params.brand;
  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { brand: { contains: params.q } },
      { model: { contains: params.q } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const brands = await prisma.product.findMany({
    where: { active: true },
    select: { brand: true },
    distinct: ['brand'],
  });

  const categories = await prisma.product.findMany({
    where: { active: true },
    select: { category: true },
    distinct: ['category'],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.products.title}</h1>
      <ProductFilters
        brands={brands.map((b) => b.brand)}
        categories={categories.map((c) => c.category)}
        currentBrand={params.brand}
        currentCategory={params.category}
        currentQuery={params.q}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isLoggedIn={!!session} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">{BG.products.noResults}</p>
      )}
    </div>
  );
}
