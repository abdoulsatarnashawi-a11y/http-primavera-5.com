'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';
import type { SiteSettings } from '@prisma/client';

interface Props {
  settings: SiteSettings;
}

export default function SettingsForm({ settings }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage('Настройките са запазени!');
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && <div className="bg-green-100 text-green-700 p-3 rounded-lg">{message}</div>}

      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-bold text-primary">{BG.admin.headerSettings}</h2>
        <div>
          <label className="label">Име на сайта</label>
          <input name="siteName" defaultValue={settings.siteName} className="input-field" />
        </div>
        <div>
          <label className="label">Слоган</label>
          <input name="siteTagline" defaultValue={settings.siteTagline} className="input-field" />
        </div>
        <div>
          <label className="label">Лого текст</label>
          <input name="headerLogo" defaultValue={settings.headerLogo} className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Телефон (хедър)</label>
            <input name="headerPhone" defaultValue={settings.headerPhone} className="input-field" />
          </div>
          <div>
            <label className="label">Имейл (хедър)</label>
            <input name="headerEmail" defaultValue={settings.headerEmail} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label">Навигация (JSON)</label>
          <textarea name="headerNav" defaultValue={settings.headerNav} rows={3} className="input-field font-mono text-xs" />
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-bold text-primary">{BG.admin.footerSettings}</h2>
        <div>
          <label className="label">За нас</label>
          <textarea name="footerAbout" defaultValue={settings.footerAbout} rows={3} className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Адрес</label>
            <input name="footerAddress" defaultValue={settings.footerAddress} className="input-field" />
          </div>
          <div>
            <label className="label">Телефон (футър)</label>
            <input name="footerPhone" defaultValue={settings.footerPhone} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label">Имейл (футър)</label>
          <input name="footerEmail" defaultValue={settings.footerEmail} className="input-field" />
        </div>
        <div>
          <label className="label">Авторски права</label>
          <input name="footerCopyright" defaultValue={settings.footerCopyright} className="input-field" />
        </div>
        <div>
          <label className="label">Версия</label>
          <input name="version" defaultValue={settings.version} className="input-field" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? '...' : BG.admin.save}
      </button>
    </form>
  );
}
