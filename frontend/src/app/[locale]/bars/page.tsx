'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function BarsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);
  const searchParams = useSearchParams();
  const openModal = searchParams?.get('openModal') === 'true';

  useEffect(() => {
    setTheme('bars');
  }, [setTheme]);

  return <ThemePage theme="bars" openModal={openModal} />;
}

