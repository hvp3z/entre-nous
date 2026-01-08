'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/common/Header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  const t = useTranslations('legal');

  const sections = [
    { key: 'collected', title: t('privacyContent.collected'), content: t('privacyContent.collectedDesc') },
    { key: 'analytics', title: t('privacyContent.analytics'), content: t('privacyContent.analyticsDesc') },
    { key: 'cookies', title: t('privacyContent.cookies'), content: t('privacyContent.cookiesDesc') },
    { key: 'thirdParty', title: t('privacyContent.thirdParty'), content: t('privacyContent.thirdPartyDesc') },
    { key: 'rights', title: t('privacyContent.rights'), content: t('privacyContent.rightsDesc') },
    { key: 'contact', title: t('privacyContent.contact'), content: t('privacyContent.contactDesc') },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link 
          href="/legal" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('terms')} & {t('privacy')}
        </Link>
        
        <article className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700 p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('privacyContent.title')}
          </h1>
          
          <p className="text-neutral-400 text-sm mb-8">
            {t('lastUpdated', { date: new Date().toLocaleDateString() })}
          </p>
          
          <p className="text-neutral-300 mb-8 text-lg">
            {t('privacyContent.intro')}
          </p>
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={section.key}>
                <h2 className="text-xl font-semibold text-restaurants-400 mb-3">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-neutral-300 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
          
          {/* Contact info placeholder */}
          <div className="mt-8 p-4 bg-neutral-700/50 rounded-xl">
            <p className="text-neutral-300">
              <strong className="text-white">Email:</strong> contact@entrenous.paris
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

