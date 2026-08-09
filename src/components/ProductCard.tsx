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
    <div className="card group relative">
      {/* Hover shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-2xl" />

      <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white text-5xl font-extrabold">
            P5
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="absolute top-3 left-3 badge bg-primary text-white border-0 shadow-glow-blue">
          {product.brand}
        </span>

        {product.stock > 0 ? (
          <span className="absolute top-3 right-3 badge bg-green-500/90 text-white border-0 text-[10px]">
            ✓ {BG.products.inStock}
          </span>
        ) : (
          <span className="absolute top-3 right-3 badge bg-slate-600/90 text-white border-0 text-[10px]">
            {BG.products.outOfStock}
          </span>
        )}
      </div>

      <div className="p-5 relative z-10">
        <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 text-base group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4 font-medium">{product.model}</p>

        {isLoggedIn ? (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <p className="text-2xl font-extrabold gradient-text">{formatPrice(product.retailPrice)}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              {BG.products.wholesalePrice}: <span className="font-bold text-slate-700">{formatPrice(product.wholesalePrice)}</span>
            </p>
          </div>
        ) : (
          <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center group-hover:border-accent/30 transition-colors">
            <p className="text-sm text-slate-600 font-semibold">🔒 {BG.products.loginForPrice}</p>
            <Link href="/auth/register" className="text-xs text-accent hover:underline font-bold mt-1 inline-block">
              {BG.products.registerForPrice} →
            </Link>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="btn-outline text-sm py-2 px-4 flex-1 text-center"
          >
            {BG.products.details}
          </Link>
          {isLoggedIn && product.stock > 0 && (
            <Link
              href={`/products/${product.id}?buy=1`}
              className="btn-accent text-sm py-2 px-4 flex-1 text-center"
            >
              {BG.products.buyNow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
