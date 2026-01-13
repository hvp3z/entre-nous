'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Theme } from '@/stores/sessionStore';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-[32px] z-50 
                       overflow-hidden flex flex-col shadow-2xl safe-bottom"
            style={{ height: '90vh' }}
          >
            {/* Header with Close Button */}
            <div className="flex-shrink-0 sticky top-0 bg-white z-10 px-4 py-3 flex justify-end border-b border-neutral-100">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-neutral-100 
                         text-neutral-600 hover:bg-neutral-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
