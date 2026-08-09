'use client';

import Link from 'next/link';

const categoryIcons: Record<string, string> = {
  'Резервни части': '🔧',
  'Аксесоари': '🎨',
  'Тунинг и стайлинг': '⚡',
  'Интериор': '🪑',
  'Екстериор': '🚗',
  'Електроника': '📡',
  'Инструменти': '🛠️',
  'Масла и течности': '🛢️',
};

const gradients = [
  'from-primary to-primary-light',
  'from-accent to-accent-light',
  'from-primary-dark to-primary',
  'from-accent-dark to-accent',
  'from-primary to-accent',
  'from-primary-light to-primary-glow',
  'from-accent to-primary',
  'from-primary-dark to-accent-dark',
];

interface Props {
  categories: string[];
}

export default function CategoryGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-stagger">
      {categories.map((cat, i) => (
        <Link
          key={cat}
          href={`/products?category=${encodeURIComponent(cat)}`}
          className="group relative overflow-hidden rounded-2xl p-6 text-center bg-white border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          <div className="relative z-10">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-white/20 group-hover:to-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300">
              {categoryIcons[cat] || '📦'}
            </div>
            <p className="font-bold text-sm text-slate-800 group-hover:text-white transition-colors duration-300">
              {cat}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
