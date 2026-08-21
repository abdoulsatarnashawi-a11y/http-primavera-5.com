'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const password = form.get('password') as string;
    const confirm = form.get('confirmPassword') as string;
    const acceptTerms = form.get('acceptTerms');
    if (!acceptTerms) {
      setError(BG.consent.termsRequired);
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError(BG.auth.passwordMismatch);
      setLoading(false);
      return;
    }
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        password,
        acceptTerms: true,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Грешка при регистрация');
      setLoading(false);
      return;
    }
    router.push('/');
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-2xl font-extrabold shadow-glow-red">
            P5
          </div>
          <h1 className="text-3xl font-extrabold section-title">{BG.auth.registerTitle}</h1>
        </div>
        <div className="card-glass p-8 shadow-card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-5 text-sm font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{BG.auth.name}</label>
              <input name="name" type="text" required className="input-field" />
            </div>
            <div>
              <label className="label">{BG.auth.email}</label>
              <input name="email" type="email" required className="input-field" />
            </div>
            <div>
              <label className="label">{BG.auth.phone}</label>
              <input name="phone" type="tel" className="input-field" />
            </div>
            <div>
              <label className="label">{BG.auth.password}</label>
              <input name="password" type="password" required minLength={6} className="input-field" />
            </div>
            <div>
              <label className="label">{BG.auth.confirmPassword}</label>
              <input name="confirmPassword" type="password" required className="input-field" />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                name="acceptTerms"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                {BG.consent.agreeTerms}{' '}
                <Link href="/terms" target="_blank" className="text-primary hover:text-accent font-medium">
                  {BG.footer.terms}
                </Link>{' '}
                {BG.consent.and}{' '}
                <Link href="/privacy" target="_blank" className="text-primary hover:text-accent font-medium">
                  {BG.footer.privacy}
                </Link>
              </span>
            </label>
            <button type="submit" disabled={loading} className="btn-accent w-full">
              {loading ? '...' : BG.auth.registerBtn}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-slate-500">
            {BG.auth.hasAccount}{' '}
            <Link href="/auth/login" className="text-primary hover:text-accent font-bold transition-colors">
              {BG.auth.loginHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
