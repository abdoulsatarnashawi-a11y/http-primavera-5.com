'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BG, formatPrice } from '@/lib/i18n';

interface CartItem {
  productId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    retailPrice: number;
    image: string | null;
    stock: number;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

  useEffect(() => {
    async function loadCart() {
      const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cart.length === 0) { setLoading(false); return; }
      const res = await fetch('/api/products/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: cart.map((i) => i.productId) }),
      });
      const products = await res.json();
      const enriched = cart.map((item) => ({
        ...item,
        product: products.find((p: { id: string }) => p.id === item.productId),
      })).filter((i) => i.product);
      setItems(enriched);
      setLoading(false);
    }
    loadCart();
  }, []);

  function updateQuantity(productId: string, qty: number) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex((i: CartItem) => i.productId === productId);
    if (idx >= 0) {
      if (qty <= 0) cart.splice(idx, 1);
      else cart[idx].quantity = qty;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setItems((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: qty } : i).filter((i) => i.quantity > 0));
  }

  const total = items.reduce((sum, i) => sum + (i.product?.retailPrice || 0) * i.quantity, 0);

  async function checkout() {
    if (!acceptTerms) {
      setTermsError(BG.consent.checkoutTermsRequired);
      return;
    }
    setTermsError('');
    setOrdering(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      }),
    });
    if (res.ok) {
      localStorage.removeItem('cart');
      router.push('/orders?success=1');
    } else {
      const data = await res.json();
      alert(data.error || 'Грешка при поръчка');
    }
    setOrdering(false);
  }

  if (loading) return <div className="container mx-auto px-4 py-12 text-center">Зареждане...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.cart.title}</h1>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">{BG.cart.empty}</p>
          <Link href="/products" className="btn-primary">{BG.cart.continueShopping}</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.productId} className="card p-4 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product?.name}</h3>
                  <p className="text-accent font-bold">{formatPrice(item.product?.retailPrice || 0)}</p>
                </div>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1">+</button>
                </div>
                <p className="font-bold w-24 text-right">{formatPrice((item.product?.retailPrice || 0) * item.quantity)}</p>
                <button onClick={() => updateQuantity(item.productId, 0)} className="text-red-500 text-sm">{BG.cart.remove}</button>
              </div>
            ))}
          </div>
          <div className="card p-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (e.target.checked) setTermsError('');
                }}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                {BG.consent.agreeCheckout}{' '}
                <Link href="/terms" target="_blank" className="text-primary hover:text-accent font-medium">
                  {BG.footer.terms}
                </Link>
                ,{' '}
                <Link href="/privacy" target="_blank" className="text-primary hover:text-accent font-medium">
                  {BG.footer.privacy}
                </Link>{' '}
                {BG.consent.acknowledgeWithdrawal}{' '}
                <Link href="/withdrawal" target="_blank" className="text-primary hover:text-accent font-medium">
                  {BG.consent.withdrawalRight}
                </Link>
                .
              </span>
            </label>
            {termsError && (
              <p className="text-sm text-red-600 font-medium">{termsError}</p>
            )}
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-lg font-bold">{BG.cart.total}: <span className="text-accent text-2xl">{formatPrice(total)}</span></p>
              </div>
              <button onClick={checkout} disabled={ordering} className="btn-accent text-lg">
                {ordering ? '...' : BG.cart.checkout}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
