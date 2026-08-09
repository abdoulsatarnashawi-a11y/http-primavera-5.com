'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BG } from '@/lib/i18n';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || BG.auth.invalidCredentials);
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
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-extrabold shadow-glow-blue">
            P5
          </div>
          <h1 className="text-3xl font-extrabold section-title">{BG.auth.loginTitle}</h1>
        </div>
        <div className="card-glass p-8 shadow-card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-5 text-sm font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">{BG.auth.email}</label>
              <input name="email" type="email" required className="input-field" />
            </div>
            <div>
              <label className="label">{BG.auth.password}</label>
              <input name="password" type="password" required className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? '...' : BG.auth.loginBtn}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-slate-500">
            {BG.auth.noAccount}{' '}
            <Link href="/auth/register" className="text-primary hover:text-accent font-bold transition-colors">
              {BG.auth.registerHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
