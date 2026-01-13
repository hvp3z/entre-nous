'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Wine, UtensilsCrossed, Baby, Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useSessionStore, type Theme } from '@/stores/sessionStore';

interface ThemeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themes = [
  {
    id: 'bars' as const,
    icon: Wine,
    gradient: 'gradient-bars',
    hoverBg: 'hover:bg-bars-50',
    borderColor: 'border-neutral-200 hover:border-bars-300',
    iconColor: 'text-bars-500',
  },
  {
    id: 'restaurants' as const,
    icon: UtensilsCrossed,
    gradient: 'gradient-restaurants',
    hoverBg: 'hover:bg-restaurants-50',
    borderColor: 'border-neutral-200 hover:border-restaurants-300',
    iconColor: 'text-restaurants-500',
  },
  {
    id: 'cafes' as const,
    icon: Coffee,
    gradient: 'gradient-cafes',
    hoverBg: 'hover:bg-cafes-50',
    borderColor: 'border-neutral-200 hover:border-cafes-300',
    iconColor: 'text-cafes-500',
  },
  {
    id: 'kids' as const,
    icon: Baby,
    gradient: 'gradient-kids',
    hoverBg: 'hover:bg-kids-50',
    borderColor: 'border-neutral-200 hover:border-kids-300',
    iconColor: 'text-kids-500',
  },
];

export function ThemeSelectionModal({ isOpen, onClose }: ThemeSelectionModalProps) {
  const t = useTranslations();
  const router = useRouter();
  const setTheme = useSessionStore((state) => state.setTheme);

  const handleThemeSelect = (themeId: Theme) => {
    setTheme(themeId);
    onClose();
    router.push(`/${themeId}?openModal=true`);
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
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-[#1a1a1a]">
                    {t('home.themeSelection.title')}
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    {t('home.themeSelection.subtitle')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-neutral-100 
                           text-neutral-600 hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {themes.map((themeItem, index) => {
                  const Icon = themeItem.icon;
                  return (
                    <motion.button
                      key={themeItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleThemeSelect(themeItem.id)}
                      className={clsx(
                        'w-full flex items-center gap-4 px-6 py-4',
                        'bg-white rounded-2xl shadow-sm border-2',
                        themeItem.borderColor,
                        themeItem.hoverBg,
                        'transition-all duration-200 group text-left'
                      )}
                    >
                      <div
                        className={clsx(
                          'w-12 h-12 rounded-2xl',
                          themeItem.gradient,
                          'flex items-center justify-center flex-shrink-0',
                          'group-hover:scale-110 transition-transform duration-300'
                        )}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="flex-1 font-semibold text-[#1a1a1a] text-lg">
                        {t(`themes.${themeItem.id}.title`)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Safe area for mobile */}
            <div className="h-safe-bottom bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
