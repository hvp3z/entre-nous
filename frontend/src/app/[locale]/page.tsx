'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Wine, UtensilsCrossed, Baby, MapPin, Users, Navigation } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { useSessionStore } from '@/stores/sessionStore';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const setTheme = useSessionStore((state) => state.setTheme);

  const handleThemeSelect = (theme: 'bars' | 'restaurants' | 'kids') => {
    setTheme(theme);
    router.push(`/${theme}`);
  };

  const themes = [
    {
      id: 'bars' as const,
      icon: Wine,
      gradient: 'gradient-bars',
      hoverBg: 'hover:bg-bars-50',
      borderColor: 'border-neutral-200 hover:border-bars-300',
      iconColor: 'text-bars-500',
      btnClass: 'btn-bars',
    },
    {
      id: 'restaurants' as const,
      icon: UtensilsCrossed,
      gradient: 'gradient-restaurants',
      hoverBg: 'hover:bg-restaurants-50',
      borderColor: 'border-neutral-200 hover:border-restaurants-300',
      iconColor: 'text-restaurants-500',
      btnClass: 'btn-restaurants',
    },
    {
      id: 'kids' as const,
      icon: Baby,
      gradient: 'gradient-kids',
      hoverBg: 'hover:bg-kids-50',
      borderColor: 'border-neutral-200 hover:border-kids-300',
      iconColor: 'text-kids-500',
      btnClass: 'btn-kids',
    },
  ];

  const steps = [
    { icon: MapPin, titleKey: 'step1Title', descKey: 'step1Desc' },
    { icon: Users, titleKey: 'step2Title', descKey: 'step2Desc' },
    { icon: Navigation, titleKey: 'step3Title', descKey: 'step3Desc' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
        </div>
        
        <div className="relative px-4 py-16 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('home.hero')}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto text-balance">
              {t('home.heroSub')}
            </p>
          </motion.div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="#fafafa"
            />
          </svg>
        </div>
      </section>

      {/* Theme Cards */}
      <section className="px-4 py-12 sm:py-16 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themes.map((theme, index) => {
              const Icon = theme.icon;
              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleThemeSelect(theme.id)}
                    className={`card w-full p-6 text-left transition-all duration-300 
                              ${theme.hoverBg} border ${theme.borderColor} group`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${theme.gradient} 
                                    flex items-center justify-center mb-4
                                    group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h2 className="font-display text-2xl font-semibold text-[#1a1a1a] mb-1">
                      {t(`themes.${theme.id}.title`)}
                    </h2>
                    <p className={`text-sm font-medium ${theme.iconColor} mb-2`}>
                      {t(`themes.${theme.id}.subtitle`)}
                    </p>
                    <p className="text-[#525252] text-sm mb-4">
                      {t(`themes.${theme.id}.description`)}
                    </p>
                    
                    <span className={`${theme.btnClass} w-full`}>
                      {t(`themes.${theme.id}.cta`)}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-semibold text-center text-[#1a1a1a] mb-12"
          >
            {t('home.howItWorks')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative inline-flex mb-4">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#1a1a1a]" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1a1a1a] 
                                   text-white text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">
                    {t(`home.${step.titleKey}`)}
                  </h3>
                  <p className="text-[#525252] text-sm">
                    {t(`home.${step.descKey}`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-neutral-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#525252] text-sm">
            {t('common.appName')} - {t('common.tagline')}
          </p>
        </div>
      </footer>
    </div>
  );
}

