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
    <footer className="bg-primary-dark text-white mt-auto">
      <VisitorTracker />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-accent-light">{BG.footer.about}</h3>
            <p className="text-blue-200 text-sm leading-relaxed">{settings.footerAbout}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-accent-light">{BG.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-blue-200 hover:text-white transition">{BG.nav.products}</Link></li>
              <li><Link href="/contact" className="text-blue-200 hover:text-white transition">{BG.nav.contact}</Link></li>
              <li><Link href="/privacy" className="text-blue-200 hover:text-white transition">{BG.footer.privacy}</Link></li>
              <li><Link href="/terms" className="text-blue-200 hover:text-white transition">{BG.footer.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-accent-light">{BG.footer.contact}</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>{settings.footerAddress}</li>
              <li>{settings.footerPhone}</li>
              <li>{settings.footerEmail}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200/60">
          <p>{settings.footerCopyright}</p>
          <div className="flex gap-6">
            <span>{BG.footer.visitors}: <strong className="text-white">{stats.totalVisitors}</strong></span>
            <span>{BG.footer.onlineNow}: <strong className="text-accent-light">{stats.currentOnline}</strong></span>
            <span>{BG.footer.version}: <strong className="text-white">v{settings.version}</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
