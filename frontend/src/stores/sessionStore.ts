import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'bars' | 'restaurants' | 'kids';

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

  // UI State
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
  bottomSheetHeight: 'collapsed' | 'half' | 'full';
  setBottomSheetHeight: (height: 'collapsed' | 'half' | 'full') => void;

  // Reset
  resetSearch: () => void;
  resetAll: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
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

      // UI State
      showBottomSheet: false,
      setShowBottomSheet: (showBottomSheet) => set({ showBottomSheet }),
      bottomSheetHeight: 'half',
      setBottomSheetHeight: (bottomSheetHeight) => set({ bottomSheetHeight }),

      // Reset
      resetSearch: () =>
        set({
          searchResults: [],
          selectedVenue: null,
          relaxedVariance: null,
          showBottomSheet: false,
        }),
      resetAll: () =>
        set({
          theme: null,
          locations: [],
          searchResults: [],
          selectedVenue: null,
          relaxedVariance: null,
          isSearching: false,
          showBottomSheet: false,
          bottomSheetHeight: 'half',
        }),
    }),
    {
      name: 'entre-nous-session',
      partialize: (state) => ({
        theme: state.theme,
        locations: state.locations,
      }),
    }
  )
);

