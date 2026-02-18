'use client';

import { Branch } from '@/app/types/branch';
import { useTranslations } from 'next-intl';

interface BranchSelectionStepProps {
  branches: Branch[];
  onBranchSelect: (branch: Branch) => void;
  locale: string;
}

export default function BranchSelectionStep({
  branches,
  onBranchSelect,
  locale,
}: BranchSelectionStepProps) {
  const t = useTranslations('modal');

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, branch: Branch) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBranchSelect(branch);
    }
  };

  return (
    <div className="branch-selection">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('selectBranch')}
      </h2>

      <div className="branch-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => onBranchSelect(branch)}
            onKeyDown={(e) => handleKeyDown(e, branch)}
            className="branch-card group relative p-6 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-blue-500 hover:scale-[1.02] transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={t('selectBranchAria', { branch: branch.name[locale as 'en' | 'ar'] })}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {branch.name[locale as 'en' | 'ar']}
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {branch.city[locale as 'en' | 'ar']}
              </p>
              <div className="flex items-center justify-end text-blue-500 group-hover:translate-x-1 transition-transform">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
