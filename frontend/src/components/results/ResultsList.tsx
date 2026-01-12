'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useSessionStore, type Theme } from '@/stores/sessionStore';
import { VenueCard } from './VenueCard';
import { SupportBanner } from '@/components/monetization/SupportBanner';

interface ResultsListProps {
  theme: Theme;
}

export function ResultsList({ theme }: ResultsListProps) {
  const t = useTranslations();
  const { searchResults, locations, highlightedVenueId, setHighlightedVenueId } = useSessionStore();
  const venueRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Scroll to highlighted venue and clear highlight after animation
  useEffect(() => {
    if (highlightedVenueId) {
      const element = venueRefs.current.get(highlightedVenueId);
      if (element) {
        // Small delay to ensure the list view is visible
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Clear highlight after animation
        setTimeout(() => {
          setHighlightedVenueId(null);
        }, 2000);
      }
    }
  }, [highlightedVenueId, setHighlightedVenueId]);

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#525252]">{t('search.noResults')}</p>
        <p className="text-sm text-neutral-400 mt-1">{t('search.noResultsHint')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchResults.map((result, index) => (
        <motion.div
          key={result.venue.id}
          ref={(el) => {
            if (el) venueRefs.current.set(result.venue.id, el);
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <VenueCard
            result={result}
            locations={locations}
            theme={theme}
            rank={index + 1}
            isHighlighted={highlightedVenueId === result.venue.id}
          />
          {/* Show support banner after the 3rd result */}
          {index === 2 && <SupportBanner variant="card" persistDismiss={false} />}
        </motion.div>
      ))}
    </div>
  );
}

