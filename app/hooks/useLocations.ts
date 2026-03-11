import { useState, useEffect, useCallback } from 'react';
import { Location } from '@/app/types/branch';
import { locationsService } from '@/app/services/locations';
import { transformLocationData } from '@/app/utils/transformLocationData';

interface UseLocationsResult {
  locations: Location[];
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

/**
 * Custom hook to fetch and manage locations (countries) data from the API
 * @returns Object containing locations array, loading state, error state, and retry function
 */
export function useLocations(): UseLocationsResult {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch locations from API
      const response = await locationsService.getLocations();
      
      // Transform API response to Location format
      const transformed = response.data.map((item) => transformLocationData(item));
      
      setLocations(transformed);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch locations');
      setError(error);
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const retry = useCallback(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { locations, loading, error, retry };
}
