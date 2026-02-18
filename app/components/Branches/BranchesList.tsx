'use client';

import { Branch } from '@/app/types/branch';
import BranchCard from './BranchCard';
import BranchCardSkeleton from './BranchCardSkeleton';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

interface BranchesListProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  locale: 'ar' | 'en';
  isLoading?: boolean;
}

export default function BranchesList({
  branches,
  selectedBranch,
  onBranchSelect,
  locale,
  isLoading = false,
}: BranchesListProps) {
  const t = useTranslations('branches');

  // Loading state - display skeleton screens
  if (isLoading) {
    return (
      <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[500px] sm:max-h-[600px] pe-2 custom-scrollbar">
        {Array.from({ length: 3 }).map((_, index) => (
          <BranchCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!branches || branches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 sm:p-10 md:p-12 min-h-[300px]">
        <MapPin className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400 mb-3 sm:mb-4" />
        <p className="text-gray-700 text-base sm:text-lg font-medium mb-2 text-center px-4">
          {t('noBranchesFound')}
        </p>
        <p className="text-gray-500 text-sm sm:text-base text-center max-w-sm px-4">
          {t('tryDifferentFilter')}
        </p>
      </div>
    );
  }

  // Render branch cards
  return (
    <div className="space-y-3 sm:space-y-4 overflow-y-auto max-h-[500px] sm:max-h-[600px] pe-2 custom-scrollbar">
      {branches.map((branch) => (
        <BranchCard
          key={branch.id}
          branch={branch}
          isSelected={selectedBranch?.id === branch.id}
          onClick={() => onBranchSelect(branch)}
          locale={locale}
        />
      ))}
    </div>
  );
}
