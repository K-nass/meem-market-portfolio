'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CountryItem } from '@/app/types/locations';
import { CategoryItem } from '@/app/types/category';


interface LocationFilterProps {
  locationLabel: string;
  branchLabel: string;
  categoryLabel: string;
  locations: CountryItem[];
  categories: CategoryItem[];
}


export default function LocationFilter({
  locationLabel,
  branchLabel,
  categoryLabel,
  locations,
  categories,
}: LocationFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCountrySlug, setSelectedCountrySlug] = useState('');
  const [selectedBranchSlug, setSelectedBranchSlug] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');


  // Get current branches for the selected country
  const currentBranches = locations.find(l => l.slug === selectedCountrySlug)?.branches || [];


  // Initialize from URL params on mount
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const branchParam = searchParams.get('branch');
    const categoryParam = searchParams.get('category');

    if (locationParam) {
      setSelectedCountrySlug(locationParam);
    } else if (locations.length > 0) {
      setSelectedCountrySlug(locations[0].slug);
    }

    if (branchParam) {
      setSelectedBranchSlug(branchParam);
    }

    if (categoryParam) {
      setSelectedCategorySlug(categoryParam);
    }
  }, [searchParams, locations]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCountrySlug) params.set('location', selectedCountrySlug);
    if (selectedBranchSlug) params.set('branch', selectedBranchSlug);
    if (selectedCategorySlug) params.set('category', selectedCategorySlug);
    router.push(`?${params.toString()}`);
  };



  return (
    <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm">

      <div className="flex flex-col px-3 border-l border-slate-200">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {locationLabel}
        </span>
        <select
          value={selectedCountrySlug}
          onChange={(e) => {
            setSelectedCountrySlug(e.target.value);
            setSelectedBranchSlug(''); // Reset branch when country changes
          }}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          {locations.map((location) => (
            <option key={location.id} value={location.slug}>
              {location.name_ar}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col px-4 border-x border-slate-200">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {branchLabel}
        </span>
        <select
          value={selectedBranchSlug}
          onChange={(e) => setSelectedBranchSlug(e.target.value)}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          <option value="">{locationLabel === 'Location' ? 'All Branches' : 'جميع الفروع'}</option>
          {currentBranches.map((branch) => (
            <option key={branch.id} value={branch.slug}>
              {branch.name_ar}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col px-4">
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {categoryLabel}
        </span>
        <select
          value={selectedCategorySlug}
          onChange={(e) => setSelectedCategorySlug(e.target.value)}
          className="bg-transparent border-none p-0 text-sm font-bold text-primary focus:ring-0 cursor-pointer"
        >
          <option value="">{locationLabel === 'Location' ? 'All Categories' : 'جميع التصنيفات'}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </div>


      <button
        onClick={handleApplyFilters}
        className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors shadow-md flex justify-center"
      >
        <span className="material-symbols-outlined">sync</span>
      </button>
    </div>
  );
}
