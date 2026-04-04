'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CountryItem } from '@/app/types/locations';
import { CategoryItem } from '@/app/types/category';

interface LocationFilterProps {
  locationLabel: string;
  branchLabel: string;
  categoryLabel: string;
  locations: CountryItem[];
  categories: CategoryItem[];
  initialLocationSlug?: string;
  initialBranchSlug?: string;
  initialCategorySlug?: string;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder: string;
}

function FilterDropdown({ value, options, onChange, placeholder }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-48 items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.08)] outline-none transition-[border-color,box-shadow,background-color] hover:border-slate-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="truncate text-start">{selectedOption?.label || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]">
          <ul id={listboxId} role="listbox" className="max-h-64 overflow-y-auto py-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value || '__all'} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate text-start">{option.label}</span>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path
                          d="M5 12L10 17L19 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function LocationFilter({
  locationLabel,
  branchLabel,
  categoryLabel,
  locations,
  categories,
  initialLocationSlug,
  initialBranchSlug,
  initialCategorySlug,
}: LocationFilterProps) {
  const router = useRouter();
  const isEnglish = locationLabel === 'Location';

  const [selectedCountrySlug, setSelectedCountrySlug] = useState(
    initialLocationSlug || locations[0]?.slug || ''
  );
  const [selectedBranchSlug, setSelectedBranchSlug] = useState(initialBranchSlug || '');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(initialCategorySlug || '');

  const currentBranches =
    locations.find((location) => location.slug === selectedCountrySlug)?.branches || [];

  const locationOptions = locations.map((location) => ({
    value: location.slug,
    label: location.name_ar,
  }));

  const branchOptions = [
    { value: '', label: isEnglish ? 'All Branches' : 'جميع الفروع' },
    ...currentBranches.map((branch) => ({
      value: branch.slug,
      label: branch.name_ar,
    })),
  ];

  const categoryOptions = [
    { value: '', label: isEnglish ? 'All Categories' : 'جميع التصنيفات' },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.title,
    })),
  ];

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCountrySlug) params.set('location', selectedCountrySlug);
    if (selectedBranchSlug) params.set('branch', selectedBranchSlug);
    if (selectedCategorySlug) params.set('category', selectedCategorySlug);

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
      <div className="flex flex-col border-l border-slate-200 px-3">
        <span className="text-[10px] font-bold uppercase text-slate-400">{locationLabel}</span>
        <FilterDropdown
          value={selectedCountrySlug}
          onChange={(value) => {
            setSelectedCountrySlug(value);
            setSelectedBranchSlug('');
          }}
          options={locationOptions}
          placeholder={locationLabel}
        />
      </div>

      <div className="flex flex-col border-x border-slate-200 px-4">
        <span className="text-[10px] font-bold uppercase text-slate-400">{branchLabel}</span>
        <FilterDropdown
          value={selectedBranchSlug}
          onChange={setSelectedBranchSlug}
          options={branchOptions}
          placeholder={branchLabel}
        />
      </div>

      <div className="flex flex-col px-4">
        <span className="text-[10px] font-bold uppercase text-slate-400">{categoryLabel}</span>
        <FilterDropdown
          value={selectedCategorySlug}
          onChange={setSelectedCategorySlug}
          options={categoryOptions}
          placeholder={categoryLabel}
        />
      </div>

      <button
        onClick={handleApplyFilters}
        className="flex justify-center rounded-lg bg-primary p-2 text-white shadow-md transition-colors hover:bg-primary-dark"
      >
        <span className="material-symbols-outlined">sync</span>
      </button>
    </div>
  );
}
