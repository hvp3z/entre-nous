'use client';

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
  const { searchResults, locations } = useSessionStore();

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <VenueCard
            result={result}
            locations={locations}
            theme={theme}
            rank={index + 1}
          />
          {/* Show support banner after the 3rd result */}
          {index === 2 && <SupportBanner variant="inline" />}
        </motion.div>
      ))}
    </div>
  );
}

