import Link from 'next/link';
import { BG } from '@/lib/i18n';
import { getVisitorStats } from '@/lib/visitors';
import type { SiteSettings } from '@prisma/client';
import VisitorTracker from './VisitorTracker';

interface FooterProps {
  settings: SiteSettings;
}

export default async function Footer({ settings }: FooterProps) {
  const stats = await getVisitorStats();

  return (
    <footer className="relative mt-auto overflow-hidden">
      <VisitorTracker />
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-extrabold text-white shadow-glow-red">
                P5
              </div>
              <span className="text-xl font-extrabold text-white">{settings.siteName}</span>
            </div>
            <p className="text-blue-200/80 text-sm leading-relaxed">{settings.footerAbout}</p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold mb-4 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded" />
              {BG.footer.quickLinks}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/products', label: BG.nav.products },
                { href: '/contact', label: BG.nav.contact },
                { href: '/privacy', label: BG.footer.privacy },
                { href: '/terms', label: BG.footer.terms },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold mb-4 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded" />
              {BG.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm text-blue-200/70">
              <li className="flex items-start gap-2">
                <span className="text-accent-light mt-0.5">📍</span>{settings.footerAddress}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-light">📞</span>{settings.footerPhone}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent-light">✉️</span>{settings.footerEmail}
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-sm font-extrabold mb-4 text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent rounded" />
              Статистика
            </h3>
            <div className="space-y-3">
              <div className="card-glass !bg-white/10 !border-white/10 p-4 rounded-xl">
                <p className="text-2xl font-extrabold text-white">{stats.totalVisitors}</p>
                <p className="text-xs text-blue-200/70 font-medium">{BG.footer.visitors}</p>
              </div>
              <div className="card-glass !bg-white/10 !border-white/10 p-4 rounded-xl">
                <p className="text-2xl font-extrabold text-accent-light flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {stats.currentOnline}
                </p>
                <p className="text-xs text-blue-200/70 font-medium">{BG.footer.onlineNow}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200/50">
          <p>{settings.footerCopyright}</p>
          <span className="badge bg-white/10 text-white/70 border-white/10">
            {BG.footer.version} v{settings.version}
          </span>
        </div>
      </div>
    </footer>
  );
}
