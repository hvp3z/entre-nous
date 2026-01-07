'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function KidsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);

  useEffect(() => {
    setTheme('kids');
  }, [setTheme]);

  return <ThemePage theme="kids" />;
}

