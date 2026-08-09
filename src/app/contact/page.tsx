'use client';

import { useState } from 'react';
import { BG } from '@/lib/i18n';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
