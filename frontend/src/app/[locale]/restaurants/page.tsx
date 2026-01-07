'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function RestaurantsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);

  useEffect(() => {
    setTheme('restaurants');
  }, [setTheme]);

  return <ThemePage theme="restaurants" />;
}

