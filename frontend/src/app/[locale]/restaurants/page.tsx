'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function RestaurantsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);
  const searchParams = useSearchParams();
  const openModal = searchParams?.get('openModal') === 'true';

  useEffect(() => {
    setTheme('restaurants');
  }, [setTheme]);

  return <ThemePage theme="restaurants" openModal={openModal} />;
}

