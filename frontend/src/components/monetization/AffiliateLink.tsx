'use client';

import { ExternalLink, Utensils } from 'lucide-react';
import { AnalyticsEvents } from '@/components/common/Analytics';

interface AffiliateLinkProps {
  venueName: string;
  venueAddress?: string;
  className?: string;
}

/**
 * Affiliate link component for restaurant booking (TheFork)
 * Generates a search link to TheFork with the venue name
 */
export function AffiliateLink({ venueName, venueAddress, className = '' }: AffiliateLinkProps) {
  // TheFork affiliate URL format
  // Replace AFFILIATE_ID with your actual TheFork affiliate ID when you have one
  const searchQuery = encodeURIComponent(`${venueName} Paris`);
  const theForkUrl = `https://www.thefork.fr/search?cityId=415144&queryText=${searchQuery}`;
  
  const handleClick = () => {
    // Track affiliate click
    AnalyticsEvents.venueViewed(venueName, 'affiliate_click');
  };

  return (
    <a
      href={theForkUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium rounded-lg border border-rose-500/20 transition-colors ${className}`}
    >
      <Utensils className="w-4 h-4" />
      Réserver sur TheFork
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

/**
 * Badge to indicate partner venues (for future B2B partnerships)
 */
export function PartnerBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
      Partenaire
    </span>
  );
}

