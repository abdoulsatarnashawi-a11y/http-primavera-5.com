import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { legalInfoSections } from '@/lib/legal/legal-info-content';
import { BG } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${BG.legalInfo.title} | Primavera-5`,
  description: 'Задължителна законна информация за търговеца по Закона за електронната търговия и българското законодателство.',
};

export default function LegalInfoPage() {
  return (
    <LegalPageLayout
      title={BG.legalInfo.title}
      subtitle="Задължителна информация за търговеца по Закона за електронната търговия (ЗЕТ), Закона за защита на потребителите (ЗЗП) и GDPR."
      sections={legalInfoSections}
    />
  );
}
