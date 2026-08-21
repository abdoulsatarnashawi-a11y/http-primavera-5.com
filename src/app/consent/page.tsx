import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { consentSections } from '@/lib/legal/consent-content';
import { BG } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${BG.consent.title} | Primavera-5`,
  description: 'Политика за бисквитки и управление на съгласието в съответствие с GDPR и ePrivacy директивата.',
};

export default function ConsentPage() {
  return (
    <LegalPageLayout
      title={BG.consent.title}
      subtitle="Информация за използваните бисквитки и технологии за проследяване, както и за Вашите права да управлявате съгласието си."
      sections={consentSections}
    />
  );
}
