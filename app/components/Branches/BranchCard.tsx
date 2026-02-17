'use client';

import { Branch } from '@/app/types/branch';

interface BranchCardProps {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
  locale: string;
}

export default function BranchCard({
  branch,
  isSelected,
  onClick,
  locale,
}: BranchCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={`
        p-4 rounded-lg border-2 transition-all cursor-pointer
        ${
          isSelected
            ? 'border-green-600 bg-green-50'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {branch.name[locale as 'en' | 'ar']}
      </h3>

      {branch.address && (
        <p className="text-sm text-gray-600 mb-1">
          {branch.address[locale as 'en' | 'ar']}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-2">
        {branch.city[locale as 'en' | 'ar']}
      </p>

      {branch.phone && (
        <p className="text-sm text-gray-700 mb-1">
          <span className="font-medium">📞 </span>
          {branch.phone}
        </p>
      )}

      {branch.hours && (
        <p className="text-sm text-gray-700">
          <span className="font-medium">🕒 </span>
          {branch.hours.open} - {branch.hours.close}
        </p>
      )}
    </article>
  );
}
