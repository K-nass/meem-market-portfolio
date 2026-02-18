'use client';

export type FilterOption = 'all' | 'kuwait' | 'saudi-arabia';

interface BranchesFilterTabsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  labels: {
    all: string;
    kuwait: string;
    saudiArabia: string;
  };
}

export default function BranchesFilterTabs({
  activeFilter,
  onFilterChange,
  labels,
}: BranchesFilterTabsProps) {
  const tabs: { id: FilterOption; label: string }[] = [
    { id: 'all', label: labels.all },
    { id: 'kuwait', label: labels.kuwait },
    { id: 'saudi-arabia', label: labels.saudiArabia },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, filter: FilterOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFilterChange(filter);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div
        role="tablist"
        aria-label="Branch location filters"
        className="flex flex-wrap gap-2 sm:gap-3 justify-center"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeFilter;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`branches-panel-${tab.id}`}
              tabIndex={0}
              onClick={() => onFilterChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              className={`
                px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-lg font-semibold text-sm sm:text-base
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                min-h-[44px] min-w-[100px] sm:min-w-[120px]
                ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:scale-[1.02] hover:shadow-md'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
