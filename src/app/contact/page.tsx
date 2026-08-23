'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BG } from '@/lib/i18n';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!acceptPrivacy) {
      setError(BG.contact.privacyRequired);
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary text-center mb-2">{BG.contact.title}</h1>
      <p className="text-gray-600 text-center mb-8">{BG.contact.subtitle}</p>

      {sent ? (
        <div className="bg-green-100 text-green-700 p-6 rounded-xl text-center">{BG.contact.success}</div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          <div>
            <label className="label">{BG.contact.name}</label>
            <input name="name" required className="input-field" />
          </div>
          <div>
            <label className="label">{BG.contact.email}</label>
            <input name="email" type="email" required className="input-field" />
          </div>
          <div>
            <label className="label">{BG.contact.message}</label>
            <textarea name="message" required rows={5} className="input-field" />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            {BG.contact.privacyNotice}{' '}
            <Link href="/privacy" className="text-primary hover:text-accent font-medium">
              {BG.footer.privacy}
            </Link>
            .
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(e) => {
                setAcceptPrivacy(e.target.checked);
                if (e.target.checked) setError('');
              }}
              required
              className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
            />
            <span className="text-sm text-slate-600 leading-relaxed">
              {BG.contact.agreePrivacy}{' '}
              <Link href="/privacy" target="_blank" className="text-primary hover:text-accent font-medium">
                {BG.footer.privacy}
              </Link>
            </span>
          </label>
          <button type="submit" className="btn-primary w-full">{BG.contact.send}</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-primary mb-2">{BG.contact.address}</h3>
          <p className="text-sm text-gray-600">София, България</p>
        </div>
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-primary mb-2">{BG.contact.phone}</h3>
          <p className="text-sm text-gray-600">+359 888 000 000</p>
        </div>
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-primary mb-2">{BG.contact.workingHours}</h3>
          <p className="text-sm text-gray-600">{BG.contact.workingHoursValue}</p>
        </div>
      </div>
    </div>
  );
}
