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
export type Theme = 'bars' | 'restaurants' | 'cafes' | 'kids';

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
  filters?: SelectedFilters;
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
  type: 'walk' | 'metro' | 'rer' | 'transilien' | 'tramway';
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

// Filter types
export type FilterGroupType = 'category' | 'cuisine' | 'age' | 'weather' | 'price' | 'ambiance';

export interface FilterOption {
  id: string;
  labelKey: string; // i18n key
  keywords: string[]; // Google Places keywords
  googleTypes?: string[]; // Optional Google Places types to use
  icon?: string; // Optional icon name
}

export interface FilterGroup {
  id: string;
  type: FilterGroupType;
  labelKey: string;
  options: FilterOption[];
  multiSelect: boolean; // false = exclusive (radio), true = cumulative (checkbox)
}

export interface ThemeFiltersConfig {
  groups: FilterGroup[];
}

// Filter configurations per theme
export const BARS_FILTERS: ThemeFiltersConfig = {
  groups: [
    {
      id: 'bars-category',
      type: 'category',
      labelKey: 'filters.bars.category',
      multiSelect: true,
      options: [
        { id: 'beer', labelKey: 'filters.bars.beer', keywords: ['craft beer', 'brasserie', 'beer bar', 'pub'] },
        { id: 'cocktails', labelKey: 'filters.bars.cocktails', keywords: ['cocktail bar', 'mixology', 'cocktails'] },
        { id: 'wine', labelKey: 'filters.bars.wine', keywords: ['wine bar', 'bar à vin', 'vin naturel'] },
        { id: 'tapas', labelKey: 'filters.bars.tapas', keywords: ['tapas', 'tapas bar', 'small plates'] },
        { id: 'mocktails', labelKey: 'filters.bars.mocktails', keywords: ['juice bar', 'smoothie', 'sans alcool', 'mocktail'] },
      ],
    },
    {
      id: 'bars-price',
      type: 'price',
      labelKey: 'filters.price.title',
      multiSelect: false,
      options: [
        { id: 'price-1', labelKey: 'filters.price.cheap', keywords: [] },
        { id: 'price-2', labelKey: 'filters.price.moderate', keywords: [] },
        { id: 'price-3', labelKey: 'filters.price.expensive', keywords: [] },
        { id: 'price-4', labelKey: 'filters.price.veryExpensive', keywords: [] },
      ],
    },
  ],
};

export const RESTAURANTS_FILTERS: ThemeFiltersConfig = {
  groups: [
    {
      id: 'restaurants-cuisine',
      type: 'cuisine',
      labelKey: 'filters.restaurants.cuisine',
      multiSelect: true,
      options: [
        { id: 'brasserie', labelKey: 'filters.restaurants.brasserie', keywords: ['brasserie', 'french bistro', 'bistrot'] },
        { id: 'italian', labelKey: 'filters.restaurants.italian', keywords: ['italian', 'italien', 'pizza', 'pasta', 'trattoria'] },
        { id: 'chinese', labelKey: 'filters.restaurants.chinese', keywords: ['chinese', 'chinois', 'dim sum', 'cantonese'] },
        { id: 'indian', labelKey: 'filters.restaurants.indian', keywords: ['indian', 'indien', 'curry', 'tandoori'] },
        { id: 'korean', labelKey: 'filters.restaurants.korean', keywords: ['korean', 'coréen', 'korean bbq', 'bibimbap'] },
        { id: 'japanese', labelKey: 'filters.restaurants.japanese', keywords: ['japanese', 'japonais', 'sushi', 'ramen', 'izakaya'] },
        { id: 'turkish', labelKey: 'filters.restaurants.turkish', keywords: ['turkish', 'turc', 'lebanese', 'libanais', 'kebab', 'mezze'] },
        { id: 'african', labelKey: 'filters.restaurants.african', keywords: ['african', 'africain', 'ethiopian', 'senegalese', 'mafé'] },
      ],
    },
    {
      id: 'restaurants-price',
      type: 'price',
      labelKey: 'filters.price.title',
      multiSelect: false,
      options: [
        { id: 'price-1', labelKey: 'filters.price.cheap', keywords: [] },
        { id: 'price-2', labelKey: 'filters.price.moderate', keywords: [] },
        { id: 'price-3', labelKey: 'filters.price.expensive', keywords: [] },
        { id: 'price-4', labelKey: 'filters.price.veryExpensive', keywords: [] },
      ],
    },
  ],
};

export const CAFES_FILTERS: ThemeFiltersConfig = {
  groups: [
    {
      id: 'cafes-category',
      type: 'category',
      labelKey: 'filters.cafes.category',
      multiSelect: true,
      options: [
        { id: 'specialty', labelKey: 'filters.cafes.specialty', keywords: ['specialty coffee', 'third wave', 'coffee shop', 'café de spécialité', 'torréfacteur'] },
        { id: 'tearoom', labelKey: 'filters.cafes.tearoom', keywords: ['tea room', 'salon de thé', 'tea house', 'thé'] },
        { id: 'brunch', labelKey: 'filters.cafes.brunch', keywords: ['brunch', 'breakfast', 'petit-déjeuner', 'brunch spot'] },
        { id: 'coworking', labelKey: 'filters.cafes.coworking', keywords: ['laptop friendly', 'coworking', 'work cafe', 'wifi', 'travail'] },
        { id: 'pastry', labelKey: 'filters.cafes.pastry', keywords: ['bakery', 'pâtisserie', 'pastry', 'boulangerie', 'viennoiserie'] },
      ],
    },
    {
      id: 'cafes-ambiance',
      type: 'ambiance',
      labelKey: 'filters.cafes.ambiance',
      multiSelect: false,
      options: [
        { id: 'cozy', labelKey: 'filters.cafes.cozy', keywords: ['cozy', 'quiet', 'calm', 'cosy', 'calme', 'studieux'] },
        { id: 'lively', labelKey: 'filters.cafes.lively', keywords: ['lively', 'social', 'animé', 'convivial', 'bustling'] },
        { id: 'terrace', labelKey: 'filters.cafes.terrace', keywords: ['terrace', 'terrasse', 'outdoor seating', 'extérieur', 'patio'] },
      ],
    },
    {
      id: 'cafes-price',
      type: 'price',
      labelKey: 'filters.price.title',
      multiSelect: false,
      options: [
        { id: 'price-1', labelKey: 'filters.price.cheap', keywords: [] },
        { id: 'price-2', labelKey: 'filters.price.moderate', keywords: [] },
        { id: 'price-3', labelKey: 'filters.price.expensive', keywords: [] },
        { id: 'price-4', labelKey: 'filters.price.veryExpensive', keywords: [] },
      ],
    },
  ],
};

export const KIDS_FILTERS: ThemeFiltersConfig = {
  groups: [
    {
      id: 'kids-category',
      type: 'category',
      labelKey: 'filters.kids.category',
      multiSelect: false, // Exclusive selection
      options: [
        { 
          id: 'culture', 
          labelKey: 'filters.kids.culture', 
          keywords: ['museum', 'musée', 'science museum', 'children museum', 'ludique', 'éducatif'],
          googleTypes: ['museum']
        },
        { 
          id: 'nature', 
          labelKey: 'filters.kids.nature', 
          keywords: ['zoo', 'aquarium', 'farm', 'ferme pédagogique', 'jardin botanique', 'botanical garden'],
          googleTypes: ['zoo', 'aquarium', 'park']
        },
        { 
          id: 'shows', 
          labelKey: 'filters.kids.shows', 
          keywords: ['theater', 'théâtre enfant', 'circus', 'cirque', 'puppet', 'marionnettes', 'spectacle'],
          googleTypes: ['performing_arts_theater']
        },
        { 
          id: 'activities', 
          labelKey: 'filters.kids.activities', 
          keywords: ['indoor playground', 'parc indoor', 'trampoline', 'climbing', 'escalade', 'bowling', 'laser game'],
          googleTypes: ['amusement_center', 'bowling_alley']
        },
      ],
    },
    {
      id: 'kids-age',
      type: 'age',
      labelKey: 'filters.kids.ageGroup',
      multiSelect: true, // Can select multiple age ranges
      options: [
        { id: 'age-0-3', labelKey: 'filters.kids.age03', keywords: ['toddler', 'bébé', 'tout-petit'] },
        { id: 'age-4-7', labelKey: 'filters.kids.age47', keywords: ['children', 'enfant', 'kids'] },
        { id: 'age-8-12', labelKey: 'filters.kids.age812', keywords: ['pre-teen', 'junior', 'grand enfant'] },
      ],
    },
    {
      id: 'kids-weather',
      type: 'weather',
      labelKey: 'filters.kids.weather',
      multiSelect: false, // Exclusive: indoor OR outdoor
      options: [
        { id: 'indoor', labelKey: 'filters.kids.indoor', keywords: ['indoor', 'intérieur', 'covered'] },
        { id: 'outdoor', labelKey: 'filters.kids.outdoor', keywords: ['outdoor', 'extérieur', 'plein air', 'garden'] },
      ],
    },
  ],
};

// Map theme to its filters config
export const THEME_FILTERS: Record<Theme, ThemeFiltersConfig> = {
  bars: BARS_FILTERS,
  restaurants: RESTAURANTS_FILTERS,
  cafes: CAFES_FILTERS,
  kids: KIDS_FILTERS,
};

// Selected filters state
export interface SelectedFilters {
  [groupId: string]: string[]; // Array of selected option IDs
}
