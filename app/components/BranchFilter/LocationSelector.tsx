'use client';

import React from 'react';
import { Location } from '@/app/types/branch';

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: Location | null;
  onSelect: (location: Location) => void;
  locale: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  selectedLocation,
  onSelect,
  locale
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, location: Location) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(location);
    }
  };

  const getFlagImage = (code: string) => {
    const flagImages: Record<string, string> = {
      'SA': 'sa.png',
      'KW': 'kw.png'
    };
    return flagImages[code] || '';
  };

  return (
    <div className="flex gap-3 justify-center">
      {locations.map((location) => (
        <div key={location.id} className="flex flex-col items-center gap-1">
          <button
            onClick={() => onSelect(location)}
            onKeyDown={(e) => handleKeyDown(e, location)}
            className={`
              w-16 h-16 rounded-full border-2 transition-all duration-200
              flex items-center justify-center relative overflow-hidden
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${selectedLocation?.id === location.id
                ? 'border-primary'
                : 'border-gray-200 hover:border-gold'
              }
            `}
            aria-pressed={selectedLocation?.id === location.id}
            aria-label={location.name[locale as 'en' | 'ar']}
            tabIndex={0}
          >
            {/* Background flag image */}
            <div 
              className="absolute inset-0 bg-cover bg-right opacity-80"
              style={{ 
                backgroundImage: `url(${getFlagImage(location.code)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Flag emoji */}
            {/* <span className="text-3xl relative z-10">{location.flag}</span> */}
          </button>
          
          {/* Location name below circle */}
          <span className={`text-[10px] font-medium text-center ${
            selectedLocation?.id === location.id ? 'text-primary' : 'text-gray-600'
          }`}>
            {location.name[locale as 'en' | 'ar']}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LocationSelector;
