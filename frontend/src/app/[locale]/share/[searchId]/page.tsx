'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ResultsList } from '@/components/results/ResultsList';
import { MapContainer } from '@/components/map/MapContainer';
import { useSessionStore } from '@/stores/sessionStore';

export default function SharedSearchPage() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const searchId = params.searchId as string;
  
  const { theme, setSearchResults, searchResults } = useSessionStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/equidistant/search/${searchId}`
        );
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Search not found');
        }

        setSearchResults(data.data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load search');
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [searchId, setSearchResults]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#1a1a1a] mb-2">
            {t('common.error')}
          </h1>
          <p className="text-[#525252] mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Map */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0">
          <MapContainer theme={theme || 'bars'} />
        </div>

        {/* Results */}
        <div className="lg:w-96 bg-white border-l border-neutral-200 overflow-y-auto p-4">
          <h2 className="font-semibold text-[#1a1a1a] mb-4">
            {t('results.title')}
          </h2>
          <ResultsList theme={theme || 'bars'} />
        </div>
      </div>
    </div>
  );
}

