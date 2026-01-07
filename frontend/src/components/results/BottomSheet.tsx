'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { Theme } from '@/stores/sessionStore';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  children: React.ReactNode;
}

const themeConfig = {
  bars: { handleColor: 'bg-bars-300' },
  restaurants: { handleColor: 'bg-restaurants-300' },
  kids: { handleColor: 'bg-kids-300' },
};

export function BottomSheet({ isOpen, onClose, theme, children }: BottomSheetProps) {
  const config = themeConfig[theme];
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [sheetHeight, setSheetHeight] = useState<'collapsed' | 'half' | 'full'>('half');

  const heights = {
    collapsed: '15vh',
    half: '50vh',
    full: '85vh',
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.y;

    if (velocity > 500 || info.offset.y > threshold) {
      // Dragging down
      if (sheetHeight === 'full') {
        setSheetHeight('half');
      } else if (sheetHeight === 'half') {
        setSheetHeight('collapsed');
      } else {
        onClose();
      }
    } else if (velocity < -500 || info.offset.y < -threshold) {
      // Dragging up
      if (sheetHeight === 'collapsed') {
        setSheetHeight('half');
      } else if (sheetHeight === 'half') {
        setSheetHeight('full');
      }
    }
  };

  // Reset height when opened
  useEffect(() => {
    if (isOpen) {
      setSheetHeight('half');
    }
  }, [isOpen]);

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
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0, height: heights[sheetHeight] }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="lg:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-50 
                       overflow-hidden flex flex-col shadow-2xl safe-bottom"
          >
            {/* Handle */}
            <div 
              className="flex-shrink-0 pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className={clsx('w-12 h-1.5 rounded-full mx-auto', config.handleColor)} />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 p-2 rounded-full bg-slate-100 
                       text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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

