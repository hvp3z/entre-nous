'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-auto py-6 px-4 border-t border-neutral-800 bg-[#1a1a1a]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            {t('footer.madeWith')} • © {new Date().getFullYear()} Entre Nous
          </p>
          
          <nav className="flex items-center gap-6">
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

