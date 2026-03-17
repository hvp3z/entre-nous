'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

type ConsentStatus = 'pending' | 'accepted' | 'declined';

export function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ga_consent') as ConsentStatus | null;
    setStatus(stored === 'accepted' || stored === 'declined' ? stored : 'pending');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ga_consent', 'accepted');
    window.dispatchEvent(new Event('ga-consent-updated'));
    setStatus('accepted');
  };

  const handleDecline = () => {
    localStorage.setItem('ga_consent', 'declined');
    window.dispatchEvent(new Event('ga-consent-updated'));
    setStatus('declined');
  };

  // null = not yet read from localStorage (avoid flash)
  if (status === null) return null;

  return (
    <AnimatePresence>
      {status === 'pending' && (
        <motion.div
          key="cookie-banner"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-auto md:right-4 md:max-w-sm"
        >
          <div className="bg-white border border-neutral-200 shadow-2xl rounded-t-2xl md:rounded-2xl p-5">

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <BarChart2 className="w-4 h-4 text-neutral-600" />
              </div>
              <p className="font-semibold text-[#1a1a1a] text-sm">
                Mesure d'audience
              </p>
            </div>

            {/* Body */}
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              On utilise Google Analytics pour mieux comprendre comment vous
              utilisez l'application et l'améliorer. Aucune pub, aucun
              croisement de données.
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl
                           border border-neutral-200 text-neutral-600
                           hover:bg-neutral-50 transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl
                           bg-[#1a1a1a] text-white
                           hover:bg-neutral-800 transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
