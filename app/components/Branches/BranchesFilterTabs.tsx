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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div
        role="tablist"
        aria-label="Branch location filters"
        className="flex flex-wrap gap-2 sm:gap-4 justify-center"
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
                px-6 py-3 rounded-lg font-medium text-sm sm:text-base
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
