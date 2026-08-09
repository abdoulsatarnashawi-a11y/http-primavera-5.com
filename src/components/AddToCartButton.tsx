'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';

interface Props {
  productId: string;
  autoBuy?: boolean;
}

export default function AddToCartButton({ productId, autoBuy }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function addToCart(goToCart = false) {
    setLoading(true);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: { productId: string }) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setLoading(false);
    if (goToCart) router.push('/cart');
    else alert('Добавено в количката!');
  }

  useEffect(() => {
    if (autoBuy) addToCart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-lg">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
        <span className="px-4 py-2 font-medium">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
      </div>
      <button onClick={() => addToCart(false)} disabled={loading} className="btn-outline">
        {BG.products.addToCart}
      </button>
      <button onClick={() => addToCart(true)} disabled={loading} className="btn-accent">
        {BG.products.buyNow}
      </button>
    </div>
  );
}
