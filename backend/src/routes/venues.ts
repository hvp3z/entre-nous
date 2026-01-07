import { Router } from 'express';
import { VenueService } from '../services/VenueService.js';
import { CacheService } from '../services/CacheService.js';
import type { VenueDetails } from '../../../shared/types/index.js';

const router = Router();
const venueService = new VenueService();
const cacheService = new CacheService();

// Get venue details
router.get('/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const { language = 'fr' } = req.query;

    // Check cache
    const cacheKey = `venue:${placeId}:${language}`;
    const cached = await cacheService.get<VenueDetails>(cacheKey);
    if (cached) {
      return res.json({ success: true, data: cached });
    }

    const venueDetails = await venueService.getVenueDetails(
      placeId, 
      language as string
    );

    if (!venueDetails) {
      return res.status(404).json({ success: false, error: 'Venue not found' });
    }

    // Cache for 24 hours
    await cacheService.set(cacheKey, venueDetails, 86400);

    res.json({ success: true, data: venueDetails });
  } catch (error) {
    console.error('Venue details error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch venue details' });
  }
});

// Search venues by location (direct search)
router.get('/search/nearby', async (req, res) => {
  try {
    const { lat, lng, theme, radius = 400 } = req.query;

    if (!lat || !lng || !theme) {
      return res.status(400).json({ 
        success: false, 
        error: 'lat, lng, and theme are required' 
      });
    }

    const venues = await venueService.searchVenuesByLocation(
      { lat: parseFloat(lat as string), lng: parseFloat(lng as string) },
      theme as 'bars' | 'restaurants' | 'kids',
      parseInt(radius as string)
    );

    res.json({ success: true, data: venues });
  } catch (error) {
    console.error('Venue search error:', error);
    res.status(500).json({ success: false, error: 'Failed to search venues' });
  }
});

export { router as venuesRouter };

