import { useState, useEffect, useCallback } from 'react';
import { Branch } from '@/app/types/branch';
import { branchesService } from '@/app/services/branches';
import { transformBranchData } from '../utils/transformBranchData';

interface UseBranchesResult {
  branches: Branch[];
  loading: boolean;
  error: Error | null;
  retry: () => void;
}

/**
 * Maps locationId to country_id for API calls
 * @param locationId - Location ID ('saudi-arabia' or 'kuwait')
 * @returns Country ID for API (1 = Saudi Arabia, 2 = Kuwait)
 */
function mapLocationIdToCountryId(locationId: string): number {
  switch (locationId) {
    case 'saudi-arabia':
      return 1;
    case 'kuwait':
      return 2;
    default:
      return 1;
  }
}

/**
 * Custom hook to fetch and manage branch data from the API
 * @param locationId - The location ID to filter branches by
 * @returns Object containing branches array, loading state, error state, and retry function
 */
export function useBranches(locationId: string): UseBranchesResult {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Map locationId to country_id for API call
      const countryId = mapLocationIdToCountryId(locationId);
      
      // Fetch branches filtered by country_id
      const response = await branchesService.getBranches(countryId);
      
      // Transform API response to Branch format
      const transformed = response.data.map((item) => transformBranchData(item));
      
      setBranches(transformed);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch branches');
      setError(error);
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const retry = useCallback(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { branches, loading, error, retry };
}
