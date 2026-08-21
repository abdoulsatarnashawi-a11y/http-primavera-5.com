import Link from 'next/link';
import { LEGAL_INFO } from '@/lib/legal';

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({ title, subtitle, sections }: LegalPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
        {subtitle && <p className="text-slate-600">{subtitle}</p>}
        <p className="text-sm text-slate-500 mt-2">
          Последна актуализация: {LEGAL_INFO.lastUpdated}
        </p>
      </div>

      <nav className="card p-4 mb-8" aria-label="Съдържание">
        <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Съдържание</h2>
        <ol className="text-sm space-y-1 columns-1 sm:columns-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-slate-600 hover:text-accent transition-colors">
                {index + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="card p-8 space-y-10 text-gray-700 leading-relaxed">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-primary mb-4">{section.title}</h2>
            <div className="space-y-3 text-[15px]">{section.content}</div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/terms" className="text-primary hover:text-accent font-medium transition-colors">
          Общи условия
        </Link>
        <Link href="/privacy" className="text-primary hover:text-accent font-medium transition-colors">
          Политика за поверителност
        </Link>
        <Link href="/consent" className="text-primary hover:text-accent font-medium transition-colors">
          Политика за бисквитки и съгласие
        </Link>
      </div>
    </div>
  );
}
