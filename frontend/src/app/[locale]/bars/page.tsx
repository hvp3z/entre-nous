'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function BarsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);

  useEffect(() => {
    setTheme('bars');
  }, [setTheme]);

  return <ThemePage theme="bars" />;
}

