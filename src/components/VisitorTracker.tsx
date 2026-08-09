'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function VisitorTracker() {
  useEffect(() => {
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
  }, []);

  return null;
}
