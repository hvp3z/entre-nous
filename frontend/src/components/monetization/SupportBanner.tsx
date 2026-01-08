'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, X, Heart } from 'lucide-react';

interface SupportBannerProps {
  variant?: 'inline' | 'floating';
}

export function SupportBanner({ variant = 'inline' }: SupportBannerProps) {
  const t = useTranslations('support');
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if user has previously dismissed (stored in localStorage)
  const shouldShow = typeof window !== 'undefined' 
    ? !localStorage.getItem('support_banner_dismissed')
    : true;

  if (!shouldShow || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('support_banner_dismissed', 'true');
  };

  const kofiUrl = 'https://ko-fi.com/entrenous'; // Replace with your Ko-fi URL

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
                  href={kofiUrl}
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
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 p-1"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
      
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
          href={kofiUrl}
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

