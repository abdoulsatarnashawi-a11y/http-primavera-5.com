'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { hasAnalyticsConsent } from '@/lib/consent';

function trackVisit() {
  let sessionId = localStorage.getItem('visitor_session');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('visitor_session', sessionId);
  }
  fetch('/api/visitors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  }).catch(() => {});
}

function clearVisitorSession() {
  localStorage.removeItem('visitor_session');
}

export default function VisitorTracker() {
  useEffect(() => {
    function handleConsent() {
      if (hasAnalyticsConsent()) {
        trackVisit();
      } else {
        clearVisitorSession();
      }
    }

    handleConsent();
    window.addEventListener('consent-updated', handleConsent);
    return () => window.removeEventListener('consent-updated', handleConsent);
  }, []);

  return null;
}
