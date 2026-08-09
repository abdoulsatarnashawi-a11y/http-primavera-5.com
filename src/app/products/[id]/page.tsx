import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG, formatPrice } from '@/lib/i18n';
import AddToCartButton from '@/components/AddToCartButton';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ buy?: string }>;
}

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { buy } = await searchParams;
  const session = await getSession();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.active) notFound();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-card group">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="50vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white text-7xl font-extrabold">
              P5
            </div>
          )}
          <div className="absolute top-4 left-4 badge bg-primary text-white border-0 shadow-glow-blue text-sm">
            {product.brand}
          </div>
        </div>

        <div className="animate-fade-in-up">
          <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{product.name}</h1>
          <p className="text-slate-500 font-medium mb-6">{product.model}</p>

          {session ? (
            <div className="card-glass p-6 mb-6 border border-primary/10">
              <p className="text-4xl font-extrabold gradient-text mb-1">{formatPrice(product.retailPrice)}</p>
              <p className="text-sm text-slate-500">{BG.products.wholesalePrice}: <strong className="text-slate-700">{formatPrice(product.wholesalePrice)}</strong></p>
              <div className="mt-3">
                {product.stock > 0 ? (
                  <span className="badge bg-green-100 text-green-700 border-green-200">✓ {BG.products.inStock} ({product.stock} {BG.products.pieces})</span>
                ) : (
                  <span className="badge bg-red-100 text-red-700 border-red-200">{BG.products.outOfStock}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl p-8 mb-6 text-center">
              <div className="absolute inset-0 bg-cta-gradient opacity-90" />
              <div className="relative z-10">
                <span className="text-4xl mb-3 block">🔒</span>
                <p className="text-xl font-extrabold text-white mb-2">{BG.products.loginForPrice}</p>
                <p className="text-red-100 text-sm mb-5">{BG.products.priceHidden}</p>
                <div className="flex gap-3 justify-center">
                  <Link href="/auth/login" className="bg-white text-accent font-bold py-2 px-6 rounded-xl hover:scale-105 transition-transform">{BG.nav.login}</Link>
                  <Link href="/auth/register" className="btn-glass py-2 px-6">{BG.nav.register}</Link>
                </div>
              </div>
            </div>
          )}

          <p className="text-slate-600 mb-6 leading-relaxed text-base">{product.description}</p>

          {product.specs && (
            <div className="mb-6">
              <h3 className="font-extrabold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-accent rounded" />
                {BG.products.specs}
              </h3>
              <div className="card-glass p-5 text-sm whitespace-pre-line text-slate-600 leading-relaxed">{product.specs}</div>
            </div>
          )}

          {session && product.stock > 0 && (
            <AddToCartButton productId={product.id} autoBuy={buy === '1'} />
          )}

          <Link href="/products" className="inline-flex items-center gap-2 mt-6 text-primary hover:text-accent font-semibold text-sm transition-colors">
            ← {BG.cart.continueShopping}
          </Link>
        </div>
      </div>
    </div>
  );
}
