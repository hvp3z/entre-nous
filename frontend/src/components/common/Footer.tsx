'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Heart } from 'lucide-react';
import { KOFI_URL } from '@/components/monetization/SupportBanner';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-auto py-6 px-4 border-t border-neutral-800 bg-[#1a1a1a]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            {t('footer.madeWith')} • © {new Date().getFullYear()} Entre Nous
          </p>
          
          <nav className="flex items-center gap-4 sm:gap-6">
            {/* Support Link */}
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm transition-colors group"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('footer.support')}</span>
            </a>
            
            <span className="text-neutral-700">•</span>
            
            <Link 
              href="/legal/terms"
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              {t('legal.terms')}
            </Link>
            <Link 
              href="/legal/privacy"
              className="text-neutral-400 hover:text-white text-sm transition-colors"
            >
              {t('legal.privacy')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

