'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { FileText, Shield } from 'lucide-react';

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('terms')} & {t('privacy')}
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/legal/terms" 
            className="group p-6 bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700 hover:border-restaurants-500/50 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-restaurants-500/20 rounded-xl">
                <FileText className="w-6 h-6 text-restaurants-400" />
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-restaurants-400 transition-colors">
                {t('terms')}
              </h2>
            </div>
            <p className="text-neutral-400">
              {t('termsContent.intro')}
            </p>
          </Link>
          
          <Link 
            href="/legal/privacy" 
            className="group p-6 bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700 hover:border-restaurants-500/50 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-restaurants-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-restaurants-400" />
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-restaurants-400 transition-colors">
                {t('privacy')}
              </h2>
            </div>
            <p className="text-neutral-400">
              {t('privacyContent.intro')}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

