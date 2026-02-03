'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { FileText, Shield, MapPin } from 'lucide-react';

// SVG Map component showing Paris and petite couronne
function CoverageMapSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full max-w-xs mx-auto"
      aria-label="Map of Paris and petite couronne"
    >
      {/* Background circle for outer region (not covered) */}
      <circle cx="100" cy="100" r="95" fill="#374151" stroke="#4b5563" strokeWidth="1" />
      
      {/* Hauts-de-Seine (92) - West */}
      <path
        d="M 30 100 Q 30 60 60 45 L 75 50 L 75 150 L 60 155 Q 30 140 30 100"
        fill="#f97316"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        className="hover:fill-orange-400 transition-colors"
      />
      <text x="52" y="105" fontSize="10" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">92</text>
      
      {/* Seine-Saint-Denis (93) - North-East */}
      <path
        d="M 75 50 Q 100 35 140 45 L 155 70 L 135 100 L 125 100 L 125 70 L 75 70 Z"
        fill="#f97316"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        className="hover:fill-orange-400 transition-colors"
      />
      <text x="115" y="65" fontSize="10" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">93</text>
      
      {/* Val-de-Marne (94) - South-East */}
      <path
        d="M 125 100 L 135 100 L 155 130 Q 140 165 100 165 L 100 130 L 125 130 Z"
        fill="#f97316"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        className="hover:fill-orange-400 transition-colors"
      />
      <text x="125" y="145" fontSize="10" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">94</text>
      
      {/* Paris (75) - Center */}
      <path
        d="M 75 70 L 125 70 L 125 130 L 100 130 L 100 165 Q 70 160 75 150 L 75 70"
        fill="#fb923c"
        stroke="#1a1a1a"
        strokeWidth="2"
        className="hover:fill-orange-300 transition-colors"
      />
      <text x="95" y="115" fontSize="14" fill="#1a1a1a" fontWeight="bold" textAnchor="middle">75</text>
      
      {/* Legend */}
      <rect x="10" y="175" width="12" height="12" fill="#f97316" rx="2" />
      <text x="26" y="185" fontSize="9" fill="#9ca3af">Zone couverte</text>
      <rect x="110" y="175" width="12" height="12" fill="#374151" rx="2" />
      <text x="126" y="185" fontSize="9" fill="#9ca3af">Hors zone</text>
    </svg>
  );
}

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

        {/* Coverage Area Section */}
        <div className="mt-12">
          <div className="p-6 bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <MapPin className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {t('coverageContent.title')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Map */}
              <div>
                <CoverageMapSVG />
              </div>
              
              {/* Info */}
              <div className="space-y-4">
                <p className="text-neutral-300">
                  {t('coverageContent.intro')}
                </p>
                
                <div>
                  <h3 className="text-sm font-medium text-neutral-400 mb-2">
                    {t('coverageContent.departments')}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 rounded bg-orange-400 flex items-center justify-center text-xs font-bold text-neutral-900">75</span>
                      {t('coverageContent.paris')}
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-xs font-bold text-neutral-900">92</span>
                      {t('coverageContent.hautsDeSeine')}
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-xs font-bold text-neutral-900">93</span>
                      {t('coverageContent.seineSaintDenis')}
                    </li>
                    <li className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-xs font-bold text-neutral-900">94</span>
                      {t('coverageContent.valDeMarne')}
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm text-neutral-500 italic">
                  {t('coverageContent.note')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

