'use client';

import { useState, useMemo } from 'react';
import { Branch } from '@/app/types/branch';
import { FilterOption } from './BranchesFilterTabs';
import BranchesFilterTabs from './BranchesFilterTabs';
import BranchesMapWrapper from './BranchesMapWrapper';
import BranchesList from './BranchesList';
import { useTranslations } from 'next-intl';

interface BranchesContentProps {
  branches: Branch[];
  locale: 'ar' | 'en';
}

export default function BranchesContent({ branches, locale }: BranchesContentProps) {
  const t = useTranslations('branches');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Filter branches based on active filter
  const filteredBranches = useMemo(() => {
    if (activeFilter === 'all') {
      return branches;
    }
    return branches.filter(branch => branch.locationId === activeFilter);
  }, [branches, activeFilter]);

  // Prepare labels for filter tabs
  const filterLabels = {
    all: t('filterAll'),
    kuwait: t('filterKuwait'),
    saudiArabia: t('filterSaudiArabia'),
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter Tabs */}
      <BranchesFilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        labels={filterLabels}
      />

      {/* Content Grid - Map and List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Map */}
        <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg min-h-[400px] sm:min-h-[500px]">
          <BranchesMapWrapper
            branches={filteredBranches}
            selectedBranch={selectedBranch}
            onBranchSelect={setSelectedBranch}
            locale={locale}
          />
        </div>

        {/* Branch List */}
        <div className="order-1 lg:order-2 rounded-xl bg-white p-4 sm:p-5 md:p-6 shadow-lg">
          <BranchesList
            branches={filteredBranches}
            selectedBranch={selectedBranch}
            onBranchSelect={setSelectedBranch}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
