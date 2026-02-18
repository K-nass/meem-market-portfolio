'use client';

import dynamic from 'next/dynamic';
import { Branch } from '@/app/types/branch';
import MapLoadingSkeleton from './MapLoadingSkeleton';

interface BranchesMapWrapperProps {
  branches: Branch[];
  selectedBranch?: Branch | null;
  onBranchSelect?: (branch: Branch) => void;
  locale: 'ar' | 'en';
}

// Dynamically import the map component with SSR disabled
const BranchesMap = dynamic(() => import('./BranchesMap'), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />
});

export default function BranchesMapWrapper(props: BranchesMapWrapperProps) {
  return <BranchesMap {...props} />;
}
