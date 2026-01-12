'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function CafesPage() {
  const setTheme = useSessionStore((state) => state.setTheme);

  useEffect(() => {
    setTheme('cafes');
  }, [setTheme]);

  return <ThemePage theme="cafes" />;
}
