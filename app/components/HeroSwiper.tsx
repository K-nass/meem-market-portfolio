'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { useLocale } from 'next-intl';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import location components and data
import LocationCircle from './LocationModal/LocationCircle';
import LocationModal from './LocationModal/LocationModal';
import { locations } from '@/app/data/branches';

interface HeroSwiperProps {
  season: string;           // "موسم رمضان 2026"
  mainHeading: string;      // "كل ما تحتاجه في مكان واحد"
  subheading: string;       // "سوق ميم… وجهتك الشاملة للتسوق الذكي"
  callToAction: string;     // "اختر دولتك للوصول إلى..."
  exploreButton: string;    // Button text
  downloadButton: string;   // Button text
}

export default function HeroSwiper(props: HeroSwiperProps) {
  const {
    season,
    mainHeading,
    subheading,
    callToAction,
    exploreButton,
    downloadButton
  } = props;

  // Get current locale
  const locale = useLocale();

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  // Handle location circle click
  const handleLocationClick = (locationId: string) => {
    setSelectedLocationId(locationId);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLocationId(null);
  };

  const heroImages = [
    {
      src: '/heros/meem-hero-1.webp',
      alt: 'Meem Market hero image 1'
    },
    {
      src: '/heros/meem-hero-2.webp',
      alt: 'Meem Market hero image 2'
    },
    {
      src: '/heros/meem-hero-3.webp',
      alt: 'Meem Market hero image 3'
    }
  ] as const;

  return (
    <div className="hero-swiper-container relative">
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        navigation={false}
        keyboard={{
          enabled: true
        }}
        a11y={{
          enabled: true
        }}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px] md:h-[700px]">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hero-image-zoom"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('bg-primary-dark');
                }}
              />
              {/* Dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/60 z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between h-full">
            {/* Content area */}
            <div className="flex-1 flex items-center pointer-events-auto">
              <div className="space-y-6">
                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-white font-arabic" dir="rtl">
                  {mainHeading}
                </h1>

                {/* Subheading */}
                <h2 className="text-4xl md:text-6xl font-semibold text-white/90 font-arabic" dir="rtl">
                  {subheading}
                </h2>

                {/* Call-to-action text */}
                <p className="text-lg md:text-xl text-white/80 font-arabic max-w-2xl" dir="rtl">
                  {callToAction}
                </p>

                {/* Location Circles Container - Styled like download button */}
                <div className="pt-2">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 inline-flex gap-6 items-center transition-colors duration-200">
                    {locations.map((location) => (
                      <LocationCircle
                        key={location.id}
                        location={location}
                        onClick={handleLocationClick}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Removed bottom location circles container */}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {isModalOpen && selectedLocationId && (
        <LocationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          locationId={selectedLocationId}
          locale={locale}
        />
      )}
    </div>
  );
}
