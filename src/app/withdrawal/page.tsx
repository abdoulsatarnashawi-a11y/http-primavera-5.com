import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { withdrawalSections } from '@/lib/legal/withdrawal-content';
import { BG } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${BG.withdrawal.title} | Primavera-5`,
  description: 'Формуляр и информация за упражняване на 14-дневното право на отказ от договор по ЗЗП и Директива 2011/83/ЕС.',
};

export default function WithdrawalPage() {
  return (
    <LegalPageLayout
      title={BG.withdrawal.title}
      subtitle="Информация и формуляр за упражняване на правото на отказ от договор в срок от 14 дни, съгласно българското и европейското законодателство."
      sections={withdrawalSections}
    />
  );
}
