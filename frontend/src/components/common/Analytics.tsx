'use client';

import Script from 'next/script';

/**
 * RGPD-friendly Analytics component
 * Supports Plausible (recommended) and Umami
 * Both are privacy-focused and don't require cookie consent
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;

  return (
    <>
      {/* Plausible Analytics - https://plausible.io */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* Umami Analytics - https://umami.is */}
      {umamiWebsiteId && umamiUrl && (
        <Script
          defer
          src={`${umamiUrl}/script.js`}
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/**
 * Track custom events (works with both Plausible and Umami)
 */
export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  // Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }

  // Umami
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, props);
  }
}

/**
 * Pre-defined events for Entre Nous
 */
export const AnalyticsEvents = {
  // Search events
  searchStarted: (theme: string, locationCount: number) => 
    trackEvent('search_started', { theme, location_count: locationCount }),
  
  searchCompleted: (theme: string, resultsCount: number) => 
    trackEvent('search_completed', { theme, results_count: resultsCount }),
  
  // Venue events
  venueViewed: (venueId: string, theme: string) => 
    trackEvent('venue_viewed', { venue_id: venueId, theme }),
  
  directionsRequested: (venueId: string) => 
    trackEvent('directions_requested', { venue_id: venueId }),
  
  // Share events
  searchShared: (theme: string) => 
    trackEvent('search_shared', { theme }),
  
  sharedLinkOpened: (searchId: string) => 
    trackEvent('shared_link_opened', { search_id: searchId }),
  
  // PWA events
  pwaInstalled: () => 
    trackEvent('pwa_installed'),
  
  // Language events
  languageChanged: (locale: string) => 
    trackEvent('language_changed', { locale }),
};

