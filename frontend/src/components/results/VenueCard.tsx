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
  MapPin,
  Heart,
  ArrowRight
} from 'lucide-react';
import clsx from 'clsx';
import type { SearchResult, Location, Theme } from '@/stores/sessionStore';
import { AffiliateLink } from '@/components/monetization/AffiliateLink';

interface VenueCardProps {
  result: SearchResult;
  locations: Location[];
  theme: Theme;
  rank: number;
  isHighlighted?: boolean;
}

const themeConfig = {
  bars: { 
    accent: 'text-bars-500', 
    bg: 'bg-bars-50',
    badge: 'bg-bars-100 text-bars-600',
  },
  restaurants: { 
    accent: 'text-restaurants-500', 
    bg: 'bg-restaurants-50',
    badge: 'bg-restaurants-100 text-restaurants-600',
  },
  cafes: { 
    accent: 'text-cafes-500', 
    bg: 'bg-cafes-50',
    badge: 'bg-cafes-100 text-cafes-600',
  },
  kids: { 
    accent: 'text-kids-500', 
    bg: 'bg-kids-50',
    badge: 'bg-kids-100 text-kids-600',
  },
};

const fallbackImages: Record<Theme, string> = {
  restaurants: '/images/fallback-restaurants.svg',
  bars: '/images/fallback-bars.svg',
  cafes: '/images/fallback-restaurants.svg',
  kids: '/images/fallback-kids.svg',
};

export function VenueCard({ result, locations, theme, rank, isHighlighted = false }: VenueCardProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { venue, travelTimes, averageTravelTime, variance } = result;
  
  // Determine if we should use fallback image
  const hasValidPhoto = venue.photos.length > 0 && venue.photos[0] && !imageError;
  const imageSrc = hasValidPhoto ? venue.photos[0] : fallbackImages[theme];

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
    <div className={clsx(
      'card overflow-hidden transition-all duration-300',
      isHighlighted && 'ring-2 ring-offset-2 ring-orange-400 animate-pulse'
    )}>
      {/* Image */}
      <div className="relative h-48 sm:h-56 bg-neutral-200 overflow-hidden rounded-t-3xl">
        {hasValidPhoto ? (
          <Image
            src={imageSrc}
            alt={venue.name}
            fill
            className="object-cover rounded-t-3xl"
            unoptimized // Google Places photos don't work well with Next.js optimization
            onError={() => setImageError(true)}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={venue.name}
            className="w-full h-full object-cover rounded-t-3xl"
          />
        )}
        
        {/* Badge "#1 Le Middle Choice" en haut à gauche */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/95 backdrop-blur-sm border border-orange-100 text-orange-600 shadow-sm">
            #{rank} Le Middle Choice
          </span>
        </div>

        {/* Badge temps avec icône horloge en bas à gauche */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50/95 backdrop-blur-sm border border-orange-200 text-orange-700 shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">
              ~{Math.round(averageTravelTime)} min {variance <= 3 && '(Équitable)'}
            </span>
          </div>
        </div>

        {/* Bouton cœur corail en bas à droite */}
        <button
          className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
          aria-label="Favoris"
        >
          <Heart className="w-5 h-5 text-coral-500 fill-coral-500" />
        </button>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-[#1a1a1a]">{venue.name}</h3>
            <p className="text-sm text-[#525252] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {venue.address}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{venue.rating.toFixed(1)}</span>
            <span className="text-sm text-neutral-400">({venue.reviewCount})</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Price Level */}
          {priceLevel && (
            <span className="text-sm text-[#525252]">{priceLevel}</span>
          )}

          {/* Open Status */}
          {venue.openNow !== undefined && (
            <span className={clsx(
              'text-sm font-medium flex items-center gap-1',
              venue.openNow ? 'text-green-600' : 'text-red-600'
            )}>
              <span className={clsx('w-2 h-2 rounded-full', venue.openNow ? 'bg-green-500' : 'bg-red-500')} />
              {venue.openNow ? t('results.openNow') : t('results.closed')}
            </span>
          )}
        </div>

        {/* Nearest Station */}
        {venue.nearestStation?.name && (
          <div className="flex items-center gap-2 text-sm text-[#525252] mb-3">
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
          className="w-full flex items-center justify-between py-2 text-sm text-[#525252] 
                   hover:text-[#1a1a1a] transition-colors"
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
                      <span className="text-[#525252] truncate max-w-[200px]">
                        {index + 1}. {location?.address || 'Location'}
                      </span>
                      <span className="font-medium text-[#1a1a1a]">
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
        <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-100">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}&travelmode=transit`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm font-semibold text-white rounded-3xl px-4 py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg active:scale-[0.98] min-h-[44px] gradient-orange-coral"
          >
            {t('results.getDirections')}
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={handleShare}
            className="px-3 py-3 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t('common.share')}
          >
            <Share2 className="w-4 h-4 text-[#525252]" />
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

