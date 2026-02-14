'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Heart
} from 'lucide-react';
import clsx from 'clsx';
import { getVenueDetails, type VenueDetails } from '@/lib/api';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Header } from '@/components/common/Header';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildVenueJsonLd } from '@/components/seo/jsonLdBuilders';

export default function VenueDetailPage() {
  const params = useParams();
  const placeId = params.placeId as string;
  const locale = useLocale();
  const t = useTranslations();
  
  const [venue, setVenue] = useState<VenueDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueDetails(placeId, locale);
        setVenue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load venue');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [placeId, locale]);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: venue?.name || 'Le Middle',
      text: venue ? `Check out ${venue.name}!` : '',
      url,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const nextPhoto = () => {
    if (venue && currentPhotoIndex < venue.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
            {t('common.error')}
          </h1>
          <p className="text-neutral-500 mb-6">{error || 'Venue not found'}</p>
          <Link
            href="/"
            className="btn btn-primary"
          >
            {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  const priceLevel = venue.priceLevel ? '€'.repeat(venue.priceLevel) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFFBF7] to-[#FEF3E7]">
      <JsonLd data={buildVenueJsonLd(venue)} />
      <Header />
      
      <main className="flex-1">
        {/* Hero Image Section */}
        <div className="relative h-64 sm:h-80 lg:h-96 bg-neutral-200">
          {venue.photos.length > 0 ? (
            <>
              <Image
                src={venue.photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1} de ${venue.name} à Paris`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={currentPhotoIndex === 0}
                loading={currentPhotoIndex === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Photo navigation */}
              {venue.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    disabled={currentPhotoIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    disabled={currentPhotoIndex === venue.photos.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Photo indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {venue.photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={clsx(
                          'w-2 h-2 rounded-full transition-all',
                          idx === currentPhotoIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/60 hover:bg-white/80'
                        )}
                        aria-label={`Go to photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <MapPin className="w-16 h-16 text-neutral-300" />
            </div>
          )}
          
          {/* Back button */}
          <Link
            href="/"
            className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          {/* Share button */}
          <button
            onClick={handleShare}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            aria-label={t('common.share')}
          >
            {copied ? (
              <span className="text-green-600 text-sm font-medium px-2">
                {t('share.copied')}
              </span>
            ) : (
              <Share2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-2">
              {venue.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-[#525252]">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">{venue.rating.toFixed(1)}</span>
                <span className="text-neutral-400">({venue.reviewCount})</span>
              </div>
              
              {/* Price */}
              {priceLevel && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span>{priceLevel}</span>
                </>
              )}
              
              {/* Open status */}
              {venue.openNow !== undefined && (
                <>
                  <span className="text-neutral-300">•</span>
                  <span className={venue.openNow ? 'text-green-600' : 'text-red-600'}>
                    {venue.openNow ? t('results.openNow') : t('results.closed')}
                  </span>
                </>
              )}
            </div>
          </motion.div>

          {/* Address & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 mb-4 space-y-3"
          >
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
              <p className="text-[#1a1a1a]">{venue.address}</p>
            </div>
            
            {/* Phone */}
            {venue.phoneNumber && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neutral-400" />
                <a 
                  href={`tel:${venue.phoneNumber}`}
                  className="text-[#1a1a1a] hover:text-orange-600 transition-colors"
                >
                  {venue.phoneNumber}
                </a>
              </div>
            )}
            
            {/* Website */}
            {venue.website && (
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-neutral-400" />
                <a 
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1"
                >
                  {t('results.viewDetails')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Opening Hours */}
          {venue.openingHours && venue.openingHours.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 mb-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-neutral-400" />
                <h2 className="font-semibold text-[#1a1a1a]">{t('directions.title')}</h2>
              </div>
              <div className="space-y-1 text-sm text-[#525252]">
                {venue.openingHours.map((hours, idx) => (
                  <p key={idx}>{hours}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 mb-6"
          >
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}&travelmode=transit`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-sm font-semibold text-white rounded-3xl px-4 py-3 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg active:scale-[0.98] gradient-orange-coral"
            >
              {t('results.getDirections')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-3xl bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#525252]" />
              <span className="text-sm font-medium text-[#1a1a1a]">{t('common.share')}</span>
            </button>
          </motion.div>

          {/* Reviews */}
          {venue.reviews && venue.reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <h2 className="font-semibold text-[#1a1a1a] text-lg mb-4">
                {t('results.rating', { rating: venue.rating.toFixed(1), count: venue.reviewCount })}
              </h2>
              <div className="space-y-4">
                {venue.reviews.slice(0, 5).map((review, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={clsx(
                              'w-4 h-4',
                              i < review.rating 
                                ? 'text-amber-500 fill-amber-500' 
                                : 'text-neutral-200'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500">{review.authorName}</span>
                    </div>
                    <p className="text-sm text-[#525252] line-clamp-4">{review.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Support Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-50 to-coral-50 rounded-2xl p-6 border border-orange-100 text-center"
          >
            <Heart className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-[#1a1a1a] mb-2">
              {t('support.homeTitle')}
            </h3>
            <p className="text-sm text-[#525252] mb-4">
              {t('support.message')}
            </p>
            <a
              href="https://buymeacoffee.com/lemiddle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-3xl gradient-orange-coral text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
              {t('support.cta')}
            </a>
          </motion.div>

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
