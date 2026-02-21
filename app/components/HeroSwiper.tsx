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

  const heroSlides = [
    {
      src: '/heros/meem-hero-1.webp',
      video: '/hero-bg-ramadan-1.mp4',
      alt: 'Meem Market hero image 1'
    },
    {
      src: '/heros/meem-hero-2.webp',
      video: '/hero-bg-ramadan-2.mp4',
      alt: 'Meem Market hero image 2'
    },
    {
      src: '/heros/meem-hero-3.webp',
      video: '/hero-bg-ramadan-1.mp4',
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
          delay: 8000, // Increased delay to enjoy the video motion
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
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
              {/* Static Background Image (Visible on mobile or if video fails/reduced motion active) */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover hero-image-zoom motion-reduce:block"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('bg-primary-dark');
                }}
              />

              {/* Background Video layer (Visible only on desktop and follows motion preferences) */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={slide.src}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 hidden md:motion-safe:block"
              >
                <source src={slide.video} type="video/mp4" />
              </video>

              {/* Dark overlay for better text contrast - z-10 ensures it's above video but below content */}
              <div className="absolute inset-0 bg-black/60 z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col justify-end h-full pb-12 md:pb-24 ${locale === 'ar' ? 'items-start' : 'items-end'}`}>
            {/* Content area - Positioned Bottom Right visually */}
            <div className={`pointer-events-auto text-right flex flex-col ${locale === 'ar' ? 'items-start' : 'items-end'}`}>
              <div className={`space-y-6 flex flex-col ${locale === 'ar' ? 'items-start' : 'items-end'}`}>
                {/* Call-to-action text */}
                <p className="text-lg md:text-xl text-white/80 font-arabic max-w-2xl px-4" dir="rtl">
                  {callToAction}
                </p>

                {/* Location Circles Container - Styled like download button */}
                <div className="pt-2">
                  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 inline-flex gap-6 items-center transition-all duration-300">
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
