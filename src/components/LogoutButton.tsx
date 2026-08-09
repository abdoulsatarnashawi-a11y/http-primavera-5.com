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
    <button
      onClick={handleLogout}
      className="text-sm text-white/70 hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
    >
      {BG.nav.logout}
    </button>
  );
}
