import type { Location, Station, TravelTime } from '../../../shared/types/index.js';
import { TransitService, findNearestStations } from './TransitService.js';
import { stations } from '../data/stations.js';

export interface EquidistantStation {
  station: Station;
  travelTimes: TravelTime[];
  averageTime: number;
  variance: number;
}

export class EquidistantFinder {
  private transitService: TransitService;

  constructor() {
    this.transitService = new TransitService();
  }

  findEquidistantStations(
    locations: Location[],
    maxVarianceMinutes: number = 10
  ): EquidistantStation[] {
    // Get nearest stations for each starting location
    const startingStations = locations.map(loc => {
      const nearest = findNearestStations(loc.coordinates, 2);
      console.log(`📍 Location "${loc.address}":`, {
        coordinates: loc.coordinates,
        nearestStations: nearest.map(s => ({ name: s.name, walkingTime: s.walkingTimeMinutes }))
      });
      return {
        locationId: loc.id,
        stations: nearest
      };
    });

    console.log('🚇 Starting stations found:', startingStations.map(s => ({
      locationId: s.locationId,
      stationCount: s.stations.length,
      primaryStation: s.stations[0]?.name
    })));

    // Calculate travel times from each starting location to all stations
    const travelTimesFromEachLocation = startingStations.map(({ locationId, stations: nearbyStations }) => {
      // Use the nearest station for Dijkstra
      const primaryStation = nearbyStations[0];
      if (!primaryStation) {
        return { locationId, times: new Map<string, number>() };
      }

      const distances = this.transitService.dijkstra(primaryStation.id);
      
      // Add walking time from origin to the primary station
      const adjustedTimes = new Map<string, number>();
      for (const [stationId, transitTime] of distances) {
        adjustedTimes.set(stationId, transitTime + primaryStation.walkingTimeMinutes);
      }

      return { locationId, times: adjustedTimes };
    });

    // Find stations that are equidistant for all participants
    const equidistantStations: EquidistantStation[] = [];

    for (const station of stations) {
      const travelTimes: TravelTime[] = [];
      let valid = true;

      for (let i = 0; i < locations.length; i++) {
        const { locationId, times } = travelTimesFromEachLocation[i];
        const time = times.get(station.id);

        if (time === undefined || time === Infinity) {
          valid = false;
          break;
        }

        // Add walking time from station to destination (estimate 3 min average)
        const totalTime = time + 3;

        travelTimes.push({
          fromLocationId: locationId,
          minutes: totalTime,
          route: [] // Will be calculated on demand
        });
      }

      if (!valid || travelTimes.length !== locations.length) {
        continue;
      }

      const times = travelTimes.map(t => t.minutes);
      const maxTime = Math.max(...times);
      const minTime = Math.min(...times);
      const variance = maxTime - minTime;

      if (variance <= maxVarianceMinutes) {
        const averageTime = times.reduce((a, b) => a + b, 0) / times.length;

        equidistantStations.push({
          station: {
            ...station,
            walkingTimeMinutes: 3 // Default estimate
          },
          travelTimes,
          averageTime,
          variance
        });
      }
    }

    // Sort by average travel time, then by variance
    equidistantStations.sort((a, b) => {
      if (Math.abs(a.averageTime - b.averageTime) < 2) {
        return a.variance - b.variance;
      }
      return a.averageTime - b.averageTime;
    });

    console.log(`✅ Found ${equidistantStations.length} equidistant stations (maxVariance: ${maxVarianceMinutes})`);
    if (equidistantStations.length > 0) {
      console.log('📊 Top stations:', equidistantStations.slice(0, 5).map(s => ({
        name: s.station.name,
        avgTime: s.averageTime.toFixed(1),
        variance: s.variance.toFixed(1)
      })));
    }

    // Return top 20 stations for venue search
    return equidistantStations.slice(0, 20);
  }
}

