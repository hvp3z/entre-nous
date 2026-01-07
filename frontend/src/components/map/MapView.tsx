'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSessionStore, type Theme } from '@/stores/sessionStore';

// Fix for default marker icons in Next.js
const createIcon = (color: string, isVenue = false) => {
  const size = isVenue ? 36 : 28;
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: ${isVenue ? '14px' : '12px'};
        color: white;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const themeColors = {
  bars: '#e8751d',
  restaurants: '#cb3062',
  kids: '#06b6d4',
};

// Component to fit bounds when locations change
function MapBoundsHandler() {
  const map = useMap();
  const { locations, searchResults } = useSessionStore();

  useEffect(() => {
    const points: L.LatLngExpression[] = [];

    // Add location points
    locations.forEach((loc) => {
      points.push([loc.coordinates.lat, loc.coordinates.lng]);
    });

    // Add venue points
    searchResults.forEach((result) => {
      points.push([result.venue.coordinates.lat, result.venue.coordinates.lng]);
    });

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [map, locations, searchResults]);

  return null;
}

interface MapViewProps {
  theme: Theme;
}

export function MapView({ theme }: MapViewProps) {
  const { locations, searchResults, setSelectedVenue } = useSessionStore();
  const themeColor = themeColors[theme];

  // Paris center
  const defaultCenter: [number, number] = [48.8566, 2.3522];

  const locationMarkers = useMemo(() => {
    return locations.map((location, index) => (
      <Marker
        key={location.id}
        position={[location.coordinates.lat, location.coordinates.lng]}
        icon={createIcon('#0f172a')}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{index + 1}. Starting Point</p>
            <p className="text-slate-600">{location.address}</p>
            {location.nearestStations[0] && (
              <p className="text-slate-500 text-xs mt-1">
                Metro: {location.nearestStations[0].name}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    ));
  }, [locations]);

  const venueMarkers = useMemo(() => {
    return searchResults.map((result, index) => (
      <Marker
        key={result.venue.id}
        position={[result.venue.coordinates.lat, result.venue.coordinates.lng]}
        icon={createIcon(themeColor, true)}
        eventHandlers={{
          click: () => setSelectedVenue(result.venue),
        }}
      >
        <Popup>
          <div className="text-sm min-w-[200px]">
            <p className="font-semibold">{result.venue.name}</p>
            <p className="text-slate-600 text-xs">{result.venue.address}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              <span>{result.venue.rating.toFixed(1)}</span>
              <span className="text-slate-400">({result.venue.reviewCount})</span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              ~{Math.round(result.averageTravelTime)} min average
            </p>
          </div>
        </Popup>
      </Marker>
    ));
  }, [searchResults, themeColor, setSelectedVenue]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapBoundsHandler />
      {locationMarkers}
      {venueMarkers}
    </MapContainer>
  );
}

