'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Train } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';

export function LocationList() {
  const t = useTranslations();
  const { locations, removeLocation } = useSessionStore();

  if (locations.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card p-3"
          >
            <div className="flex items-start gap-3">
              {/* Index Badge */}
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center 
                            justify-center flex-shrink-0 text-sm font-medium">
                {index + 1}
              </div>

              {/* Location Details */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1a1a1a] truncate">
                  {location.address}
                </p>
                
                {location.nearestStations.length > 0 && (
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
        ))}
      </AnimatePresence>
    </div>
  );
}

