/**
 * Leaflet Map Configuration
 * Contains tile layer and attribution settings for the interactive map
 */

export const MAP_CONFIG = {
  // OpenStreetMap tile layer URL
  tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  
  // Attribution text (required by OpenStreetMap)
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  
  // Default map settings
  defaultZoom: 10,
  minZoom: 3,
  maxZoom: 18,
  
  // Default center (Kuwait City)
  defaultCenter: {
    lat: 29.3759,
    lng: 47.9774,
  } as const,
} as const;

/**
 * Calculate the center point from an array of coordinates
 */
export function calculateMapCenter(coordinates: Array<{ lat: number; lng: number }>) {
  if (coordinates.length === 0) {
    return MAP_CONFIG.defaultCenter;
  }
  
  const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
  const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
  
  return { lat: avgLat, lng: avgLng };
}

/**
 * Calculate map bounds from an array of coordinates
 */
export function calculateMapBounds(coordinates: Array<{ lat: number; lng: number }>) {
  if (coordinates.length === 0) {
    return null;
  }
  
  const lats = coordinates.map(coord => coord.lat);
  const lngs = coordinates.map(coord => coord.lng);
  
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ] as [[number, number], [number, number]];
}
