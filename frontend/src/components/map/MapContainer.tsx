'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { Theme } from '@/stores/sessionStore';

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView').then(mod => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
      <LoadingSpinner size="lg" />
    </div>
  ),
});

interface MapContainerProps {
  theme: Theme;
  showZoomControls?: boolean;
}

export function MapContainer({ theme, showZoomControls = false }: MapContainerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <MapView theme={theme} showZoomControls={showZoomControls} />;
}

