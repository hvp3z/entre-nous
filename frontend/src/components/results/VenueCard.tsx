'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Navigation, 
  Share2,
  Train,
  MapPin 
} from 'lucide-react';
import clsx from 'clsx';
import type { SearchResult, Location, Theme } from '@/stores/sessionStore';
import { AffiliateLink } from '@/components/monetization/AffiliateLink';

interface VenueCardProps {
  result: SearchResult;
  locations: Location[];
  theme: Theme;
  rank: number;
}

const themeConfig = {
  bars: { 
    accent: 'text-bars-600', 
    bg: 'bg-bars-50',
    badge: 'bg-bars-100 text-bars-700',
  },
  restaurants: { 
    accent: 'text-restaurants-600', 
    bg: 'bg-restaurants-50',
    badge: 'bg-restaurants-100 text-restaurants-700',
  },
  kids: { 
    accent: 'text-kids-600', 
    bg: 'bg-kids-50',
    badge: 'bg-kids-100 text-kids-700',
  },
};

export function VenueCard({ result, locations, theme, rank }: VenueCardProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  const [expanded, setExpanded] = useState(false);
  const { venue, travelTimes, averageTravelTime, variance } = result;

  const handleShare = async () => {
    const shareData = {
      title: venue.name,
      text: `Let's meet at ${venue.name}! Average travel time: ${Math.round(averageTravelTime)} min`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Could show a toast here
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const priceLevel = venue.priceLevel 
    ? '€'.repeat(venue.priceLevel) 
    : null;

  return (
    <div className="card overflow-hidden">
      {/* Image */}
      {venue.photos.length > 0 && (
        <div className="relative h-32 sm:h-40 bg-slate-200">
          <Image
            src={venue.photos[0]}
            alt={venue.name}
            fill
            className="object-cover"
            unoptimized // Google Places photos don't work well with Next.js optimization
          />
          <div className="absolute top-3 left-3">
            <span className={clsx('px-2.5 py-1 rounded-full text-sm font-medium', config.badge)}>
              #{rank}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-slate-900">{venue.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {venue.address}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{venue.rating.toFixed(1)}</span>
            <span className="text-sm text-slate-400">({venue.reviewCount})</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Average Travel Time */}
          <div className={clsx('flex items-center gap-1 px-2 py-1 rounded-lg text-sm', config.bg)}>
            <Clock className={clsx('w-4 h-4', config.accent)} />
            <span className={config.accent}>
              {t('results.avgTime', { time: Math.round(averageTravelTime) })}
            </span>
          </div>

          {/* Variance */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm bg-slate-100">
            <span className="text-slate-600">
              {t('results.variance', { time: Math.round(variance) })}
            </span>
          </div>

          {/* Price Level */}
          {priceLevel && (
            <span className="text-sm text-slate-600">{priceLevel}</span>
          )}

          {/* Open Status */}
          {venue.openNow !== undefined && (
            <span className={clsx(
              'text-sm font-medium',
              venue.openNow ? 'text-green-600' : 'text-red-600'
            )}>
              {venue.openNow ? t('results.openNow') : t('results.closed')}
            </span>
          )}
        </div>

        {/* Nearest Station */}
        {venue.nearestStation?.name && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <Train className="w-4 h-4" />
            <span>{venue.nearestStation.name}</span>
            {venue.nearestStation.lines?.length > 0 && (
              <div className="flex gap-1">
                {venue.nearestStation.lines.slice(0, 3).map((line) => (
                  <span
                    key={line}
                    className={`metro-line-${line.toLowerCase().replace(' ', '-')} 
                               px-1.5 py-0.5 rounded text-xs text-white font-medium`}
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expand/Collapse Travel Times */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 text-sm text-slate-600 
                   hover:text-slate-900 transition-colors"
        >
          <span>{t('results.travelTime')}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pb-3">
                {travelTimes.map((tt, index) => {
                  const location = locations.find((l) => l.id === tt.fromLocationId);
                  return (
                    <div
                      key={tt.fromLocationId}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-slate-600 truncate max-w-[200px]">
                        {index + 1}. {location?.address || 'Location'}
                      </span>
                      <span className="font-medium text-slate-900">
                        {Math.round(tt.minutes)} {t('common.minutes')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}&travelmode=transit`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-1 text-sm"
          >
            <Navigation className="w-4 h-4" />
            {t('results.getDirections')}
          </a>
          <button
            onClick={handleShare}
            className="btn-secondary px-3"
            aria-label={t('common.share')}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Affiliate link for restaurants */}
        {theme === 'restaurants' && (
          <div className="mt-3">
            <AffiliateLink venueName={venue.name} venueAddress={venue.address} />
          </div>
        )}
      </div>
    </div>
  );
}

