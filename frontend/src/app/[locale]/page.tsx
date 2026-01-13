'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Wine, UtensilsCrossed, Baby, MapPin, ArrowRight, Coffee, Heart, ChevronRight, Compass } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { useSessionStore } from '@/stores/sessionStore';
import { KOFI_URL } from '@/components/monetization/SupportBanner';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const setTheme = useSessionStore((state) => state.setTheme);
  const theme = useSessionStore((state) => state.theme) || 'bars';

  const handleThemeSelect = (themeId: 'bars' | 'restaurants' | 'cafes' | 'kids') => {
    setTheme(themeId);
    router.push(`/${themeId}`);
  };

  const handleSearchClick = () => {
    setTheme('bars');
    router.push('/bars?openModal=true');
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
      id: 'cafes' as const,
      icon: Coffee,
      gradient: 'gradient-cafes',
      hoverBg: 'hover:bg-cafes-50',
      borderColor: 'border-neutral-200 hover:border-cafes-300',
      iconColor: 'text-cafes-500',
      btnClass: 'btn-cafes',
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
    { icon: Wine, titleKey: 'step2Title', descKey: 'step2Desc' },
    { icon: Compass, titleKey: 'step3Title', descKey: 'step3Desc' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBF7] to-white">
      {/* Mobile Full Height Container */}
      <div className="min-h-screen md:min-h-0 flex flex-col">
        <Header />

        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center relative px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-4">
                {t('home.hero')}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto text-balance mb-8">
                {t('home.heroSub')}
              </p>
              
              {/* Search Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto"
              >
                <button
                  onClick={handleSearchClick}
                  className="w-full flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-neutral-200 hover:border-orange-300 group"
                >
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="flex-1 text-left text-neutral-500 group-hover:text-neutral-700">
                    {t('home.searchPlaceholder')}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-coral-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How it Works */}
        <section className="px-4 py-6 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-semibold text-center text-[#1a1a1a] mb-8 md:mb-12"
          >
            {t('home.howItWorks')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-coral-500 text-white text-sm font-semibold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-coral-500 flex items-center justify-center mb-4">
                    <StepIcon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title and description */}
                  <h3 className="font-semibold text-[#1a1a1a] text-lg mb-2">
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
      </div>

      {/* Categories List */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-white to-[#FFFBF7]">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-6 md:mb-8"
          >
            {t('home.exploreCategories')}
          </motion.h2>

          <div className="space-y-3">
            {themes.map((themeItem, index) => {
              const Icon = themeItem.icon;
              return (
                <motion.div
                  key={themeItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleThemeSelect(themeItem.id)}
                    className="w-full flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md hover:border-orange-200 transition-all duration-200 group text-left"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${themeItem.gradient} 
                                    flex items-center justify-center flex-shrink-0
                                    group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="flex-1 font-semibold text-[#1a1a1a] text-lg">
                      {t(`themes.${themeItem.id}.title`)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-br from-orange-50 via-orange-50/50 to-coral-50/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl gradient-orange-coral mb-6 shadow-lg shadow-orange-500/30">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-3">
            {t('support.homeTitle')}
          </h2>
          <p className="text-[#525252] mb-6 max-w-md mx-auto">
            {t('support.homeMessage')}
          </p>
          
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 
                     gradient-orange-coral
                     hover:opacity-90
                     text-white font-semibold rounded-3xl transition-all
                     shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40
                     hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            {t('support.cta')}
          </a>
        </motion.div>
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

