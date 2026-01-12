'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Map, List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';

interface MapListToggleProps {
  theme: Theme;
}

const themeConfig = {
  bars: {
    bgClass: 'bg-bars-500 hover:bg-bars-600',
    shadowClass: 'shadow-bars-500/30',
  },
  restaurants: {
    bgClass: 'bg-restaurants-500 hover:bg-restaurants-600',
    shadowClass: 'shadow-restaurants-500/30',
  },
  cafes: {
    bgClass: 'bg-cafes-500 hover:bg-cafes-600',
    shadowClass: 'shadow-cafes-500/30',
  },
  kids: {
    bgClass: 'bg-kids-500 hover:bg-kids-600',
    shadowClass: 'shadow-kids-500/30',
  },
};

export function MapListToggle({ theme }: MapListToggleProps) {
  const t = useTranslations();
  const { mobileViewMode, setMobileViewMode, searchResults, showBottomSheet } = useSessionStore();
  const config = themeConfig[theme];

  const isMapView = mobileViewMode === 'map';
  const resultsCount = searchResults.length;

  // Show toggle only when bottom sheet is open OR when in map view (to switch back)
  const shouldShow = resultsCount > 0 && (showBottomSheet || isMapView);

  const handleToggle = () => {
    setMobileViewMode(isMapView ? 'list' : 'map');
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="lg:hidden fixed inset-x-0 flex justify-center z-[60]"
          style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px) + 1rem)' }}
        >
          <button
            onClick={handleToggle}
            className={clsx(
              'flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium',
              'shadow-lg transition-all duration-200 active:scale-95',
              config.bgClass,
              config.shadowClass
            )}
          >
            <motion.div
              key={isMapView ? 'list' : 'map'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMapView ? (
                <List className="w-5 h-5" />
              ) : (
                <Map className="w-5 h-5" />
              )}
            </motion.div>
            <span>
              {isMapView
                ? t('toggle.list', { count: resultsCount })
                : t('toggle.map')}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
