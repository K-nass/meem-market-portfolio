'use client';

import dynamic from 'next/dynamic';
import { Branch } from '@/app/types/branch';

interface BranchesMapWrapperProps {
  branches: Branch[];
  selectedBranch?: Branch | null;
  onBranchSelect?: (branch: Branch) => void;
  locale: 'ar' | 'en';
}

// Dynamically import the map component with SSR disabled
const BranchesMap = dynamic(() => import('./BranchesMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

export default function BranchesMapWrapper(props: BranchesMapWrapperProps) {
  return <BranchesMap {...props} />;
}
