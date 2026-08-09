import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Primavera-5 | Авточасти и аксесоари',
  description: 'Авточасти, аксесоари и оборудване за всички марки и модели автомобили',
};

async function getSettings() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: { id: 'main' } });
  }
  return settings;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="bg">
      <body className={`${manrope.className} min-h-screen flex flex-col`}>
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
