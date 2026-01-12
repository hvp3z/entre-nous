'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, MapPinPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { LocationSearchModal } from './LocationSearchModal';

interface LocationInputProps {
  theme: Theme;
}

const themeConfig = {
  bars: { 
    borderHover: 'hover:border-bars-400 hover:text-bars-600',
    bgHover: 'hover:bg-bars-50',
    iconColor: 'group-hover:text-bars-500',
  },
  restaurants: { 
    borderHover: 'hover:border-restaurants-400 hover:text-restaurants-600',
    bgHover: 'hover:bg-restaurants-50',
    iconColor: 'group-hover:text-restaurants-500',
  },
  kids: { 
    borderHover: 'hover:border-kids-400 hover:text-kids-600',
    bgHover: 'hover:bg-kids-50',
    iconColor: 'group-hover:text-kids-500',
  },
  cafes: { 
    borderHover: 'hover:border-cafes-400 hover:text-cafes-600',
    bgHover: 'hover:bg-cafes-50',
    iconColor: 'group-hover:text-cafes-500',
  },
};

export function LocationInput({ theme }: LocationInputProps) {
  const t = useTranslations();
  const config = themeConfig[theme];
  
  const { locations } = useSessionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canAddMore = locations.length < 6;

  if (!canAddMore) {
    return (
      <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl">
        {t('location.maxLocations')}
      </p>
    );
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className={clsx(
          'w-full flex items-center gap-4 py-4 px-4',
          'border-2 border-dashed border-neutral-300 rounded-xl',
          'text-neutral-500 font-medium',
          'transition-all duration-200',
          config.borderHover,
          config.bgHover,
          'group'
        )}
      >
        <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-white 
                        flex items-center justify-center transition-colors">
          <MapPinPlus className={clsx('w-5 h-5 text-neutral-400 transition-colors', config.iconColor)} />
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium">{t('location.addLocation')}</p>
          <p className="text-sm text-neutral-400">{t('location.placeholder')}</p>
        </div>
        <Plus className={clsx('w-5 h-5 text-neutral-400 transition-colors', config.iconColor)} />
      </motion.button>

      {/* Search Modal */}
      <LocationSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
      />
    </>
  );
}
