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
      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      }),
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
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">{BG.auth.loginTitle}</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
        <p className="text-center mt-4 text-sm text-gray-600">
          {BG.auth.noAccount}{' '}
          <Link href="/auth/register" className="text-primary hover:underline font-medium">
            {BG.auth.registerHere}
          </Link>
        </p>
      </div>
    </div>
  );
}
