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

  const products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });
  const brands = await prisma.product.findMany({ where: { active: true }, select: { brand: true }, distinct: ['brand'] });
  const categories = await prisma.product.findMany({ where: { active: true }, select: { category: true }, distinct: ['category'] });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="section-title">{BG.products.title}</h1>
        <p className="section-subtitle">{products.length} {BG.products.title.toLowerCase()}</p>
      </div>
      <ProductFilters
        brands={brands.map((b) => b.brand)}
        categories={categories.map((c) => c.category)}
        currentBrand={params.brand}
        currentCategory={params.category}
        currentQuery={params.q}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-stagger">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isLoggedIn={!!session} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🔍</span>
          <p className="text-slate-500 text-lg font-medium">{BG.products.noResults}</p>
        </div>
      )}
    </div>
  );
}
