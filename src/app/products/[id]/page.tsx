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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white text-6xl font-bold">
              P5
            </div>
          )}
        </div>

        <div>
          <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">{product.brand}</span>
          <h1 className="text-3xl font-bold mt-3 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.model} | {product.category}</p>

          {session ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-3xl font-bold text-accent mb-1">{formatPrice(product.retailPrice)}</p>
              <p className="text-sm text-gray-600">{BG.products.wholesalePrice}: <strong>{formatPrice(product.wholesalePrice)}</strong></p>
              <p className="text-sm mt-2">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">{BG.products.inStock} ({product.stock} {BG.products.pieces})</span>
                ) : (
                  <span className="text-red-600 font-medium">{BG.products.outOfStock}</span>
                )}
              </p>
            </div>
          ) : (
            <div className="bg-accent/10 border border-accent rounded-xl p-6 mb-6 text-center">
              <p className="text-lg font-semibold text-accent mb-2">{BG.products.loginForPrice}</p>
              <p className="text-sm text-gray-600 mb-4">{BG.products.priceHidden}</p>
              <div className="flex gap-3 justify-center">
                <Link href="/auth/login" className="btn-primary text-sm">{BG.nav.login}</Link>
                <Link href="/auth/register" className="btn-accent text-sm">{BG.nav.register}</Link>
              </div>
            </div>
          )}

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {product.specs && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary mb-2">{BG.products.specs}</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm whitespace-pre-line">{product.specs}</div>
            </div>
          )}

          {session && product.stock > 0 && (
            <AddToCartButton productId={product.id} autoBuy={buy === '1'} />
          )}

          <Link href="/products" className="inline-block mt-4 text-primary hover:underline text-sm">
            ← {BG.cart.continueShopping}
          </Link>
        </div>
      </div>
    </div>
  );
}
