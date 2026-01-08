import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { SearchRequest, SearchResponse, Location, SelectedFilters } from '../types/index.js';
import { EquidistantFinder } from '../services/EquidistantFinder.js';
import { VenueService } from '../services/VenueService.js';
import { CacheService } from '../services/CacheService.js';

const router = Router();
const equidistantFinder = new EquidistantFinder();
const venueService = new VenueService();
const cacheService = new CacheService();

router.post('/search', async (req, res) => {
  try {
    const { locations, theme, maxVarianceMinutes = 10, filters }: SearchRequest = req.body;

    console.log('🔍 Search request received:', {
      locationsCount: locations?.length,
      theme,
      maxVarianceMinutes,
      filters,
      locations: locations?.map(l => ({
        id: l.id,
        address: l.address,
        coordinates: l.coordinates,
        nearestStationsCount: l.nearestStations?.length
      }))
    });

    // Validate input
    if (!locations || locations.length < 2) {
      return res.status(400).json({ 
        success: false, 
        error: 'At least 2 locations are required' 
      });
    }

    if (locations.length > 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'Maximum 6 locations allowed' 
      });
    }

    if (!theme || !['bars', 'restaurants', 'kids'].includes(theme)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid theme. Must be bars, restaurants, or kids' 
      });
    }

    // Generate cache key (include filters in cache key)
    const cacheKey = generateCacheKey(locations, theme, maxVarianceMinutes, filters);
    
    // Check cache
    const cachedResult = await cacheService.get<SearchResponse>(cacheKey);
    if (cachedResult) {
      return res.json({ success: true, data: cachedResult });
    }

    // Find equidistant stations
    let equidistantStations = equidistantFinder.findEquidistantStations(
      locations,
      maxVarianceMinutes
    );

    console.log(`📍 Found ${equidistantStations.length} equidistant stations with variance ${maxVarianceMinutes}`);

    let relaxedVariance: number | undefined;

    // Progressive relaxation if no results
    if (equidistantStations.length === 0) {
      for (const variance of [15, 20, 25]) {
        equidistantStations = equidistantFinder.findEquidistantStations(
          locations,
          variance
        );
        console.log(`📍 Relaxed search: ${equidistantStations.length} stations with variance ${variance}`);
        if (equidistantStations.length > 0) {
          relaxedVariance = variance;
          break;
        }
      }
    }

    if (equidistantStations.length === 0) {
      console.log('❌ No equidistant stations found after relaxation');
      return res.json({
        success: true,
        data: {
          results: [],
          searchId: uuidv4(),
          timestamp: new Date().toISOString(),
          message: 'No equidistant locations found. Try different starting points.'
        }
      });
    }

    console.log(`🏪 Searching venues near ${equidistantStations.length} stations for theme: ${theme}`);
    
    // Search for venues near equidistant stations (with filters if provided)
    const results = await venueService.searchVenuesNearStations(
      equidistantStations,
      theme,
      locations,
      filters
    );
    
    console.log(`✅ Found ${results.length} venues`);

    const response: SearchResponse = {
      results,
      searchId: uuidv4(),
      timestamp: new Date().toISOString(),
      relaxedVariance
    };

    // Cache for 1 hour
    await cacheService.set(cacheKey, response, 3600);

    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

// Get search by ID (for sharing)
router.get('/search/:searchId', async (req, res) => {
  try {
    const { searchId } = req.params;
    const cached = await cacheService.get<SearchResponse>(`search:${searchId}`);
    
    if (!cached) {
      return res.status(404).json({ success: false, error: 'Search not found or expired' });
    }

    res.json({ success: true, data: cached });
  } catch (error) {
    console.error('Get search error:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve search' });
  }
});

function generateCacheKey(
  locations: Location[], 
  theme: string, 
  variance: number,
  filters?: SelectedFilters
): string {
  const locationIds = locations
    .map(l => `${l.coordinates.lat.toFixed(4)},${l.coordinates.lng.toFixed(4)}`)
    .sort()
    .join('|');
  
  // Include filters in cache key if present
  const filtersKey = filters 
    ? Object.entries(filters)
        .filter(([_, values]) => values.length > 0)
        .map(([key, values]) => `${key}:${values.sort().join(',')}`)
        .sort()
        .join('|')
    : '';
  
  return `equidistant:${theme}:${variance}:${locationIds}:${filtersKey}`;
}

export { router as equidistantRouter };

