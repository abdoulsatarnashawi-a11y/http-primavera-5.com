'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';
import type { Product } from '@prisma/client';

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get('name'),
      description: form.get('description'),
      image: form.get('image'),
      brand: form.get('brand'),
      model: form.get('model'),
      category: form.get('category'),
      specs: form.get('specs'),
      retailPrice: parseFloat(form.get('retailPrice') as string),
      wholesalePrice: parseFloat(form.get('wholesalePrice') as string),
      stock: parseInt(form.get('stock') as string, 10),
      active: form.get('active') === 'on',
    };

    const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
    const method = product ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || 'Грешка');
      setLoading(false);
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</div>}
      <div>
        <label className="label">{BG.admin.productName}</label>
        <input name="name" defaultValue={product?.name} required className="input-field" />
      </div>
      <div>
        <label className="label">{BG.admin.description}</label>
        <textarea name="description" defaultValue={product?.description} required rows={4} className="input-field" />
      </div>
      <div>
        <label className="label">{BG.admin.image}</label>
        <input name="image" defaultValue={product?.image || ''} className="input-field" placeholder="https://..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">{BG.admin.brand}</label>
          <input name="brand" defaultValue={product?.brand} required className="input-field" />
        </div>
        <div>
          <label className="label">{BG.admin.model}</label>
          <input name="model" defaultValue={product?.model} required className="input-field" />
        </div>
      </div>
      <div>
        <label className="label">{BG.admin.category}</label>
        <select name="category" defaultValue={product?.category || ''} required className="input-field">
          {Object.values(BG.categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">{BG.admin.specs}</label>
        <textarea name="specs" defaultValue={product?.specs || ''} rows={3} className="input-field" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="label">{BG.admin.retailPrice}</label>
          <input name="retailPrice" type="number" step="0.01" defaultValue={product?.retailPrice} required className="input-field" />
        </div>
        <div>
          <label className="label">{BG.admin.wholesalePrice}</label>
          <input name="wholesalePrice" type="number" step="0.01" defaultValue={product?.wholesalePrice} required className="input-field" />
        </div>
        <div>
          <label className="label">{BG.admin.stock}</label>
          <input name="stock" type="number" defaultValue={product?.stock ?? 0} required className="input-field" />
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input name="active" type="checkbox" defaultChecked={product?.active ?? true} />
        <span className="text-sm">{BG.admin.active}</span>
      </label>
      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary">{loading ? '...' : BG.admin.save}</button>
        <button type="button" onClick={() => router.back()} className="btn-outline">{BG.admin.cancel}</button>
      </div>
    </form>
  );
}
