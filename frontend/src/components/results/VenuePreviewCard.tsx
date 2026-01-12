'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Navigation, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import type { SearchResult, Theme } from '@/stores/sessionStore';

interface VenuePreviewCardProps {
  result: SearchResult;
  theme: Theme;
  onTap: () => void;
  onDirections: () => void;
}

const themeConfig = {
  bars: {
    accent: 'text-bars-500',
    bg: 'bg-bars-50',
    border: 'border-bars-200',
  },
  restaurants: {
    accent: 'text-restaurants-500',
    bg: 'bg-restaurants-50',
    border: 'border-restaurants-200',
  },
  kids: {
    accent: 'text-kids-500',
    bg: 'bg-kids-50',
    border: 'border-kids-200',
  },
};

const fallbackImages: Record<Theme, string> = {
  restaurants: '/images/fallback-restaurants.svg',
  bars: '/images/fallback-bars.svg',
  kids: '/images/fallback-kids.svg',
};

export function VenuePreviewCard({ result, theme, onTap, onDirections }: VenuePreviewCardProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  const [imageError, setImageError] = useState(false);
  const { venue, averageTravelTime } = result;

  const hasValidPhoto = venue.photos.length > 0 && venue.photos[0] && !imageError;
  const imageSrc = hasValidPhoto ? venue.photos[0] : fallbackImages[theme];

  const handleDirectionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDirections();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="lg:hidden fixed inset-x-4 z-50 cursor-pointer"
      style={{ bottom: 'max(5rem, env(safe-area-inset-bottom, 0px) + 4.5rem)' }}
      onClick={onTap}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
        <div className="flex items-stretch">
          {/* Photo */}
          <div className="relative w-24 h-24 flex-shrink-0 bg-neutral-200">
            {hasValidPhoto ? (
              <Image
                src={imageSrc}
                alt={venue.name}
                fill
                className="object-cover"
                unoptimized
                onError={() => setImageError(true)}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={imageSrc}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 min-w-0 flex flex-col justify-center">
            <h3 className="font-semibold text-[#1a1a1a] truncate pr-2">
              {venue.name}
            </h3>
            
            <div className="flex items-center gap-3 mt-1.5 text-sm">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">{venue.rating.toFixed(1)}</span>
                <span className="text-neutral-400">({venue.reviewCount})</span>
              </div>

              {/* Separator */}
              <span className="text-neutral-300">·</span>

              {/* Travel Time */}
              <div className={clsx('flex items-center gap-1', config.accent)}>
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  ~{Math.round(averageTravelTime)} {t('common.minutes')}
                </span>
              </div>
            </div>

            {/* Tap hint */}
            <div className="flex items-center gap-1 mt-1.5 text-xs text-neutral-400">
              <span>{t('results.viewDetails')}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>

          {/* Directions Button */}
          <button
            onClick={handleDirectionsClick}
            className={clsx(
              'flex items-center justify-center w-14 flex-shrink-0',
              'bg-neutral-50 hover:bg-neutral-100 transition-colors',
              'border-l border-neutral-100'
            )}
            aria-label={t('results.getDirections')}
          >
            <Navigation className={clsx('w-5 h-5', config.accent)} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
