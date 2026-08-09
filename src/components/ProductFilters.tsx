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
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder={BG.products.search}
        defaultValue={currentQuery || ''}
        onChange={(e) => {
          const val = e.target.value;
          clearTimeout((window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer);
          (window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer = setTimeout(() => updateFilter('q', val), 400);
        }}
        className="input-field flex-1"
      />
      <select
        value={currentBrand || ''}
        onChange={(e) => updateFilter('brand', e.target.value)}
        className="input-field md:w-48"
      >
        <option value="">{BG.products.filterBrand}</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select
        value={currentCategory || ''}
        onChange={(e) => updateFilter('category', e.target.value)}
        className="input-field md:w-48"
      >
        <option value="">{BG.products.filterCategory}</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
