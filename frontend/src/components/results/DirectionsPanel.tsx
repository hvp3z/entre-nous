'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Navigation, 
  Footprints, 
  Train, 
  ChevronRight,
  Clock
} from 'lucide-react';
import clsx from 'clsx';
import type { Venue, Location, Theme } from '@/stores/sessionStore';
import { getDirections, type RouteResult, type RouteSegment } from '@/lib/api';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface DirectionsPanelProps {
  venue: Venue;
  locations: Location[];
  theme: Theme;
  onClose: () => void;
}

const themeConfig = {
  bars: { accent: 'text-bars-500', bg: 'bg-bars-50' },
  restaurants: { accent: 'text-restaurants-500', bg: 'bg-restaurants-50' },
  cafes: { accent: 'text-cafes-500', bg: 'bg-cafes-50' },
  kids: { accent: 'text-kids-500', bg: 'bg-kids-50' },
};

const METRO_COLORS: Record<string, string> = {
  '1': '#FFCD00',
  '2': '#003CA6',
  '3': '#837902',
  '4': '#CF009E',
  '5': '#FF7E2E',
  '6': '#6ECA97',
  '7': '#FA9ABA',
  '8': '#E19BDF',
  '9': '#B6BD00',
  '10': '#C9910D',
  '11': '#704B1C',
  '12': '#007852',
  '13': '#6EC4E8',
  '14': '#62259D',
  'RER A': '#F7403A',
  'RER B': '#4B92DB',
  'RER C': '#F3D311',
  'RER D': '#5E9B41',
  'RER E': '#DE81D3',
};

export function DirectionsPanel({ venue, locations, theme, onClose }: DirectionsPanelProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  const [routes, setRoutes] = useState<RouteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    locations[0]?.id || null
  );

  useEffect(() => {
    const fetchDirections = async () => {
      setLoading(true);
      setError(null);

      try {
        const fromLocations = locations.map((loc) => ({
          id: loc.id,
          coordinates: loc.coordinates,
        }));

        const results = await getDirections(fromLocations, venue.coordinates);
        setRoutes(results);
      } catch (err) {
        setError('Failed to load directions');
      } finally {
        setLoading(false);
      }
    };

    fetchDirections();
  }, [locations, venue.coordinates]);

  const selectedRoute = routes.find((r) => r.fromLocationId === selectedLocationId);

  const getSegmentIcon = (type: RouteSegment['type']) => {
    switch (type) {
      case 'walk':
        return Footprints;
      case 'metro':
      case 'rer':
      case 'transilien':
        return Train;
      default:
        return Navigation;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl 
                   max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div>
            <h2 className="font-semibold text-[#1a1a1a]">{t('directions.title')}</h2>
            <p className="text-sm text-[#525252]">{venue.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Location Tabs */}
        <div className="flex overflow-x-auto border-b border-neutral-200 px-4">
          {locations.map((location, index) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocationId(location.id)}
              className={clsx(
                'flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                selectedLocationId === location.id
                  ? `border-[#1a1a1a] text-[#1a1a1a]`
                  : 'border-transparent text-[#525252] hover:text-[#1a1a1a]'
              )}
            >
              {index + 1}. {location.address.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-[#525252]">{error}</p>
            </div>
          ) : selectedRoute ? (
            <div className="space-y-3">
              {/* Total Time */}
              <div className={clsx('flex items-center gap-2 p-3 rounded-xl', config.bg)}>
                <Clock className={clsx('w-5 h-5', config.accent)} />
                <span className={clsx('font-medium', config.accent)}>
                  {t('directions.total', { time: selectedRoute.totalMinutes })}
                </span>
              </div>

              {/* Route Steps */}
              <div className="space-y-1">
                {selectedRoute.route.map((segment, index) => {
                  const Icon = getSegmentIcon(segment.type);
                  const lineColor = segment.line ? METRO_COLORS[segment.line] : null;

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50"
                    >
                      {/* Icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: lineColor || '#e5e5e5' }}
                      >
                        <Icon 
                          className={clsx(
                            'w-4 h-4',
                            lineColor ? 'text-white' : 'text-neutral-600'
                          )} 
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {segment.line && (
                            <span className="text-sm font-medium text-[#1a1a1a]">
                              {t(`directions.${segment.type}`)} {segment.line}
                            </span>
                          )}
                          {segment.type === 'walk' && (
                            <span className="text-sm font-medium text-[#1a1a1a]">
                              {t('directions.walk')}
                            </span>
                          )}
                          <span className="text-sm text-[#525252]">
                            {segment.durationMinutes} {t('common.minutes')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#525252] mt-0.5">
                          <span className="truncate">{segment.from}</span>
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{segment.to}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Open in Google Maps */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${locations.find(l => l.id === selectedLocationId)?.coordinates.lat},${locations.find(l => l.id === selectedLocationId)?.coordinates.lng}&destination=${venue.coordinates.lat},${venue.coordinates.lng}&travelmode=transit`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mt-4"
              >
                <Navigation className="w-5 h-5" />
                {t('results.getDirections')}
              </a>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#525252]">Select a starting point</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

