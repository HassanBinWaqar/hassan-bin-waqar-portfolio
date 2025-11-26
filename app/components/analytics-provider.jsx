"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, initSessionTracking } from '@/utils/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize session tracking
    const cleanup = initSessionTracking();
    return cleanup;
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname, document.title);
    }
  }, [pathname]);

  return null;
}
