// ---------------------------------------------------------------------------
// JSON-LD builder helpers — pure functions, NO 'use client'.
// Importable from both Server and Client Components.
// ---------------------------------------------------------------------------

/**
 * Build a WebApplication JSON-LD object for the main layout.
 */
export function buildWebApplicationJsonLd(
  siteUrl: string,
  locale: string,
  description: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Le Middle',
    description,
    url: siteUrl,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Île-de-France',
      },
    },
    availableLanguage: ['fr', 'en'],
    inLanguage: locale,
  };
}

/**
 * Build a BreadcrumbList JSON-LD object.
 */
export function buildBreadcrumbJsonLd(
  siteUrl: string,
  locale: string,
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };
}

/**
 * Build a LocalBusiness / BarOrPub / Restaurant / CafeOrCoffeeShop JSON-LD
 * from venue details.
 */
export function buildVenueJsonLd(venue: {
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  priceLevel?: number;
  phoneNumber?: string;
  website?: string;
  openingHours?: string[];
  photos: string[];
  types: string[];
}): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(venue.types),
    name: venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.coordinates.lat,
      longitude: venue.coordinates.lng,
    },
  };

  if (venue.phoneNumber) {
    data.telephone = venue.phoneNumber;
  }

  if (venue.website) {
    data.url = venue.website;
  }

  if (venue.rating && venue.reviewCount) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (venue.priceLevel) {
    data.priceRange = '€'.repeat(venue.priceLevel);
  }

  if (venue.photos.length > 0) {
    data.image = venue.photos[0];
  }

  if (venue.openingHours && venue.openingHours.length > 0) {
    const specs = parseOpeningHours(venue.openingHours);
    if (specs) {
      data.openingHoursSpecification = specs;
    }
  }

  return data;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function getSchemaType(types: string[]): string {
  const typeSet = new Set(types.map((t) => t.toLowerCase()));
  if (typeSet.has('bar') || typeSet.has('night_club')) return 'BarOrPub';
  if (typeSet.has('restaurant') || typeSet.has('meal_delivery') || typeSet.has('meal_takeaway'))
    return 'Restaurant';
  if (typeSet.has('cafe') || typeSet.has('bakery')) return 'CafeOrCoffeeShop';
  return 'LocalBusiness';
}

/**
 * Best-effort parser for Google Places opening-hours strings.
 * Handles formats like "Monday: 9:00 AM – 5:00 PM" and "Lundi: 09:00 – 17:00".
 */
function parseOpeningHours(hours: string[]): object[] | undefined {
  const dayMap: Record<string, string> = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
    Lundi: 'Monday',
    Mardi: 'Tuesday',
    Mercredi: 'Wednesday',
    Jeudi: 'Thursday',
    Vendredi: 'Friday',
    Samedi: 'Saturday',
    Dimanche: 'Sunday',
  };

  try {
    const specs = hours
      .map((line) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return null;

        const dayStr = line.substring(0, colonIdx).trim();
        const timeStr = line.substring(colonIdx + 1).trim();

        const day = dayMap[dayStr];
        if (!day) return null;

        // "Closed" / "Fermé"
        if (/closed|ferm[ée]/i.test(timeStr)) return null;

        // "Open 24 hours" / "Ouvert 24h/24"
        if (/open\s*24|ouvert\s*24/i.test(timeStr)) {
          return {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: day,
            opens: '00:00',
            closes: '23:59',
          };
        }

        const timeParts = timeStr.split(/\s*[-–—]\s*/);
        if (timeParts.length !== 2) return null;

        const opens = normalizeTime(timeParts[0].trim());
        const closes = normalizeTime(timeParts[1].trim());
        if (!opens || !closes) return null;

        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day,
          opens,
          closes,
        };
      })
      .filter((spec): spec is NonNullable<typeof spec> => spec !== null);

    return specs.length > 0 ? specs : undefined;
  } catch {
    return undefined;
  }
}

/** Normalise a time string to HH:MM (24 h). */
function normalizeTime(time: string): string | null {
  // 12 h — "9:00 AM", "5:00PM"
  const match12 = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let h = parseInt(match12[1], 10);
    const m = match12[2];
    const p = match12[3].toUpperCase();
    if (p === 'PM' && h < 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    return `${h.toString().padStart(2, '0')}:${m}`;
  }

  // 24 h — "09:00", "17:00"
  const match24 = time.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    return `${match24[1].padStart(2, '0')}:${match24[2]}`;
  }

  // French — "09h00", "17h00"
  const matchFr = time.match(/^(\d{1,2})h(\d{2})$/i);
  if (matchFr) {
    return `${matchFr[1].padStart(2, '0')}:${matchFr[2]}`;
  }

  return null;
}
