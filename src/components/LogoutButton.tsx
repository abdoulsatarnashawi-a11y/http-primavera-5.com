'use client';

import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="text-sm hover:text-accent-light transition-colors">
      {BG.nav.logout}
    </button>
  );
}
