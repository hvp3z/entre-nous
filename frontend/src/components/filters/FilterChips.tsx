'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import {
  useSessionStore,
  type Theme,
  type FilterGroup,
  THEME_FILTERS,
} from '@/stores/sessionStore';

interface FilterChipsProps {
  theme: Theme;
}

const themeStyles = {
  bars: {
    activeBg: 'bg-bars-500',
    activeText: 'text-white',
    inactiveBg: 'bg-white',
    inactiveText: 'text-neutral-700',
    border: 'border-bars-200',
    activeBorder: 'border-bars-500',
    groupLabel: 'text-bars-600',
  },
  restaurants: {
    activeBg: 'bg-restaurants-500',
    activeText: 'text-white',
    inactiveBg: 'bg-white',
    inactiveText: 'text-neutral-700',
    border: 'border-restaurants-200',
    activeBorder: 'border-restaurants-500',
    groupLabel: 'text-restaurants-600',
  },
  cafes: {
    activeBg: 'bg-cafes-500',
    activeText: 'text-white',
    inactiveBg: 'bg-white',
    inactiveText: 'text-neutral-700',
    border: 'border-cafes-200',
    activeBorder: 'border-cafes-500',
    groupLabel: 'text-cafes-600',
  },
  kids: {
    activeBg: 'bg-kids-500',
    activeText: 'text-white',
    inactiveBg: 'bg-white',
    inactiveText: 'text-neutral-700',
    border: 'border-kids-200',
    activeBorder: 'border-kids-500',
    groupLabel: 'text-kids-600',
  },
};

interface FilterGroupRowProps {
  group: FilterGroup;
  theme: Theme;
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
}

function FilterGroupRow({ group, theme, selectedOptions, onToggle }: FilterGroupRowProps) {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const styles = themeStyles[theme];

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    setShowLeftFade(el.scrollLeft > 10);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -150 : 150;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Left fade indicator */}
      <AnimatePresence>
        {showLeftFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none
                       bg-gradient-to-r from-white to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Left scroll button (desktop only) */}
      {showLeftFade && (
        <button
          onClick={() => scrollBy('left')}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
                     w-8 h-8 items-center justify-center rounded-full
                     bg-white shadow-md border border-neutral-200
                     hover:bg-neutral-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-600" />
        </button>
      )}

      {/* Scrollable chips container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1
                   -webkit-overflow-scrolling-touch scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {group.options.map((option) => {
          const isActive = selectedOptions.includes(option.id);
          
          return (
            <motion.button
              key={option.id}
              onClick={() => onToggle(option.id)}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium',
                'border transition-all duration-200 min-h-[44px]',
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
                isActive
                  ? [styles.activeBg, styles.activeText, styles.activeBorder, 'shadow-sm']
                  : [styles.inactiveBg, styles.inactiveText, styles.border, 'hover:border-neutral-300']
              )}
              style={{
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <span className="whitespace-nowrap">{t(option.labelKey)}</span>
              {isActive && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-1.5 inline-flex"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Right fade indicator */}
      <AnimatePresence>
        {showRightFade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none
                       bg-gradient-to-l from-white to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Right scroll button (desktop only) */}
      {showRightFade && (
        <button
          onClick={() => scrollBy('right')}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20
                     w-8 h-8 items-center justify-center rounded-full
                     bg-white shadow-md border border-neutral-200
                     hover:bg-neutral-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-neutral-600" />
        </button>
      )}
    </div>
  );
}

export function FilterChips({ theme }: FilterChipsProps) {
  const t = useTranslations();
  const { selectedFilters, toggleFilter, clearFilters } = useSessionStore();
  const styles = themeStyles[theme];
  const themeFilters = THEME_FILTERS[theme];
  const currentFilters = selectedFilters[theme] || {};

  // Check if any filters are active
  const hasActiveFilters = Object.values(currentFilters).some(
    (options) => options && options.length > 0
  );

  const handleToggle = (groupId: string, optionId: string, multiSelect: boolean) => {
    toggleFilter(theme, groupId, optionId, multiSelect);
  };

  return (
    <div className="bg-white border-b border-neutral-100">
      <div className="px-4 py-3 space-y-3">
        {/* Header with clear button */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            {t('filters.title')}
          </span>
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => clearFilters(theme)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-700
                           transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                {t('filters.clearAll')}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Filter groups */}
        {themeFilters.groups.map((group) => (
          <div key={group.id} className="space-y-1.5">
            {/* Group label (only show for Kids which has multiple groups) */}
            {themeFilters.groups.length > 1 && (
              <span className={clsx('text-xs font-medium', styles.groupLabel)}>
                {t(group.labelKey)}
              </span>
            )}
            
            <FilterGroupRow
              group={group}
              theme={theme}
              selectedOptions={currentFilters[group.id] || []}
              onToggle={(optionId) => handleToggle(group.id, optionId, group.multiSelect)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}




