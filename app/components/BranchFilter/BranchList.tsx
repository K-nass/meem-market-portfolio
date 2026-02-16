'use client';

import React from 'react';
import { Branch } from '@/app/types/branch';
import { useTranslations } from 'next-intl';

interface BranchListProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onSelect: (branch: Branch) => void;
  locale: string;
  isLoading?: boolean;
}

const BranchList: React.FC<BranchListProps> = ({
  branches,
  selectedBranch,
  onSelect,
  locale,
  isLoading = false
}) => {
  const t = useTranslations('branchFilter');

  const handleKeyDown = (e: React.KeyboardEvent, branch: Branch) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(branch);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-6 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-secondary-text">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="mt-6 p-4 text-center text-secondary-text">
        {t('noBranchesAvailable')}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold text-secondary-text mb-2">
        {t('selectBranch')}
      </h3>
      <div className="space-y-1 max-h-[300px] overflow-y-auto scrollbar-hidden p-2">
        {branches.map((branch) => (
          <div
            key={branch.id}
            onClick={() => onSelect(branch)}
            onKeyDown={(e) => handleKeyDown(e, branch)}
            className={`
              w-full p-2.5 rounded-lg cursor-pointer transition-colors duration-200
              ${selectedBranch?.id === branch.id
                ? 'bg-primary/90'
                : 'hover:bg-gray-100'
              }
            `}
            role="button"
            aria-pressed={selectedBranch?.id === branch.id}
            tabIndex={0}
          >
            <div className={`font-medium text-xs ${
              selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-800'
            }`}>
              {branch.name[locale as 'en' | 'ar']}
            </div>
            {branch.address && (
              <div className={`text-[10px] mt-0.5 ${
                selectedBranch?.id === branch.id ? 'text-white/75' : 'text-gray-500'
              }`}>
                {branch.address[locale as 'en' | 'ar']}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchList;
