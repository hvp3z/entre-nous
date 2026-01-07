'use client';

import { useState, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lng: number } | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
  });

  const getCurrentPosition = useCallback(async (): Promise<{ lat: number; lng: number } | null> => {
    if (!navigator.geolocation) {
      setState({ loading: false, error: 'Geolocation not supported', coordinates: null });
      return null;
    }

    setState({ loading: true, error: null, coordinates: null });

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setState({ loading: false, error: null, coordinates });
      return coordinates;
    } catch (error) {
      const errorMessage = error instanceof GeolocationPositionError
        ? getGeolocationErrorMessage(error.code)
        : 'Failed to get location';
      
      setState({ loading: false, error: errorMessage, coordinates: null });
      return null;
    }
  }, []);

  return {
    ...state,
    getCurrentPosition,
  };
}

function getGeolocationErrorMessage(code: number): string {
  switch (code) {
    case 1:
      return 'Location access denied';
    case 2:
      return 'Location unavailable';
    case 3:
      return 'Location request timeout';
    default:
      return 'Unknown location error';
  }
}

