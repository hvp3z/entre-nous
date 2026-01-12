'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
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
  bars: '#b87333',      // cognac
  restaurants: '#c2703a', // terracotta
  kids: '#a65d3f',      // brique
};

// Component to handle map click events (close preview when clicking on map)
function MapClickHandler() {
  const { setSelectedVenue } = useSessionStore();
  
  useMapEvents({
    click: () => {
      setSelectedVenue(null);
    },
  });

  return null;
}

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
  showZoomControls?: boolean;
}

export function MapView({ theme, showZoomControls = false }: MapViewProps) {
  const { locations, searchResults, setSelectedVenue, setHighlightedVenueId } = useSessionStore();
  const themeColor = themeColors[theme];

  // Paris center
  const defaultCenter: [number, number] = [48.8566, 2.3522];

  const locationMarkers = useMemo(() => {
    return locations.map((location, index) => (
      <Marker
        key={location.id}
        position={[location.coordinates.lat, location.coordinates.lng]}
        icon={createIcon('#292524')}
      >
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{index + 1}. Starting Point</p>
            <p className="text-neutral-600">{location.address}</p>
            {location.nearestStations[0] && (
              <p className="text-neutral-500 text-xs mt-1">
                Metro: {location.nearestStations[0].name}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    ));
  }, [locations]);

  const venueMarkers = useMemo(() => {
    return searchResults.map((result) => (
      <Marker
        key={result.venue.id}
        position={[result.venue.coordinates.lat, result.venue.coordinates.lng]}
        icon={createIcon(themeColor, true)}
        eventHandlers={{
          click: () => {
            setSelectedVenue(result.venue);
            setHighlightedVenueId(result.venue.id);
          },
        }}
      />
    ));
  }, [searchResults, themeColor, setSelectedVenue, setHighlightedVenueId]);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      className="w-full h-full z-0"
      zoomControl={showZoomControls}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler />
      <MapBoundsHandler />
      {locationMarkers}
      {venueMarkers}
    </MapContainer>
  );
}

