'use client';

import { Branch } from '@/app/types/branch';
import { Phone, Clock } from 'lucide-react';

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

  const branchName = branch.name[locale as 'en' | 'ar'];
  const cityName = branch.city[locale as 'en' | 'ar'];
  const ariaLabel = `${branchName}, ${cityName}${isSelected ? ` (${locale === 'ar' ? 'محدد' : 'selected'})` : ''}`;

  return (
    <article
      className={`
        p-4 sm:p-5 md:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
        ${
          isSelected
            ? 'border-primary bg-primary/5 shadow-md'
            : 'border-gray-200 bg-white hover:border-gray-300 shadow-md hover:shadow-lg hover:-translate-y-1'
        }
        focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={ariaLabel}
    >
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug">
        {branch.name[locale as 'en' | 'ar']}
      </h3>

      {branch.address && (
        <p className="text-sm sm:text-base text-gray-600 mb-1 leading-relaxed">
          {branch.address[locale as 'en' | 'ar']}
        </p>
      )}

      <p className="text-sm sm:text-base text-gray-600 mb-2 leading-relaxed">
        {branch.city[locale as 'en' | 'ar']}
      </p>

      {branch.phone && (
        <p className="text-sm sm:text-base text-gray-700 mb-1 flex items-center leading-relaxed">
          <Phone className="w-4 h-4 text-primary inline-block me-2 flex-shrink-0" />
          <span>{branch.phone}</span>
        </p>
      )}

      {branch.hours && (
        <p className="text-sm sm:text-base text-gray-700 flex items-center leading-relaxed">
          <Clock className="w-4 h-4 text-primary inline-block me-2 flex-shrink-0" />
          <span>{branch.hours.open} - {branch.hours.close}</span>
        </p>
      )}
    </article>
  );
}
