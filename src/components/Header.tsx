import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import LogoutButton from '@/components/LogoutButton';
import type { SiteSettings } from '@prisma/client';

interface HeaderProps {
  settings: SiteSettings;
}

export default async function Header({ settings }: HeaderProps) {
  const session = await getSession();
  let navItems: { label: string; href: string }[] = [];
  try {
    navItems = JSON.parse(settings.headerNav);
  } catch {
    navItems = [
      { label: BG.nav.home, href: '/' },
      { label: BG.nav.products, href: '/products' },
      { label: BG.nav.contact, href: '/contact' },
    ];
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white text-xs sm:text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-90">
              <svg className="w-3.5 h-3.5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {settings.headerPhone}
            </span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-90">
              <svg className="w-3.5 h-3.5 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {settings.headerEmail}
            </span>
          </div>
          <span className="badge bg-accent/20 text-accent-light border-accent/30 text-[10px] sm:text-xs">
            🚗 {BG.home.allBrands}
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-gradient-to-r from-primary-dark/95 via-primary/95 to-primary-dark/95 backdrop-blur-xl shadow-elevated border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-extrabold text-lg text-white shadow-glow-red group-hover:scale-110 transition-transform duration-300">
                P5
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white tracking-tight">{settings.headerLogo}</h1>
                <p className="text-[11px] text-blue-200/80 font-medium">{settings.siteTagline}</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {session ? (
                <>
                  <Link
                    href="/cart"
                    className="relative flex items-center gap-1.5 text-white/90 hover:text-white font-semibold text-sm px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="hidden sm:inline">{BG.nav.cart}</span>
                  </Link>
                  {session.role === 'admin' && (
                    <Link href="/admin" className="btn-accent text-xs py-2 px-3">
                      {BG.nav.admin}
                    </Link>
                  )}
                  <span className="text-sm text-white/80 hidden lg:inline font-medium">{session.name}</span>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-white/90 hover:text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    {BG.nav.login}
                  </Link>
                  <Link href="/auth/register" className="btn-accent text-sm py-2 px-5">
                    {BG.nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>

          <nav className="md:hidden flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
