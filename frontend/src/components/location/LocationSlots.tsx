'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Navigation, Plus, Loader2, X, Train, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { searchLocations, geocodePlace, reverseGeocode, type AutocompleteResult } from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';

interface LocationSlotsProps {
  theme: Theme;
}

const MAX_SLOTS = 6;
const MIN_REQUIRED = 2;

const themeConfig = {
  bars: { 
    focusRing: 'focus:ring-bars-500/20 focus:border-bars-400',
    activeBorder: 'border-bars-300',
    activeBg: 'bg-bars-50',
    activeText: 'text-bars-600',
    badge: 'bg-bars-500',
  },
  restaurants: { 
    focusRing: 'focus:ring-restaurants-500/20 focus:border-restaurants-400',
    activeBorder: 'border-restaurants-300',
    activeBg: 'bg-restaurants-50',
    activeText: 'text-restaurants-600',
    badge: 'bg-restaurants-500',
  },
  cafes: { 
    focusRing: 'focus:ring-cafes-500/20 focus:border-cafes-400',
    activeBorder: 'border-cafes-300',
    activeBg: 'bg-cafes-50',
    activeText: 'text-cafes-600',
    badge: 'bg-cafes-500',
  },
  kids: { 
    focusRing: 'focus:ring-kids-500/20 focus:border-kids-400',
    activeBorder: 'border-kids-300',
    activeBg: 'bg-kids-50',
    activeText: 'text-kids-600',
    badge: 'bg-kids-500',
  },
};

export function LocationSlots({ theme }: LocationSlotsProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  
  const { locations, addLocation, removeLocation } = useSessionStore();
  
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
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

  // Focus input when slot becomes active
  useEffect(() => {
    if (activeSlot !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeSlot]);

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
      closeInput();
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
      
      closeInput();
    } catch (err) {
      setError(t('location.locationError'));
    } finally {
      setIsGeolocating(false);
    }
  };

  const closeInput = () => {
    setActiveSlot(null);
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    setError(null);
  };

  // Close when clicking outside
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

  // Generate slots array
  const slots = Array.from({ length: MAX_SLOTS }, (_, index) => {
    const location = locations[index];
    const isRequired = index < MIN_REQUIRED;
    const isNextEmpty = !location && index === locations.length;
    const isFutureEmpty = !location && index > locations.length;
    
    return {
      index,
      location,
      isRequired,
      isNextEmpty,
      isFutureEmpty,
      isFilled: !!location,
    };
  });

  return (
    <div className="space-y-2">
      {slots.map((slot) => (
        <motion.div
          key={slot.index}
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: slot.index * 0.05 }}
        >
          {slot.isFilled ? (
            // Filled slot - show location
            <div className="card p-3">
              <div className="flex items-start gap-3">
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium text-white',
                  config.badge
                )}>
                  <Check className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1a1a1a] truncate">
                    {slot.location!.address}
                  </p>
                  
                  {slot.location!.nearestStations.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Train className="w-3.5 h-3.5 text-neutral-400" />
                      <p className="text-xs text-[#525252]">
                        {t('location.nearestStation', { 
                          station: slot.location!.nearestStations[0].name 
                        })}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeLocation(slot.location!.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 
                           hover:bg-neutral-100 transition-colors"
                  aria-label={t('location.remove')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : activeSlot === slot.index ? (
            // Active input slot
            <div className={clsx(
              'p-3 rounded-xl border-2',
              config.activeBorder,
              config.activeBg
            )}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-600">
                  Adresse {slot.index + 1}
                </span>
                <button
                  onClick={closeInput}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-white/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Geolocation option */}
              <button
                onClick={handleUseCurrentLocation}
                disabled={isGeolocating}
                className="w-full flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg border 
                         border-neutral-200 bg-white text-[#525252] hover:border-neutral-300
                         transition-colors disabled:opacity-50 text-sm"
              >
                {isGeolocating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                <span>{t('location.useCurrentLocation')}</span>
              </button>

              {/* Search input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  placeholder={t('location.placeholder')}
                  className={clsx(
                    'w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-200 bg-white',
                    'text-sm placeholder:text-neutral-400',
                    config.focusRing
                  )}
                />
                {isLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 animate-spin" />
                )}
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    ref={suggestionRef}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 
                               overflow-hidden max-h-48 overflow-y-auto"
                  >
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.placeId}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-neutral-50 
                                 transition-colors border-b border-neutral-100 last:border-0"
                      >
                        <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-[#1a1a1a]">{suggestion.mainText}</p>
                          <p className="text-xs text-[#525252]">{suggestion.secondaryText}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <p className="mt-2 text-xs text-red-600">{error}</p>
              )}
            </div>
          ) : (
            // Empty slot - clickable placeholder
            <button
              onClick={() => setActiveSlot(slot.index)}
              disabled={slot.isFutureEmpty}
              className={clsx(
                'w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed',
                'transition-all duration-200',
                slot.isNextEmpty && slot.isRequired
                  ? clsx(config.activeBorder, config.activeBg, config.activeText, 'font-medium')
                  : slot.isNextEmpty
                  ? 'border-neutral-300 text-neutral-500 hover:border-neutral-400 hover:bg-neutral-50'
                  : 'border-neutral-200 text-neutral-300 cursor-not-allowed'
              )}
            >
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium',
                slot.isNextEmpty && slot.isRequired
                  ? 'bg-white text-neutral-600 shadow-sm'
                  : slot.isNextEmpty
                  ? 'bg-neutral-100 text-neutral-500'
                  : 'bg-neutral-100 text-neutral-300'
              )}>
                {slot.index + 1}
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                {slot.isNextEmpty ? (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>
                      {slot.isRequired 
                        ? `Ajouter l'adresse ${slot.index + 1} (requis)`
                        : `Ajouter l'adresse ${slot.index + 1}`
                      }
                    </span>
                  </>
                ) : (
                  <span className="text-sm">Adresse {slot.index + 1}</span>
                )}
              </div>
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
}
