'use client';

import { Location } from '@/app/types/branch';
import Image from 'next/image';

interface LocationCircleProps {
  location: Location;
  onClick: (locationId: string) => void;
  locale: string;
}

export default function LocationCircle({ location, onClick, locale }: LocationCircleProps) {
  const handleClick = () => {
    onClick(location.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(location.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="location-circle group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 overflow-hidden"
      aria-label={`Select ${location.name[locale as 'en' | 'ar']}`}
      type="button"
      title={location.name[locale as 'en' | 'ar']}
    >
      {/* Flag image */}
      <div className="relative w-full h-full">
        <Image
          src={location.flag || ''}
          alt={location.name[locale as 'en' | 'ar']}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, 56px"
        />
      </div>
    </button>
  );
}
