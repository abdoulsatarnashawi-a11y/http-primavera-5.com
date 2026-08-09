import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { BG } from '@/lib/i18n';
import SettingsForm from '@/components/SettingsForm';

export default async function AdminSettingsPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/auth/login');

  let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: { id: 'main' } });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-8">{BG.admin.siteSettings}</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
