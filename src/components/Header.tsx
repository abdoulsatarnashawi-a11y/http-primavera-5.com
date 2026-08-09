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
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="bg-primary-dark text-sm py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span>{settings.headerPhone}</span>
          <span>{settings.headerEmail}</span>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-lg">
              P5
            </div>
            <div>
              <h1 className="text-xl font-bold">{settings.headerLogo}</h1>
              <p className="text-xs text-blue-200">{settings.siteTagline}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent-light transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/cart" className="hover:text-accent-light transition-colors">
                  {BG.nav.cart}
                </Link>
                {session.role === 'admin' && (
                  <Link href="/admin" className="bg-accent px-3 py-1 rounded-lg text-sm font-semibold hover:bg-accent-dark transition">
                    {BG.nav.admin}
                  </Link>
                )}
                <span className="text-sm hidden sm:inline">{session.name}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-accent-light transition-colors font-medium">
                  {BG.nav.login}
                </Link>
                <Link href="/auth/register" className="bg-accent px-4 py-2 rounded-lg font-semibold hover:bg-accent-dark transition">
                  {BG.nav.register}
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="md:hidden flex gap-4 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-accent-light transition-colors text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
