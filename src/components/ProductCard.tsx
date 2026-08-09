import Link from 'next/link';
import Image from 'next/image';
import { BG, formatPrice } from '@/lib/i18n';
import type { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
  isLoggedIn: boolean;
}

export default function ProductCard({ product, isLoggedIn }: ProductCardProps) {
  return (
    <div className="card group">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-primary text-white text-4xl font-bold">
            P5
          </div>
        )}
        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
          {product.brand}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.model}</p>
        <p className="text-xs text-gray-400 mb-3">{product.category}</p>

        {isLoggedIn ? (
          <div className="mb-3">
            <p className="text-lg font-bold text-accent">{formatPrice(product.retailPrice)}</p>
            <p className="text-xs text-gray-500">{BG.products.wholesalePrice}: {formatPrice(product.wholesalePrice)}</p>
          </div>
        ) : (
          <div className="mb-3 bg-gray-100 rounded-lg p-2 text-center">
            <p className="text-sm text-gray-600 font-medium">{BG.products.loginForPrice}</p>
            <Link href="/auth/register" className="text-xs text-primary hover:underline">
              {BG.products.registerForPrice}
            </Link>
          </div>
        )}

        <div className="flex gap-2">
          <Link href={`/products/${product.id}`} className="btn-outline text-sm py-1.5 px-3 flex-1 text-center">
            {BG.products.details}
          </Link>
          {isLoggedIn && product.stock > 0 && (
            <Link href={`/products/${product.id}?buy=1`} className="btn-accent text-sm py-1.5 px-3 flex-1 text-center">
              {BG.products.buyNow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
