'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { Header } from '@/components/common/Header';
import { LocationInput } from '@/components/location/LocationInput';
import { LocationList } from '@/components/location/LocationList';
import { FilterChips } from '@/components/filters/FilterChips';
import { MapContainer } from '@/components/map/MapContainer';
import { ResultsList } from '@/components/results/ResultsList';
import { BottomSheet } from '@/components/results/BottomSheet';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { searchEquidistant } from '@/lib/api';

interface ThemePageProps {
  theme: Theme;
}

const themeConfig = {
  bars: {
    gradient: 'gradient-bars',
    btnClass: 'btn-bars',
    accentColor: 'text-bars-500',
    bgColor: 'bg-bars-50',
  },
  restaurants: {
    gradient: 'gradient-restaurants',
    btnClass: 'btn-restaurants',
    accentColor: 'text-restaurants-500',
    bgColor: 'bg-restaurants-50',
  },
  kids: {
    gradient: 'gradient-kids',
    btnClass: 'btn-kids',
    accentColor: 'text-kids-500',
    bgColor: 'bg-kids-50',
  },
};

export function ThemePage({ theme }: ThemePageProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  
  const {
    locations,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    relaxedVariance,
    setRelaxedVariance,
    showBottomSheet,
    setShowBottomSheet,
    selectedFilters,
  } = useSessionStore();

  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (locations.length < 2) return;

    setIsSearching(true);
    setError(null);
    setSearchResults([]);
    setRelaxedVariance(null);

    // Get active filters for current theme
    const activeFilters = selectedFilters[theme] || {};
    const hasFilters = Object.values(activeFilters).some(
      (options) => options && options.length > 0
    );

    try {
      const response = await searchEquidistant({
        locations,
        theme,
        filters: hasFilters ? activeFilters : undefined,
      });

      setSearchResults(response.results);
      if (response.relaxedVariance) {
        setRelaxedVariance(response.relaxedVariance);
      }
      
      if (response.results.length > 0) {
        setShowBottomSheet(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsSearching(false);
    }
  }, [locations, theme, selectedFilters, setIsSearching, setSearchResults, setRelaxedVariance, setShowBottomSheet]);

  const canSearch = locations.length >= 2 && !isSearching;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />

      {/* Theme Header */}
      <div className={clsx('px-4 py-4 sm:py-6', config.bgColor)}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-1">
            {t(`themes.${theme}.title`)}
          </h1>
          <p className={clsx('text-sm font-medium', config.accentColor)}>
            {t(`themes.${theme}.subtitle`)}
          </p>
        </div>
      </div>

      {/* Filter Chips - Horizontal scrollable on mobile */}
      <FilterChips theme={theme} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar - Location Input (Desktop) */}
        <div className="lg:w-96 lg:border-r lg:border-neutral-200 bg-white p-4 lg:overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-[#1a1a1a] mb-1">
                {t('location.title')}
              </h2>
              <p className="text-sm text-[#525252]">
                {t('location.subtitle')}
              </p>
            </div>

            <LocationInput theme={theme} />
            <LocationList />

            {/* Search Button */}
            <div className="pt-2">
              {locations.length < 2 && (
                <p className="text-sm text-[#525252] mb-3 text-center">
                  {t('location.minLocations')}
                </p>
              )}

              <button
                onClick={handleSearch}
                disabled={!canSearch}
                className={clsx(config.btnClass, 'w-full')}
              >
                {isSearching ? (
                  <>
                    <LoadingSpinner size="sm" className="border-white/30 border-t-white" />
                    {t('search.searching')}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {t('search.findPlaces')}
                  </>
                )}
              </button>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Relaxed Search Notice */}
              <AnimatePresence>
                {relaxedVariance && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100"
                  >
                    <p className="text-sm text-amber-700">
                      {t('search.relaxedSearch', { minutes: relaxedVariance })}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0">
          <MapContainer theme={theme} />
        </div>
      </div>

      {/* Results Bottom Sheet (Mobile) */}
      <BottomSheet
        isOpen={showBottomSheet && searchResults.length > 0}
        onClose={() => setShowBottomSheet(false)}
        theme={theme}
      >
        <ResultsList theme={theme} />
      </BottomSheet>

      {/* Results Panel (Desktop) */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden lg:block fixed right-0 top-16 bottom-0 w-96 
                       bg-white border-l border-neutral-200 overflow-y-auto z-40"
          >
            <div className="p-4">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">
                {t('results.title')}
              </h2>
              <ResultsList theme={theme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

