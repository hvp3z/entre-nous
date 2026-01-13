'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle, SearchX } from 'lucide-react';
import clsx from 'clsx';
import { Header } from '@/components/common/Header';
import { LocationInput } from '@/components/location/LocationInput';
import { LocationSearchModal } from '@/components/location/LocationSearchModal';
import { LocationList } from '@/components/location/LocationList';
import { FilterChips } from '@/components/filters/FilterChips';
import { MapContainer } from '@/components/map/MapContainer';
import { ResultsList } from '@/components/results/ResultsList';
import { BottomSheet } from '@/components/results/BottomSheet';
import { MapListToggle } from '@/components/results/MapListToggle';
import { VenuePreviewCard } from '@/components/results/VenuePreviewCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SearchLoadingOverlay } from '@/components/common/SearchLoadingOverlay';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { searchEquidistant } from '@/lib/api';

interface ThemePageProps {
  theme: Theme;
  openModal?: boolean;
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
  cafes: {
    gradient: 'gradient-cafes',
    btnClass: 'btn-cafes',
    accentColor: 'text-cafes-500',
    bgColor: 'bg-cafes-50',
  },
  kids: {
    gradient: 'gradient-kids',
    btnClass: 'btn-kids',
    accentColor: 'text-kids-500',
    bgColor: 'bg-kids-50',
  },
};

export function ThemePage({ theme, openModal = false }: ThemePageProps) {
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
    mobileViewMode,
    setMobileViewMode,
    selectedVenue,
    setSelectedVenue,
    setHighlightedVenueId,
  } = useSessionStore();

  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Open modal automatically if openModal prop is true
  useEffect(() => {
    if (openModal) {
      setIsLocationModalOpen(true);
    }
  }, [openModal]);

  const handleSearch = useCallback(async () => {
    if (locations.length < 2) return;

    setIsSearching(true);
    setError(null);
    setSearchResults([]);
    setRelaxedVariance(null);
    setHasSearched(true);

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
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF7] to-[#FEF3E7] flex flex-col">
      <Header />

      {/* Theme Header */}
      <div className={clsx('px-4 py-4 sm:py-6 bg-orange-50/50')}>
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

            <LocationList />
            <LocationInput theme={theme} />
            
            {/* Location Search Modal (for auto-open from homepage) */}
            <LocationSearchModal
              isOpen={isLocationModalOpen}
              onClose={() => setIsLocationModalOpen(false)}
              theme={theme}
            />

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
                className={clsx(config.btnClass, 'w-full rounded-3xl')}
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

              {/* No Results Message */}
              <AnimatePresence>
                {hasSearched && !isSearching && searchResults.length === 0 && !error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center"
                  >
                    <SearchX className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="font-medium text-neutral-700">{t('search.noResults')}</p>
                    <p className="text-sm text-neutral-500 mt-1">{t('search.noResultsFilterHint')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Map Container - Normal flow on desktop, conditionally full screen on mobile */}
        <div className={clsx(
          'flex-1 relative lg:min-h-0 min-h-[400px]',
          // Hide on mobile when in map mode (we show full screen map separately)
          mobileViewMode === 'map' && searchResults.length > 0 && 'hidden lg:block'
        )}>
          <MapContainer theme={theme} showZoomControls={false} />
        </div>
      </div>

      {/* Full Screen Map (Mobile only - when in map mode) */}
      <AnimatePresence>
        {mobileViewMode === 'map' && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-white"
          >
            <MapContainer theme={theme} showZoomControls={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Bottom Sheet (Mobile) - Only show in list mode */}
      <BottomSheet
        isOpen={showBottomSheet && searchResults.length > 0 && mobileViewMode === 'list'}
        onClose={() => setShowBottomSheet(false)}
        theme={theme}
      >
        <ResultsList theme={theme} />
      </BottomSheet>

      {/* Map/List Toggle FAB (Mobile only) */}
      <MapListToggle theme={theme} />

      {/* Venue Preview Card (Mobile map view only) */}
      <AnimatePresence>
        {selectedVenue && mobileViewMode === 'map' && (
          <VenuePreviewCard
            result={searchResults.find((r) => r.venue.id === selectedVenue.id)!}
            theme={theme}
            onTap={() => {
              // Switch to list view and highlight the venue
              setHighlightedVenueId(selectedVenue.id);
              setMobileViewMode('list');
              setShowBottomSheet(true);
              setSelectedVenue(null);
            }}
            onDirections={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${selectedVenue.coordinates.lat},${selectedVenue.coordinates.lng}&travelmode=transit`,
                '_blank'
              );
            }}
          />
        )}
      </AnimatePresence>

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

      {/* Full-screen Search Loading Overlay */}
      <SearchLoadingOverlay isVisible={isSearching} />
    </div>
  );
}

