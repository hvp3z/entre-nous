import { Router } from 'express';
import type { Coordinates, RouteSegment } from '../../../shared/types/index.js';
import { TransitService } from '../services/TransitService.js';
import { CacheService } from '../services/CacheService.js';

const router = Router();
const transitService = new TransitService();
const cacheService = new CacheService();

// Get directions from a starting point to a destination
router.post('/route', async (req, res) => {
  try {
    const { from, to } = req.body as { 
      from: Coordinates; 
      to: Coordinates;
    };

    if (!from || !to) {
      return res.status(400).json({ 
        success: false, 
        error: 'from and to coordinates are required' 
      });
    }

    // Generate cache key
    const cacheKey = `route:${from.lat.toFixed(4)},${from.lng.toFixed(4)}:${to.lat.toFixed(4)},${to.lng.toFixed(4)}`;
    
    const cached = await cacheService.get<RouteSegment[]>(cacheKey);
    if (cached) {
      return res.json({ success: true, data: cached });
    }

    const route = transitService.calculateRoute(from, to);

    // Cache for 1 hour
    await cacheService.set(cacheKey, route, 3600);

    res.json({ success: true, data: route });
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate route' });
  }
});

// Get directions for multiple starting points to same destination
router.post('/routes', async (req, res) => {
  try {
    const { fromLocations, to } = req.body as { 
      fromLocations: Array<{ id: string; coordinates: Coordinates }>;
      to: Coordinates;
    };

    if (!fromLocations || !Array.isArray(fromLocations) || !to) {
      return res.status(400).json({ 
        success: false, 
        error: 'fromLocations array and to coordinates are required' 
      });
    }

    const routes = fromLocations.map(loc => ({
      fromLocationId: loc.id,
      route: transitService.calculateRoute(loc.coordinates, to),
      totalMinutes: transitService.calculateTravelTime(loc.coordinates, to)
    }));

    res.json({ success: true, data: routes });
  } catch (error) {
    console.error('Routes error:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate routes' });
  }
});

export { router as directionsRouter };

