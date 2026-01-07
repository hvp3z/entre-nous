import { Client, PlaceType1, Language } from '@googlemaps/google-maps-services-js';
import type { 
  Coordinates, 
  Venue, 
  VenueDetails, 
  Theme, 
  SearchResult,
  Location,
  Review
} from '../types/index.js';
import type { EquidistantStation } from './EquidistantFinder.js';

// Helper function to get API key lazily (after dotenv is loaded)
function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable is required');
  }
  return key;
}

const THEME_CONFIG = {
  bars: {
    type: 'bar' as PlaceType1,
    keywords: ['cocktail', 'wine bar', 'craft beer', 'pub'],
    minRating: 3.5
  },
  restaurants: {
    type: 'restaurant' as PlaceType1,
    keywords: ['bistro', 'brasserie', 'restaurant'],
    minRating: 4.0
  },
  kids: {
    type: 'park' as PlaceType1,
    keywords: ['family', 'children', 'playground', 'museum', 'parc'],
    minRating: 3.5
  }
};

export class VenueService {
  private client: Client;

  constructor() {
    this.client = new Client({});
  }

  async searchVenuesNearStations(
    equidistantStations: EquidistantStation[],
    theme: Theme,
    locations: Location[]
  ): Promise<SearchResult[]> {
    const config = THEME_CONFIG[theme];
    const allVenues: SearchResult[] = [];
    const seenPlaceIds = new Set<string>();

    // Search near top 10 equidistant stations
    for (const equidistantStation of equidistantStations.slice(0, 10)) {
      try {
        const venues = await this.searchVenuesByLocation(
          equidistantStation.station.coordinates,
          theme,
          400
        );

        for (const venue of venues) {
          if (seenPlaceIds.has(venue.placeId)) continue;
          seenPlaceIds.add(venue.placeId);

          // Calculate score: rating * log(reviews) / avg travel time
          const score = (venue.rating * Math.log(venue.reviewCount + 1)) / 
                       (equidistantStation.averageTime || 1);

          allVenues.push({
            venue: {
              ...venue,
              nearestStation: equidistantStation.station
            },
            travelTimes: equidistantStation.travelTimes,
            averageTravelTime: equidistantStation.averageTime,
            variance: equidistantStation.variance,
            score
          });
        }
      } catch (error) {
        console.error(`Error searching venues near ${equidistantStation.station.name}:`, error);
      }
    }

    // Sort by score and return top 10
    allVenues.sort((a, b) => b.score - a.score);
    return allVenues.slice(0, 10);
  }

  async searchVenuesByLocation(
    coordinates: Coordinates,
    theme: Theme,
    radius: number = 400
  ): Promise<Venue[]> {
    const config = THEME_CONFIG[theme];

    try {
      const response = await this.client.placesNearby({
        params: {
          location: coordinates,
          radius,
          type: config.type,
          key: getApiKey(),
          language: Language.fr
        }
      });

      const venues: Venue[] = [];

      for (const place of response.data.results) {
        if (!place.place_id || !place.geometry?.location) continue;
        if ((place.rating || 0) < config.minRating) continue;

        venues.push({
          id: place.place_id,
          placeId: place.place_id,
          name: place.name || 'Unknown',
          address: place.vicinity || '',
          coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          },
          rating: place.rating || 0,
          reviewCount: place.user_ratings_total || 0,
          priceLevel: place.price_level,
          photos: place.photos?.slice(0, 3).map(p => 
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${p.photo_reference}&key=${getApiKey()}`
          ) || [],
          types: place.types || [],
          openNow: place.opening_hours?.open_now,
          nearestStation: { 
            id: '', 
            name: '', 
            coordinates: { lat: 0, lng: 0 }, 
            lines: [], 
            walkingTimeMinutes: 0 
          }
        });
      }

      return venues;
    } catch (error) {
      console.error('Places search error:', error);
      return [];
    }
  }

  async getVenueDetails(placeId: string, language: Language = Language.fr): Promise<VenueDetails | null> {
    try {
      const response = await this.client.placeDetails({
        params: {
          place_id: placeId,
          key: getApiKey(),
          language: language,
          fields: [
            'place_id',
            'name',
            'formatted_address',
            'geometry',
            'rating',
            'user_ratings_total',
            'price_level',
            'photos',
            'types',
            'opening_hours',
            'formatted_phone_number',
            'website',
            'reviews'
          ]
        }
      });

      const place = response.data.result;
      if (!place.geometry?.location) return null;

      const reviews: Review[] = (place.reviews || []).map(r => ({
        authorName: r.author_name || 'Anonymous',
        rating: r.rating || 0,
        text: r.text || '',
        time: new Date(Number(r.time || 0) * 1000).toISOString(),
        language: r.language || 'fr'
      }));

      return {
        id: place.place_id || placeId,
        placeId: place.place_id || placeId,
        name: place.name || 'Unknown',
        address: place.formatted_address || '',
        coordinates: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        priceLevel: place.price_level,
        photos: place.photos?.slice(0, 5).map(p => 
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${getApiKey()}`
        ) || [],
        types: place.types || [],
        openNow: place.opening_hours?.open_now,
        openingHours: place.opening_hours?.weekday_text,
        phoneNumber: place.formatted_phone_number,
        website: place.website,
        nearestStation: { 
          id: '', 
          name: '', 
          coordinates: { lat: 0, lng: 0 }, 
          lines: [], 
          walkingTimeMinutes: 0 
        },
        reviews
      };
    } catch (error) {
      console.error('Place details error:', error);
      return null;
    }
  }
}

