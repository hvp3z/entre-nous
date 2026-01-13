'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessionStore } from '@/stores/sessionStore';
import { ThemePage } from '@/components/themes/ThemePage';

export default function KidsPage() {
  const setTheme = useSessionStore((state) => state.setTheme);
  const searchParams = useSearchParams();
  const openModal = searchParams?.get('openModal') === 'true';

  useEffect(() => {
    setTheme('kids');
  }, [setTheme]);

  return <ThemePage theme="kids" openModal={openModal} />;
}

