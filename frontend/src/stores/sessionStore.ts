import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'bars' | 'restaurants' | 'cafes' | 'kids';

// Filter types (synced with shared/types)
export type FilterGroupType = 'category' | 'cuisine' | 'age' | 'price';

export interface FilterOption {
  id: string;
  labelKey: string;
  keywords: string[];
  googleTypes?: string[];
  icon?: string;
}

export interface FilterGroup {
  id: string;
  type: FilterGroupType;
  labelKey: string;
  options: FilterOption[];
  multiSelect: boolean;
}

export interface ThemeFiltersConfig {
  groups: FilterGroup[];
}

export interface SelectedFilters {
  [groupId: string]: string[];
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
      multiSelect: false,
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
      multiSelect: true,
      options: [
        { id: 'age-0-3', labelKey: 'filters.kids.age03', keywords: ['toddler', 'bébé', 'tout-petit'] },
        { id: 'age-4-7', labelKey: 'filters.kids.age47', keywords: ['children', 'enfant', 'kids'] },
        { id: 'age-8-12', labelKey: 'filters.kids.age812', keywords: ['pre-teen', 'junior', 'grand enfant'] },
      ],
    },
  ],
};

export const THEME_FILTERS: Record<Theme, ThemeFiltersConfig> = {
  bars: BARS_FILTERS,
  restaurants: RESTAURANTS_FILTERS,
  cafes: CAFES_FILTERS,
  kids: KIDS_FILTERS,
};

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Station {
  id: string;
  name: string;
  coordinates: Coordinates;
  lines: string[];
  walkingTimeMinutes: number;
}

export interface Location {
  id: string;
  address: string;
  coordinates: Coordinates;
  nearestStations: Station[];
}

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
  nearestStation: Station;
}

export interface TravelTime {
  fromLocationId: string;
  minutes: number;
}

export interface SearchResult {
  venue: Venue;
  travelTimes: TravelTime[];
  averageTravelTime: number;
  variance: number;
  score: number;
}

interface SessionState {
  // Theme
  theme: Theme | null;
  setTheme: (theme: Theme) => void;

  // Locations
  locations: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (id: string) => void;
  clearLocations: () => void;

  // Filters
  selectedFilters: Record<Theme, SelectedFilters>;
  setFilter: (theme: Theme, groupId: string, optionIds: string[]) => void;
  toggleFilter: (theme: Theme, groupId: string, optionId: string, multiSelect: boolean) => void;
  clearFilters: (theme: Theme) => void;
  getActiveFilters: (theme: Theme) => SelectedFilters;

  // Search
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  relaxedVariance: number | null;
  setRelaxedVariance: (variance: number | null) => void;

  // Selected venue
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;

  // Highlighted venue (for scroll-to animation)
  highlightedVenueId: string | null;
  setHighlightedVenueId: (id: string | null) => void;

  // UI State
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
  bottomSheetHeight: 'collapsed' | 'half' | 'full';
  setBottomSheetHeight: (height: 'collapsed' | 'half' | 'full') => void;
  mobileViewMode: 'list' | 'map';
  setMobileViewMode: (mode: 'list' | 'map') => void;

  // Reset
  resetSearch: () => void;
  resetAll: () => void;
}

const initialFilters: Record<Theme, SelectedFilters> = {
  bars: {},
  restaurants: {},
  cafes: {},
  kids: {},
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: null,
      setTheme: (theme) => set({ theme }),

      // Locations
      locations: [],
      addLocation: (location) =>
        set((state) => ({
          locations: state.locations.length < 6
            ? [...state.locations, location]
            : state.locations,
        })),
      removeLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((l) => l.id !== id),
        })),
      clearLocations: () => set({ locations: [] }),

      // Filters
      selectedFilters: initialFilters,
      setFilter: (theme, groupId, optionIds) =>
        set((state) => ({
          selectedFilters: {
            ...state.selectedFilters,
            [theme]: {
              ...state.selectedFilters[theme],
              [groupId]: optionIds,
            },
          },
        })),
      toggleFilter: (theme, groupId, optionId, multiSelect) =>
        set((state) => {
          const currentFilters = state.selectedFilters[theme][groupId] || [];
          let newFilters: string[];

          if (multiSelect) {
            // Toggle: add if not present, remove if present
            if (currentFilters.includes(optionId)) {
              newFilters = currentFilters.filter((id) => id !== optionId);
            } else {
              newFilters = [...currentFilters, optionId];
            }
          } else {
            // Exclusive: select only this one, or deselect if already selected
            if (currentFilters.includes(optionId)) {
              newFilters = [];
            } else {
              newFilters = [optionId];
            }
          }

          return {
            selectedFilters: {
              ...state.selectedFilters,
              [theme]: {
                ...state.selectedFilters[theme],
                [groupId]: newFilters,
              },
            },
          };
        }),
      clearFilters: (theme) =>
        set((state) => ({
          selectedFilters: {
            ...state.selectedFilters,
            [theme]: {},
          },
        })),
      getActiveFilters: (theme) => get().selectedFilters[theme] || {},

      // Search
      isSearching: false,
      setIsSearching: (isSearching) => set({ isSearching }),
      searchResults: [],
      setSearchResults: (searchResults) => set({ searchResults }),
      relaxedVariance: null,
      setRelaxedVariance: (relaxedVariance) => set({ relaxedVariance }),

      // Selected venue
      selectedVenue: null,
      setSelectedVenue: (selectedVenue) => set({ selectedVenue }),

      // Highlighted venue
      highlightedVenueId: null,
      setHighlightedVenueId: (highlightedVenueId) => set({ highlightedVenueId }),

      // UI State
      showBottomSheet: false,
      setShowBottomSheet: (showBottomSheet) => set({ showBottomSheet }),
      bottomSheetHeight: 'half',
      setBottomSheetHeight: (bottomSheetHeight) => set({ bottomSheetHeight }),
      mobileViewMode: 'list',
      setMobileViewMode: (mobileViewMode) => set({ mobileViewMode }),

      // Reset
      resetSearch: () =>
        set({
          searchResults: [],
          selectedVenue: null,
          highlightedVenueId: null,
          relaxedVariance: null,
          showBottomSheet: false,
          mobileViewMode: 'list',
        }),
      resetAll: () =>
        set({
          theme: null,
          locations: [],
          searchResults: [],
          selectedVenue: null,
          highlightedVenueId: null,
          relaxedVariance: null,
          isSearching: false,
          showBottomSheet: false,
          bottomSheetHeight: 'half',
          mobileViewMode: 'list',
          selectedFilters: initialFilters,
        }),
    }),
    {
      name: 'entre-nous-session',
      partialize: (state) => ({
        theme: state.theme,
        locations: state.locations,
        selectedFilters: state.selectedFilters,
      }),
    }
  )
);

