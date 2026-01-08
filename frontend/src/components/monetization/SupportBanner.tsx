'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, X, Heart, Sparkles } from 'lucide-react';

interface SupportBannerProps {
  variant?: 'inline' | 'floating' | 'card';
  dismissible?: boolean;
}

export const KOFI_URL = 'https://ko-fi.com/entrenous';

export function SupportBanner({ variant = 'inline', dismissible = true }: SupportBannerProps) {
  const t = useTranslations('support');
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user has previously dismissed (stored in localStorage)
  const shouldShow = typeof window !== 'undefined' 
    ? !localStorage.getItem('support_banner_dismissed')
    : true;

  if (dismissible && (!shouldShow || isDismissed)) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('support_banner_dismissed', 'true');
  };

  // Card variant - looks like a VenueCard
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        {/* Gradient header - same height as VenueCard image */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute bottom-4 right-8 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Coffee className="w-20 h-20 text-white/20" />
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-sm font-medium bg-white/90 text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t('badge')}
            </span>
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-xl shrink-0">
              <Coffee className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1a1a1a]">{t('title')}</h3>
              <p className="text-sm text-[#525252] mt-1">
                {t('cardMessage')}
              </p>
            </div>
          </div>

          {/* CTA Button - full width like VenueCard actions */}
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 
                     bg-gradient-to-r from-amber-500 to-orange-500 
                     hover:from-amber-400 hover:to-orange-400 
                     text-white font-medium rounded-xl transition-all text-sm
                     shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
          >
            <Heart className="w-4 h-4" />
            {t('cta')}
          </a>
        </div>
      </motion.div>
    );
  }

  if (variant === 'floating') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-4 z-40 max-w-sm"
        >
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-4 shadow-2xl">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-neutral-400 hover:text-white p-1"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/20 rounded-xl">
                <Coffee className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-600 mb-3">
                  {t('message')}
                </p>
                <a
                  href={KOFI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#1a1a1a] font-medium rounded-lg transition-colors text-sm"
                >
                  <Heart className="w-4 h-4" />
                  {t('cta')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Inline variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-4 my-4"
    >
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 p-1"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="flex items-center gap-4">
        <div className="p-2 bg-amber-500/20 rounded-xl shrink-0">
          <Coffee className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#525252]">
            {t('message')}
          </p>
        </div>
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 font-medium rounded-lg transition-colors text-sm border border-amber-500/30"
        >
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">{t('cta')}</span>
        </a>
      </div>
    </motion.div>
  );
}

