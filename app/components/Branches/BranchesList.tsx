'use client';

import { Branch } from '@/app/types/branch';
import BranchCard from './BranchCard';
import { useTranslations } from 'next-intl';

interface BranchesListProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  locale: 'ar' | 'en';
}

export default function BranchesList({
  branches,
  selectedBranch,
  onBranchSelect,
  locale,
}: BranchesListProps) {
  const t = useTranslations('branches');

  if (!branches || branches.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">{t('noBranchesFound')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
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
