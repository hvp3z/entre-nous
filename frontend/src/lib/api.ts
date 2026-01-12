const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }

  return result.data as T;
}

// Location API
export interface AutocompleteResult {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  coordinates?: { lat: number; lng: number };
  // Station-specific fields
  type?: 'place' | 'station';
  station?: {
    id: string;
    name: string;
    coordinates: { lat: number; lng: number };
    lines: string[];
    walkingTimeMinutes: number;
  };
}

export interface GeocodeResult {
  address: string;
  name?: string;
  coordinates: { lat: number; lng: number };
  nearestStations: Array<{
    id: string;
    name: string;
    coordinates: { lat: number; lng: number };
    lines: string[];
    walkingTimeMinutes: number;
  }>;
}

export async function searchLocations(
  input: string,
  sessionToken?: string
): Promise<AutocompleteResult[]> {
  const params = new URLSearchParams({ input });
  if (sessionToken) params.append('sessionToken', sessionToken);
  
  return fetchApi<AutocompleteResult[]>(`/api/locations/autocomplete?${params}`);
}

export async function geocodePlace(
  placeId: string,
  coordinates?: { lat: number; lng: number },
  address?: string
): Promise<GeocodeResult> {
  const params = new URLSearchParams();
  if (coordinates) {
    params.append('lat', coordinates.lat.toString());
    params.append('lng', coordinates.lng.toString());
  }
  if (address) {
    params.append('address', address);
  }
  const queryString = params.toString();
  const url = `/api/locations/geocode/${placeId}${queryString ? `?${queryString}` : ''}`;
  return fetchApi<GeocodeResult>(url);
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  return fetchApi<GeocodeResult>('/api/locations/reverse-geocode', {
    method: 'POST',
    body: JSON.stringify({ lat, lng }),
  });
}

// Filter types
export interface SelectedFilters {
  [groupId: string]: string[];
}

// Search API
export interface SearchRequest {
  locations: Array<{
    id: string;
    address: string;
    coordinates: { lat: number; lng: number };
    nearestStations: Array<{
      id: string;
      name: string;
      coordinates: { lat: number; lng: number };
      lines: string[];
      walkingTimeMinutes: number;
    }>;
  }>;
  theme: 'bars' | 'restaurants' | 'cafes' | 'kids';
  maxVarianceMinutes?: number;
  filters?: SelectedFilters;
}

export interface SearchResponse {
  results: Array<{
    venue: {
      id: string;
      placeId: string;
      name: string;
      address: string;
      coordinates: { lat: number; lng: number };
      rating: number;
      reviewCount: number;
      priceLevel?: number;
      photos: string[];
      types: string[];
      openNow?: boolean;
      nearestStation: {
        id: string;
        name: string;
        coordinates: { lat: number; lng: number };
        lines: string[];
        walkingTimeMinutes: number;
      };
    };
    travelTimes: Array<{
      fromLocationId: string;
      minutes: number;
    }>;
    averageTravelTime: number;
    variance: number;
    score: number;
  }>;
  searchId: string;
  timestamp: string;
  relaxedVariance?: number;
}

export async function searchEquidistant(
  request: SearchRequest
): Promise<SearchResponse> {
  return fetchApi<SearchResponse>('/api/equidistant/search', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Venue API
export interface VenueDetails {
  id: string;
  placeId: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  priceLevel?: number;
  photos: string[];
  types: string[];
  openNow?: boolean;
  openingHours?: string[];
  phoneNumber?: string;
  website?: string;
  reviews: Array<{
    authorName: string;
    rating: number;
    text: string;
    time: string;
    language: string;
  }>;
}

export async function getVenueDetails(
  placeId: string,
  language: string = 'fr'
): Promise<VenueDetails> {
  return fetchApi<VenueDetails>(`/api/venues/${placeId}?language=${language}`);
}

// Directions API
export interface RouteSegment {
  type: 'walk' | 'metro' | 'rer' | 'transilien';
  line?: string;
  from: string;
  to: string;
  durationMinutes: number;
  color?: string;
}

export interface RouteResult {
  fromLocationId: string;
  route: RouteSegment[];
  totalMinutes: number;
}

export async function getDirections(
  fromLocations: Array<{ id: string; coordinates: { lat: number; lng: number } }>,
  to: { lat: number; lng: number }
): Promise<RouteResult[]> {
  return fetchApi<RouteResult[]>('/api/directions/routes', {
    method: 'POST',
    body: JSON.stringify({ fromLocations, to }),
  });
}

