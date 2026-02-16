'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Location, Branch } from '@/app/types/branch';
import { useResponsive } from '@/app/hooks/useResponsive';
import LocationSelector from './LocationSelector';
import BranchList from './BranchList';

interface BranchFilterSidebarProps {
  locations: Location[];
  branches: Branch[];
  className?: string;
}

const BranchFilterSidebar: React.FC<BranchFilterSidebarProps> = ({
  locations,
  branches,
  className = ''
}) => {
  const locale = useLocale();
  const t = useTranslations('branchFilter');
  const breakpoint = useResponsive();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const locationParam = searchParams.get('location');
  const branchParam = searchParams.get('branch');

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    locationParam ? locations.find(loc => loc.id === locationParam) || null : null
  );
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(
    branchParam ? branches.find(br => br.id === branchParam) || null : null
  );
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Update URL when selection changes
  const updateURL = (locationId: string | null, branchId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (locationId) {
      params.set('location', locationId);
    } else {
      params.delete('location');
    }
    
    if (branchId) {
      params.set('branch', branchId);
    } else {
      params.delete('branch');
    }
    
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname, { scroll: false });
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSelectedBranch(null);
    updateURL(location.id, null);
  };

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    updateURL(selectedLocation?.id || null, branch.id);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const filteredBranches = useMemo(() => {
    if (!selectedLocation) return [];
    return branches.filter(branch => branch.locationId === selectedLocation.id);
  }, [selectedLocation, branches]);

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const isDesktop = breakpoint === 'desktop';
  const isTablet = breakpoint === 'tablet';
  const isMobile = breakpoint === 'mobile';

  const sidebarClasses = `
    bg-pattern border-gray-200 transition-transform duration-300 ease-in-out shadow-lg
    ${isDesktop ? 'sticky top-0 rounded-2xl' : ''}
    ${isTablet ? `fixed left-0 top-[80px] h-[calc(100vh-80px)] w-80 border-r ${!isOpen ? '-translate-x-full' : ''}` : ''}
    ${isMobile ? `fixed bottom-0 left-0 right-0 rounded-t-3xl max-h-[70vh] border-t ${!isOpen ? 'translate-y-full' : ''}` : ''}
    ${className}
  `;

  return (
    <>
      {/* Backdrop for mobile/tablet */}
      {(isMobile || isTablet) && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${sidebarClasses} ${(isMobile || isTablet) && isOpen ? 'z-50' : 'z-30'} overflow-y-auto scrollbar-hidden bg-white max-h-[calc(100vh-100px)]`} 
        dir={direction}
        role="complementary"
        aria-label={t('title')}
      >
        <div className="p-4">
          {/* Close button for mobile/tablet */}
          {(isMobile || isTablet) && (
            <button
              onClick={toggleSidebar}
              className="absolute top-3 right-3 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label={t('closeFilters')}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <h2 className="text-base font-bold text-gray-800 mb-4">
            {t('title')}
          </h2>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-secondary-text mb-2" id="location-selector-label">
              {t('selectLocation')}
            </h3>
            <div role="radiogroup" aria-labelledby="location-selector-label">
              <LocationSelector
                locations={locations}
                selectedLocation={selectedLocation}
                onSelect={handleLocationSelect}
                locale={locale}
              />
            </div>
          </div>

          {selectedLocation ? (
            <div role="region" aria-live="polite" aria-atomic="true">
              <BranchList
                branches={filteredBranches}
                selectedBranch={selectedBranch}
                onSelect={handleBranchSelect}
                locale={locale}
              />
            </div>
          ) : (
            <div className="mt-4 p-3 text-center text-secondary-text text-xs" role="status">
              {t('noLocationSelected')}
            </div>
          )}
        </div>
      </div>

      {/* Toggle button for mobile/tablet when closed */}
      {(isMobile || isTablet) && !isOpen && (
        <button
          onClick={toggleSidebar}
          className={`
            fixed z-40 bg-primary text-white rounded-full p-4 shadow-lg
            transition-all duration-300 hover:bg-primary-dark
            ${isMobile ? 'bottom-6 right-6' : 'left-6 top-24'}
          `}
          aria-label={t('openFilters')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      )}
    </>
  );
};

export default BranchFilterSidebar;
