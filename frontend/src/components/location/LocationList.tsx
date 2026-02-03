'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Train, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';
import { useSessionStore } from '@/stores/sessionStore';
import { isInPetiteCouronne } from '@/lib/api';

export function LocationList() {
  const t = useTranslations();
  const { locations, removeLocation } = useSessionStore();

  if (locations.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {locations.map((location, index) => {
          const isOutOfZone = !isInPetiteCouronne(
            location.coordinates.lat,
            location.coordinates.lng
          );
          
          return (
            <motion.div
              key={location.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={clsx(
                "card p-3",
                isOutOfZone && "border-amber-300 bg-amber-50/50"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Index Badge */}
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium text-white",
                  isOutOfZone ? "bg-amber-500" : "bg-[#1a1a1a]"
                )}>
                  {isOutOfZone ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Location Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1a1a1a] truncate">
                    {location.address}
                  </p>
                  
                  {isOutOfZone ? (
                    <p className="text-xs text-amber-700 mt-1">
                      {t('location.outOfZoneWarningShort')}
                    </p>
                  ) : location.nearestStations.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Train className="w-3.5 h-3.5 text-neutral-400" />
                      <p className="text-xs text-[#525252]">
                        {t('location.nearestStation', { 
                          station: location.nearestStations[0].name 
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeLocation(location.id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 
                           hover:bg-neutral-100 transition-colors"
                  aria-label={t('location.remove')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

