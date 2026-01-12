import { Router } from 'express';
import type { Coordinates, Station } from '../types/index.js';
import { findNearestStations } from '../services/TransitService.js';

const router = Router();

// Use Photon API (OpenStreetMap-based, free, no API key needed)
const PHOTON_API_URL = 'https://photon.komoot.io/api';

// Bounding box de l'Île-de-France (région parisienne)
const IDF_BOUNDS = {
  minLat: 48.12,
  maxLat: 49.25,
  minLng: 1.45,
  maxLng: 3.56
};

interface PhotonFeature {
  properties: {
    osm_id: number;
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    postcode?: string;
    country?: string;
    state?: string;
  };
  geometry: {
    coordinates: [number, number]; // [lng, lat]
  };
}

interface PhotonResponse {
  features: PhotonFeature[];
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  error?: string;
}

// Autocomplete endpoint - using Photon API (OpenStreetMap)
router.get('/autocomplete', async (req, res) => {
  try {
    const { input } = req.query;
    
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ success: false, error: 'Input is required' });
    }

    // Use Photon API for geocoding/autocomplete with bbox filter for Île-de-France
    const params = new URLSearchParams({
      q: input,
      lat: '48.8566',  // Paris center bias
      lon: '2.3522',
      limit: '12',  // Request more to compensate for filtering and prioritization
      lang: 'fr',
      bbox: `${IDF_BOUNDS.minLng},${IDF_BOUNDS.minLat},${IDF_BOUNDS.maxLng},${IDF_BOUNDS.maxLat}`,
    });

    const response = await fetch(`${PHOTON_API_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Photon API error: ${response.status}`);
    }

    const data = await response.json() as PhotonResponse;
    
    // Filter results to ensure they are within Île-de-France bounds and prepare for sorting
    const featuresWithScore = (data.features || []).filter((feature: PhotonFeature) => {
      const [lng, lat] = feature.geometry.coordinates;
      return lat >= IDF_BOUNDS.minLat && lat <= IDF_BOUNDS.maxLat &&
             lng >= IDF_BOUNDS.minLng && lng <= IDF_BOUNDS.maxLng;
    }).map((feature: PhotonFeature) => {
      const props = feature.properties;
      // Score: prioritize addresses with house numbers and street names
      let score = 0;
      if (props.housenumber && props.street) {
        score = 100; // Highest priority: full address with number
      } else if (props.street) {
        score = 50; // Medium priority: street name only
      } else if (props.name) {
        score = 30; // Lower priority: place name only
      }
      
      return { feature, score };
    });
    
    // Sort by score (highest first), then take top results
    const sortedFeatures = featuresWithScore
      .sort((a, b) => b.score - a.score)
      .slice(0, 8) // Return up to 8 results
      .map(({ feature }) => feature);
    
    const predictions = sortedFeatures.map((feature: PhotonFeature) => {
      const props = feature.properties;
      const parts = [];
      
      if (props.housenumber && props.street) {
        parts.push(`${props.housenumber} ${props.street}`);
      } else if (props.street) {
        parts.push(props.street);
      } else if (props.name) {
        parts.push(props.name);
      }
      
      if (props.city) parts.push(props.city);
      if (props.postcode) parts.push(props.postcode);
      
      const description = parts.join(', ') || 'Adresse inconnue';
      const mainText = parts[0] || props.name || 'Adresse';
      const secondaryText = parts.slice(1).join(', ');
      
      return {
        placeId: `osm_${props.osm_id}`,
        description,
        mainText,
        secondaryText,
        coordinates: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]
        }
      };
    });

    res.json({ success: true, data: predictions });
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch autocomplete results' });
  }
});

// Geocode endpoint - get coordinates from place ID (with Photon, coordinates are already included)
router.get('/geocode/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const { lat, lng, address } = req.query;

    // If coordinates are passed directly (from autocomplete), use them
    if (lat && lng) {
      const coordinates: Coordinates = {
        lat: parseFloat(lat as string),
        lng: parseFloat(lng as string)
      };

      const nearestStations = findNearestStations(coordinates, 3);

      return res.json({
        success: true,
        data: {
          address: address as string || 'Adresse sélectionnée',
          name: address as string || 'Adresse sélectionnée',
          coordinates,
          nearestStations
        }
      });
    }

    // Fallback: extract OSM ID and search again
    const osmId = placeId.replace('osm_', '');
    
    // Use Nominatim for reverse lookup by OSM ID
    const response = await fetch(
      `https://nominatim.openstreetmap.org/lookup?osm_ids=N${osmId},W${osmId},R${osmId}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'EntreNous/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim error: ${response.status}`);
    }

    const results = await response.json() as NominatimResult[];
    
    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }

    const result = results[0];
    const coordinates: Coordinates = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    };

    const nearestStations = findNearestStations(coordinates, 3);

    res.json({
      success: true,
      data: {
        address: result.display_name,
        name: result.name || result.display_name,
        coordinates,
        nearestStations
      }
    });
  } catch (error) {
    console.error('Geocode error:', error);
    res.status(500).json({ success: false, error: 'Failed to geocode location' });
  }
});

// Reverse geocode endpoint - for current location
router.post('/reverse-geocode', async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ success: false, error: 'Invalid coordinates' });
    }

    // Use Nominatim for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'EntreNous/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim error: ${response.status}`);
    }

    const result = await response.json() as NominatimResult;
    
    if (!result || result.error) {
      return res.status(404).json({ success: false, error: 'Address not found' });
    }

    const coordinates: Coordinates = { lat, lng };
    const nearestStations = findNearestStations(coordinates, 3);

    res.json({
      success: true,
      data: {
        address: result.display_name,
        coordinates,
        nearestStations
      }
    });
  } catch (error) {
    console.error('Reverse geocode error:', error);
    res.status(500).json({ success: false, error: 'Failed to reverse geocode' });
  }
});

export { router as locationsRouter };
