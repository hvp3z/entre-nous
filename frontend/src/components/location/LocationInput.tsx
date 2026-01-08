'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Navigation, Plus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { searchLocations, geocodePlace, reverseGeocode, type AutocompleteResult } from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';

interface LocationInputProps {
  theme: Theme;
}

const themeConfig = {
  bars: { focusRing: 'focus:ring-bars-500/20 focus:border-bars-400' },
  restaurants: { focusRing: 'focus:ring-restaurants-500/20 focus:border-restaurants-400' },
  kids: { focusRing: 'focus:ring-kids-500/20 focus:border-kids-400' },
};

export function LocationInput({ theme }: LocationInputProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  
  const { locations, addLocation } = useSessionStore();
  
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<string>(uuidv4());
  const debounceRef = useRef<NodeJS.Timeout>();

  const canAddMore = locations.length < 6;

  // Search for suggestions
  const searchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchLocations(query, sessionTokenRef.current);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (err) {
      setError(t('location.searchError'));
      setSuggestions([]);
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
    setIsLoading(true);
    setShowSuggestions(false);
    setInputValue('');

    try {
      // Pass coordinates directly if available (from Photon API)
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

      // Reset session token for next search
      sessionTokenRef.current = uuidv4();
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
    } catch (err) {
      setError(t('location.locationError'));
    } finally {
      setIsGeolocating(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!canAddMore) {
    return (
      <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl">
        {t('location.maxLocations')}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Current Location Button */}
      <button
        onClick={handleUseCurrentLocation}
        disabled={isGeolocating}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed 
                   border-neutral-200 text-[#525252] hover:border-neutral-300 hover:bg-neutral-50
                   transition-colors disabled:opacity-50"
      >
        {isGeolocating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Navigation className="w-5 h-5" />
        )}
        <span className="font-medium">{t('location.useCurrentLocation')}</span>
      </button>

      {/* Address Input */}
      <div className="relative">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder={t('location.placeholder')}
            className={clsx(
              'input pl-12 pr-12',
              config.focusRing
            )}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 animate-spin" />
          )}
          {!isLoading && inputValue && (
            <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          )}
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 
                         overflow-hidden max-h-64 overflow-y-auto"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.placeId}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-neutral-50 
                           transition-colors border-b border-neutral-100 last:border-0"
                >
                  <MapPin className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1a1a1a]">{suggestion.mainText}</p>
                    <p className="text-sm text-[#525252]">{suggestion.secondaryText}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

