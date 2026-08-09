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
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card p-8">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">{BG.auth.registerTitle}</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}
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
          <button type="submit" disabled={loading} className="btn-accent w-full">
            {loading ? '...' : BG.auth.registerBtn}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          {BG.auth.hasAccount}{' '}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            {BG.auth.loginHere}
          </Link>
        </p>
      </div>
    </div>
  );
}
