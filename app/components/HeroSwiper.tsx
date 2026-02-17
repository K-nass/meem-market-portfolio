'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
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
        pagination={{
          clickable: true,
          dynamicBullets: false
        }}
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
          <div className="flex items-center justify-between h-full">
            {/* Content area */}
            <div className="flex-1 pointer-events-auto">
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                    {exploreButton}
                  </button>
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors duration-200 backdrop-blur-sm">
                    {downloadButton}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
