export const CONSENT_STORAGE_KEY = 'primavera_cookie_consent';

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  timestamp: string;
};

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: Omit<ConsentPreferences, 'timestamp'>): ConsentPreferences {
  const consent: ConsentPreferences = {
    ...preferences,
    essential: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: consent }));
  return consent;
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent()?.analytics === true;
}
