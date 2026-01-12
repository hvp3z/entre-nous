'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Navigation, Loader2, Search, X, Train } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { searchLocations, geocodePlace, reverseGeocode, type AutocompleteResult } from '@/lib/api';
import { searchStations, getLineColor } from '@/data/stations';
import { v4 as uuidv4 } from 'uuid';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const themeConfig = {
  bars: { 
    focusRing: 'focus:ring-bars-500/30 focus:border-bars-400',
    accentBg: 'bg-bars-500',
    accentText: 'text-bars-600',
  },
  restaurants: { 
    focusRing: 'focus:ring-restaurants-500/30 focus:border-restaurants-400',
    accentBg: 'bg-restaurants-500',
    accentText: 'text-restaurants-600',
  },
  cafes: { 
    focusRing: 'focus:ring-cafes-500/30 focus:border-cafes-400',
    accentBg: 'bg-cafes-500',
    accentText: 'text-cafes-600',
  },
  kids: { 
    focusRing: 'focus:ring-kids-500/30 focus:border-kids-400',
    accentBg: 'bg-kids-500',
    accentText: 'text-kids-600',
  },
};

export function LocationSearchModal({ isOpen, onClose, theme }: LocationSearchModalProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  
  const { addLocation } = useSessionStore();
  
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionTokenRef = useRef<string>(uuidv4());
  const debounceRef = useRef<NodeJS.Timeout>();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setSuggestions([]);
      setError(null);
      // Focus input after animation
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Search for suggestions (hybrid: stations + places)
  const searchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setError(null);

    // Search stations locally (instant)
    const stationResults = searchStations(query, 5);
    const stationSuggestions: AutocompleteResult[] = stationResults.map(station => ({
      placeId: `station-${station.id}`,
      description: station.name,
      mainText: station.name,
      secondaryText: t('location.metroStation', { lines: station.lines.join(', ') }),
      coordinates: station.coordinates,
      type: 'station' as const,
      station,
    }));

    // Show station results immediately
    setSuggestions(stationSuggestions);

    // Then search Google Places (async)
    setIsLoading(true);
    try {
      const placeResults = await searchLocations(query, sessionTokenRef.current);
      const placeSuggestions: AutocompleteResult[] = placeResults.map(place => ({
        ...place,
        type: 'place' as const,
      }));
      
      // Combine: stations first, then places
      setSuggestions([...stationSuggestions, ...placeSuggestions]);
    } catch (err) {
      // Keep station results even if Google Places fails
      if (stationSuggestions.length === 0) {
        setError(t('location.searchError'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Debounced input handler
  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchSuggestions(value);
    }, 300);
  };

  // Select a suggestion
  const handleSelectSuggestion = async (suggestion: AutocompleteResult) => {
    // Handle station selection directly (no API call needed)
    if (suggestion.type === 'station' && suggestion.station) {
      addLocation({
        id: uuidv4(),
        address: suggestion.station.name,
        coordinates: suggestion.station.coordinates,
        nearestStations: [{
          ...suggestion.station,
          walkingTimeMinutes: 0, // Already at the station
        }],
      });
      onClose();
      return;
    }

    // Handle place selection via geocoding API
    setIsLoading(true);

    try {
      const result = await geocodePlace(
        suggestion.placeId,
        suggestion.coordinates,
        suggestion.description
      );
      
      addLocation({
        id: uuidv4(),
        address: result.address,
        coordinates: result.coordinates,
        nearestStations: result.nearestStations,
      });

      sessionTokenRef.current = uuidv4();
      onClose();
    } catch (err) {
      setError(t('location.searchError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Use current location
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError(t('location.locationError'));
      return;
    }

    setIsGeolocating(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      const { latitude, longitude } = position.coords;
      const result = await reverseGeocode(latitude, longitude);

      addLocation({
        id: uuidv4(),
        address: result.address,
        coordinates: result.coordinates,
        nearestStations: result.nearestStations,
      });
      
      onClose();
    } catch (err) {
      setError(t('location.locationError'));
    } finally {
      setIsGeolocating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={onClose}
          />

          {/* Modal - Bottom Sheet on mobile, centered modal on desktop */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 lg:inset-auto lg:top-1/2 lg:left-1/2 
                       lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full lg:max-w-md
                       bg-white rounded-t-3xl lg:rounded-2xl z-50 
                       overflow-hidden flex flex-col shadow-2xl"
            style={{ maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-neutral-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1a1a1a]">
                  {t('location.addLocation')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-neutral-100 
                           text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={t('location.placeholder')}
                  className={clsx(
                    'w-full pl-12 pr-12 py-4 rounded-xl border-2 border-neutral-200',
                    'text-base placeholder:text-neutral-400',
                    'transition-all duration-200',
                    config.focusRing
                  )}
                  autoComplete="off"
                />
                {isLoading && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 animate-spin" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Geolocation Button */}
              <button
                onClick={handleUseCurrentLocation}
                disabled={isGeolocating}
                className={clsx(
                  'w-full flex items-center gap-4 px-4 py-4',
                  'text-left transition-colors',
                  'hover:bg-neutral-50 disabled:opacity-50',
                  'border-b border-neutral-100'
                )}
              >
                <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center', config.accentBg)}>
                  {isGeolocating ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Navigation className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#1a1a1a]">{t('location.useCurrentLocation')}</p>
                  <p className="text-sm text-neutral-500">GPS</p>
                </div>
              </button>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  {suggestions.map((suggestion) => {
                    const isStation = suggestion.type === 'station';
                    const primaryLineColor = isStation && suggestion.station 
                      ? getLineColor(suggestion.station.lines[0]) 
                      : null;
                    
                    return (
                      <button
                        key={suggestion.placeId}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="w-full flex items-start gap-4 px-4 py-4 text-left 
                                 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
                      >
                        {isStation ? (
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: primaryLineColor || '#666666' }}
                          >
                            <Train className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-neutral-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1a1a1a] truncate">{suggestion.mainText}</p>
                          <p className="text-sm text-neutral-500 truncate">{suggestion.secondaryText}</p>
                          {/* Show metro line badges for stations */}
                          {isStation && suggestion.station && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {suggestion.station.lines.slice(0, 4).map(line => (
                                <span
                                  key={line}
                                  className="inline-flex items-center justify-center px-1.5 py-0.5 
                                           text-xs font-bold text-white rounded"
                                  style={{ backgroundColor: getLineColor(line) }}
                                >
                                  {line}
                                </span>
                              ))}
                              {suggestion.station.lines.length > 4 && (
                                <span className="text-xs text-neutral-400">
                                  +{suggestion.station.lines.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Empty state */}
              {inputValue.length >= 2 && suggestions.length === 0 && !isLoading && (
                <div className="p-8 text-center text-neutral-500">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                  <p>{t('search.noResults')}</p>
                </div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4"
                  >
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Safe area for mobile */}
            <div className="h-safe-bottom bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
