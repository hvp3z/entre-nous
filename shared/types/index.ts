// Location types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  address: string;
  coordinates: Coordinates;
  nearestStations: Station[];
}

// Station types
export interface Station {
  id: string;
  name: string;
  coordinates: Coordinates;
  lines: string[];
  walkingTimeMinutes: number;
}

// Theme types
export type Theme = 'bars' | 'restaurants' | 'kids';

export interface ThemeConfig {
  id: Theme;
  nameKey: string;
  icon: string;
  googlePlacesType: string;
  keywords: string[];
  color: string;
}

// Venue types
export interface Venue {
  id: string;
  placeId: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  priceLevel?: number;
  photos: string[];
  types: string[];
  openNow?: boolean;
  openingHours?: string[];
  phoneNumber?: string;
  website?: string;
  nearestStation: Station;
}

export interface VenueDetails extends Venue {
  reviews: Review[];
}

export interface Review {
  authorName: string;
  rating: number;
  text: string;
  time: string;
  language: string;
}

// Search types
export interface SearchRequest {
  locations: Location[];
  theme: Theme;
  maxVarianceMinutes?: number;
}

export interface SearchResult {
  venue: Venue;
  travelTimes: TravelTime[];
  averageTravelTime: number;
  variance: number;
  score: number;
}

export interface TravelTime {
  fromLocationId: string;
  minutes: number;
  route: RouteSegment[];
}

export interface RouteSegment {
  type: 'walk' | 'metro' | 'rer' | 'transilien';
  line?: string;
  from: string;
  to: string;
  durationMinutes: number;
  color?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  searchId: string;
  timestamp: string;
  relaxedVariance?: number;
}

// Transit graph types
export interface TransitGraph {
  stations: Map<string, Station>;
  edges: Map<string, TransitEdge[]>;
}

export interface TransitEdge {
  toStationId: string;
  line: string;
  durationMinutes: number;
  type: 'metro' | 'rer' | 'transilien' | 'interchange';
}

// Session types
export interface SessionState {
  locations: Location[];
  theme: Theme | null;
  searchResults: SearchResult[];
  selectedVenue: Venue | null;
  locale: 'fr' | 'en';
}

