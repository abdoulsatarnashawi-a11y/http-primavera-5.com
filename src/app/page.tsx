import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const session = await getSession();
  const products = await prisma.product.findMany({
    where: { active: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  const categories = Object.values(BG.categories);

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{BG.home.heroTitle}</h1>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">{BG.home.heroSubtitle}</p>
          <Link href="/products" className="btn-accent text-lg inline-block">
            {BG.home.shopNow}
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">{BG.home.categories}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="card p-6 text-center hover:border-2 hover:border-accent transition group"
            >
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold group-hover:bg-accent transition">
                {cat.charAt(0)}
              </div>
              <p className="font-medium text-sm">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">{BG.home.featured}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isLoggedIn={!!session} />
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-gray-500">{BG.products.noResults}</p>
          )}
          <div className="text-center mt-8">
            <Link href="/products" className="btn-primary">{BG.nav.products}</Link>
          </div>
        </div>
      </section>

      {!session && (
        <section className="bg-accent py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{BG.products.loginForPrice}</h2>
            <p className="mb-6 text-red-100">{BG.products.priceHidden}</p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/register" className="bg-white text-accent font-semibold py-2 px-8 rounded-lg hover:bg-gray-100 transition">
                {BG.nav.register}
              </Link>
              <Link href="/auth/login" className="border-2 border-white text-white font-semibold py-2 px-8 rounded-lg hover:bg-white hover:text-accent transition">
                {BG.nav.login}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
