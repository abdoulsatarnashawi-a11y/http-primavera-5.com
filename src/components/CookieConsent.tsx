'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BG } from '@/lib/i18n';
import {
  getStoredConsent,
  saveConsent,
} from '@/lib/consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function applyConsent(preferences: { analytics: boolean }) {
    saveConsent({ essential: true, analytics: preferences.analytics });
    setVisible(false);
    setShowSettings(false);
  }

  function handleAcceptAll() {
    applyConsent({ analytics: true });
  }

  function handleRejectOptional() {
    applyConsent({ analytics: false });
  }

  function handleSaveSettings() {
    applyConsent({ analytics });
  }

  if (!visible) {
    return <CookieSettingsButton />;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[998] backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="card-glass p-6 md:p-8 shadow-elevated border border-white/60">
            <h2 id="cookie-consent-title" className="text-lg font-bold text-primary mb-2">
              {BG.consent.bannerTitle}
            </h2>
            <p id="cookie-consent-desc" className="text-sm text-slate-600 mb-4 leading-relaxed">
              {BG.consent.bannerText}{' '}
              <Link href="/consent" className="text-primary hover:underline font-medium">
                {BG.consent.learnMore}
              </Link>
              {' · '}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                {BG.footer.privacy}
              </Link>
            </p>

            {showSettings && (
              <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{BG.consent.essentialTitle}</p>
                    <p className="text-xs text-slate-500">{BG.consent.essentialDesc}</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg shrink-0">
                    {BG.consent.alwaysOn}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{BG.consent.analyticsTitle}</p>
                    <p className="text-xs text-slate-500">{BG.consent.analyticsDesc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button onClick={handleAcceptAll} className="btn-accent text-sm py-2.5 px-5 flex-1">
                {BG.consent.acceptAll}
              </button>
              <button onClick={handleRejectOptional} className="btn-outline text-sm py-2.5 px-5 flex-1">
                {BG.consent.rejectOptional}
              </button>
              <button
                onClick={() => (showSettings ? handleSaveSettings() : setShowSettings(true))}
                className="text-sm py-2.5 px-5 flex-1 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {showSettings ? BG.consent.saveSettings : BG.consent.customize}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CookieSettingsButton() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setHasConsent(!!getStoredConsent());

    function onConsentUpdate() {
      setHasConsent(true);
    }
    window.addEventListener('consent-updated', onConsentUpdate);
    return () => window.removeEventListener('consent-updated', onConsentUpdate);
  }, []);

  if (!hasConsent) return null;

  return (
    <button
      onClick={() => {
        localStorage.removeItem('primavera_cookie_consent');
        window.location.reload();
      }}
      className="fixed bottom-4 left-4 z-[997] text-xs bg-white/90 backdrop-blur border border-slate-200 text-slate-600 px-3 py-2 rounded-lg shadow-card hover:shadow-card-hover transition-all"
      aria-label={BG.consent.settingsBtn}
    >
      🍪 {BG.consent.settingsBtn}
    </button>
  );
}
