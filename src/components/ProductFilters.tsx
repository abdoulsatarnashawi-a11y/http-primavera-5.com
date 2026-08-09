'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BG } from '@/lib/i18n';

interface Props {
  brands: string[];
  categories: string[];
  currentBrand?: string;
  currentCategory?: string;
  currentQuery?: string;
}

export default function ProductFilters({ brands, categories, currentBrand, currentCategory, currentQuery }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="card-glass p-5 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={BG.products.search}
          defaultValue={currentQuery || ''}
          onChange={(e) => {
            const val = e.target.value;
            clearTimeout((window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer);
            (window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer = setTimeout(() => updateFilter('q', val), 400);
          }}
          className="input-field pl-11"
        />
      </div>
      <select
        value={currentBrand || ''}
        onChange={(e) => updateFilter('brand', e.target.value)}
        className="input-field md:w-52"
      >
        <option value="">{BG.products.filterBrand}</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select
        value={currentCategory || ''}
        onChange={(e) => updateFilter('category', e.target.value)}
        className="input-field md:w-52"
      >
        <option value="">{BG.products.filterCategory}</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
