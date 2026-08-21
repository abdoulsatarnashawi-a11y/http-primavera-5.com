import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { privacySections } from '@/lib/legal/privacy-content';
import { BG } from '@/lib/i18n';

export const metadata: Metadata = {
  title: `${BG.privacy.title} | Primavera-5`,
  description: 'Политика за поверителност и защита на личните данни по GDPR за потребители в ЕС и ЕИП.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={BG.privacy.title}
      subtitle="Информация за обработването на лични данни в съответствие с Регламент (ЕС) 2016/679 (GDPR) и приложимото законодателство на ЕС."
      sections={privacySections}
    />
  );
}
