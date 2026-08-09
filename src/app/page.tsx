import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';
import StatsBar from '@/components/StatsBar';
import CategoryGrid from '@/components/CategoryGrid';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default async function HomePage() {
  const session = await getSession();
  const [products, sliderProducts, productCount, brandCount] = await Promise.all([
    prisma.product.findMany({ where: { active: true }, take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.product.findMany({
      where: { active: true, image: { not: null } },
      select: { id: true, name: true, brand: true, model: true, image: true },
    }),
    prisma.product.count({ where: { active: true } }),
    prisma.product.findMany({ where: { active: true }, select: { brand: true }, distinct: ['brand'] }),
  ]);

  const slides = shuffle(
    sliderProducts.filter((p) => p.image).map((p) => ({
      id: p.id, name: p.name, brand: p.brand, model: p.model, image: p.image!,
    }))
  ).slice(0, 6);

  const categories = Object.values(BG.categories);

  return (
    <>
      <HeroSlider slides={slides} />
      <StatsBar productCount={productCount} brandCount={brandCount.length} />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="section-title">{BG.home.categories}</h2>
          <p className="section-subtitle">{BG.home.allBrands}</p>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="section-title">{BG.home.featured}</h2>
              <p className="section-subtitle">Най-новите продукти в нашия магазин</p>
            </div>
            <Link href="/products" className="btn-primary text-sm whitespace-nowrap">
              {BG.nav.products} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isLoggedIn={!!session} />
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-slate-500 py-12">{BG.products.noResults}</p>
          )}
        </div>
      </section>

      {!session && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cta-gradient" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <span className="text-5xl mb-4 block">🔐</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{BG.products.loginForPrice}</h2>
              <p className="text-red-100 text-lg mb-8">{BG.products.priceHidden}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-accent font-extrabold py-3 px-10 rounded-xl hover:scale-105 hover:shadow-elevated transition-all duration-300">
                  {BG.nav.register}
                </Link>
                <Link href="/auth/login" className="btn-glass font-extrabold py-3 px-10">
                  {BG.nav.login}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
