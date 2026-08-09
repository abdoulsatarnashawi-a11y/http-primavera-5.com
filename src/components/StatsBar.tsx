interface StatsBarProps {
  productCount: number;
  brandCount: number;
}

const stats = [
  { key: 'products', icon: '📦', getValue: (p: StatsBarProps) => `${p.productCount}+` },
  { key: 'brands', icon: '🏷️', getValue: (p: StatsBarProps) => `${p.brandCount}+` },
  { key: 'delivery', icon: '🚚', getValue: () => '24/7' },
  { key: 'currency', icon: '💶', getValue: () => 'EUR' },
];

const labels: Record<string, string> = {
  products: 'Продукти',
  brands: 'Марки',
  delivery: 'Онлайн поръчки',
  currency: 'Валута',
};

export default function StatsBar({ productCount, brandCount }: StatsBarProps) {
  const props = { productCount, brandCount };

  return (
    <section className="relative -mt-8 z-20 container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            className="card-glass p-5 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-extrabold gradient-text">{stat.getValue(props)}</p>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mt-1">{labels[stat.key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
