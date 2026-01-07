'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { FileText, Shield } from 'lucide-react';

export default function LegalPage() {
  const t = useTranslations('legal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">
          {t('terms')} & {t('privacy')}
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/legal/terms" 
            className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <FileText className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                {t('terms')}
              </h2>
            </div>
            <p className="text-slate-400">
              {t('termsContent.intro')}
            </p>
          </Link>
          
          <Link 
            href="/legal/privacy" 
            className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                {t('privacy')}
              </h2>
            </div>
            <p className="text-slate-400">
              {t('privacyContent.intro')}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

