import type { Coordinates, Station, RouteSegment } from '../types/index.js';
import { stations, stationIndex, lineConnections, METRO_LINE_COLORS } from '../data/stations.js';

export class TransitService {
  private stationMap: Map<string, Station>;
  private adjacencyList: Map<string, Array<{ stationId: string; line: string; duration: number }>>;

  constructor() {
    this.stationMap = new Map(stations.map(s => [s.id, s]));
    this.adjacencyList = this.buildAdjacencyList();
  }

  private buildAdjacencyList(): Map<string, Array<{ stationId: string; line: string; duration: number }>> {
    const adjacency = new Map<string, Array<{ stationId: string; line: string; duration: number }>>();

    for (const connection of lineConnections) {
      const { from, to, line, duration } = connection;
      
      if (!adjacency.has(from)) {
        adjacency.set(from, []);
      }
      if (!adjacency.has(to)) {
        adjacency.set(to, []);
      }

      adjacency.get(from)!.push({ stationId: to, line, duration });
      adjacency.get(to)!.push({ stationId: from, line, duration });
    }

    return adjacency;
  }

  // Dijkstra's algorithm for shortest path
  dijkstra(startStationId: string): Map<string, number> {
    const distances = new Map<string, number>();
    const visited = new Set<string>();
    const pq: Array<{ stationId: string; distance: number }> = [];

    // Initialize
    for (const stationId of this.stationMap.keys()) {
      distances.set(stationId, Infinity);
    }
    distances.set(startStationId, 0);
    pq.push({ stationId: startStationId, distance: 0 });

    while (pq.length > 0) {
      // Get station with minimum distance
      pq.sort((a, b) => a.distance - b.distance);
      const { stationId, distance } = pq.shift()!;

      if (visited.has(stationId)) continue;
      visited.add(stationId);

      const neighbors = this.adjacencyList.get(stationId) || [];
      for (const { stationId: neighborId, duration } of neighbors) {
        const newDistance = distance + duration;
        if (newDistance < (distances.get(neighborId) || Infinity)) {
          distances.set(neighborId, newDistance);
          pq.push({ stationId: neighborId, distance: newDistance });
        }
      }
    }

    return distances;
  }

  // Calculate travel time between two coordinates
  calculateTravelTime(from: Coordinates, to: Coordinates): number {
    const fromStations = findNearestStations(from, 1);
    const toStations = findNearestStations(to, 1);

    if (fromStations.length === 0 || toStations.length === 0) {
      return Infinity;
    }

    const fromStation = fromStations[0];
    const toStation = toStations[0];

    const distances = this.dijkstra(fromStation.id);
    const transitTime = distances.get(toStation.id) || Infinity;

    // Add walking time from origin to station and station to destination
    return fromStation.walkingTimeMinutes + transitTime + toStation.walkingTimeMinutes;
  }

  // Calculate detailed route between two coordinates
  calculateRoute(from: Coordinates, to: Coordinates): RouteSegment[] {
    const fromStations = findNearestStations(from, 1);
    const toStations = findNearestStations(to, 1);

    if (fromStations.length === 0 || toStations.length === 0) {
      return [];
    }

    const fromStation = fromStations[0];
    const toStation = toStations[0];

    const route: RouteSegment[] = [];

    // Walking segment to first station
    if (fromStation.walkingTimeMinutes > 0) {
      route.push({
        type: 'walk',
        from: 'Your location',
        to: fromStation.name,
        durationMinutes: fromStation.walkingTimeMinutes
      });
    }

    // Get transit route using BFS with path reconstruction
    const transitRoute = this.findPath(fromStation.id, toStation.id);
    route.push(...transitRoute);

    // Walking segment from last station
    if (toStation.walkingTimeMinutes > 0) {
      route.push({
        type: 'walk',
        from: toStation.name,
        to: 'Destination',
        durationMinutes: toStation.walkingTimeMinutes
      });
    }

    return route;
  }

  // BFS to find path with line information
  private findPath(startId: string, endId: string): RouteSegment[] {
    const visited = new Set<string>();
    const parent = new Map<string, { stationId: string; line: string }>();
    const queue: string[] = [startId];
    visited.add(startId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current === endId) {
        break;
      }

      const neighbors = this.adjacencyList.get(current) || [];
      for (const { stationId, line } of neighbors) {
        if (!visited.has(stationId)) {
          visited.add(stationId);
          parent.set(stationId, { stationId: current, line });
          queue.push(stationId);
        }
      }
    }

    // Reconstruct path
    const path: RouteSegment[] = [];
    let current = endId;
    let currentLine: string | null = null;
    let segmentStart: string | null = null;

    const pathStations: Array<{ id: string; line: string }> = [];
    while (parent.has(current)) {
      const { stationId: prev, line } = parent.get(current)!;
      pathStations.unshift({ id: current, line });
      current = prev;
    }
    pathStations.unshift({ id: startId, line: pathStations[0]?.line || '' });

    // Group by line
    for (let i = 0; i < pathStations.length; i++) {
      const { id, line } = pathStations[i];
      const station = this.stationMap.get(id);

      if (currentLine === null) {
        currentLine = line;
        segmentStart = station?.name || id;
      } else if (line !== currentLine && i > 0) {
        // Line change - end current segment
        const prevStation = this.stationMap.get(pathStations[i - 1].id);
        path.push({
          type: this.getLineType(currentLine),
          line: currentLine,
          from: segmentStart!,
          to: prevStation?.name || pathStations[i - 1].id,
          durationMinutes: this.estimateSegmentDuration(path.length),
          color: METRO_LINE_COLORS[currentLine]
        });
        currentLine = line;
        segmentStart = station?.name || id;
      }
    }

    // Add final segment
    if (currentLine && pathStations.length > 1) {
      const lastStation = this.stationMap.get(pathStations[pathStations.length - 1].id);
      path.push({
        type: this.getLineType(currentLine),
        line: currentLine,
        from: segmentStart!,
        to: lastStation?.name || endId,
        durationMinutes: this.estimateSegmentDuration(path.length),
        color: METRO_LINE_COLORS[currentLine]
      });
    }

    return path;
  }

  private getLineType(line: string): 'metro' | 'rer' | 'transilien' | 'tramway' {
    if (line.startsWith('RER')) return 'rer';
    if (line.startsWith('T') && /^T\d/.test(line)) return 'tramway';
    if (['L', 'J', 'H', 'N', 'P', 'U'].includes(line)) {
      return 'transilien';
    }
    return 'metro';
  }

  private estimateSegmentDuration(segmentIndex: number): number {
    // Average segment duration estimate
    return 5 + segmentIndex * 2;
  }
}

// Find nearest stations to a coordinate
// Search radius extended to 1.5km for better coverage in petite couronne
export function findNearestStations(coordinates: Coordinates, count: number = 3): Station[] {
  const stationsWithDistance = stations.map(station => ({
    station,
    distance: haversineDistance(coordinates, station.coordinates)
  }));

  stationsWithDistance.sort((a, b) => a.distance - b.distance);

  return stationsWithDistance
    .slice(0, count)
    .filter(s => s.distance < 1500) // Within 1.5km (extended for petite couronne)
    .map(s => ({
      ...s.station,
      walkingTimeMinutes: Math.ceil(s.distance / 80) // ~80m per minute walking
    }));
}

// Haversine formula for distance calculation
function haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000; // Earth's radius in meters
  const lat1Rad = coord1.lat * Math.PI / 180;
  const lat2Rad = coord2.lat * Math.PI / 180;
  const deltaLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const deltaLng = (coord2.lng - coord1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

