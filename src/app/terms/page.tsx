import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { termsSections } from '@/lib/legal/terms-content';
import { BG } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${BG.terms.title} | Primavera-5`,
  description: 'Общи условия за ползване на онлайн магазина Primavera-5, съобразени с правото на ЕС и Република България.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={BG.terms.title}
      subtitle="Условия за ползване на уебсайта и сключване на договори за покупко-продажба, съобразени с Директива 2011/83/ЕС, GDPR и българското законодателство."
      sections={termsSections}
    />
  );
}
