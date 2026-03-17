'use client';

import Script from 'next/script';

/**
 * Analytics component
 * Supports Google Analytics 4, Plausible and Umami
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* Google Analytics 4 */}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `}
          </Script>
        </>
      )}

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
 * Pre-defined events for Le Middle
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

