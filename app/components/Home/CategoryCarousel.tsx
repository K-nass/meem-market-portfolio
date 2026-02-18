'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, A11y } from 'swiper/modules';
import CategoryImageCard from './CategoryImageCard';
import type { Category } from '@/app/data/categories';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface CategoryCarouselProps {
  categories: Category[];
  locale: string;
}

export default function CategoryCarousel({
  categories,
  locale
}: CategoryCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  // Validate locale parameter against supported locales
  const validLocales = ['en', 'ar'];
  const validatedLocale = validLocales.includes(locale) ? locale : 'en';
  
  if (!validLocales.includes(locale)) {
    console.warn(`Invalid locale: ${locale}, defaulting to 'en'`);
  }
  
  const isRTL = validatedLocale === 'ar';
  
  // Filter out invalid categories before rendering
  const validCategories = categories.filter(cat => 
    cat?.id && 
    cat?.title && 
    cat?.arabicTitle && 
    cat?.imagePath
  );

  // Preload adjacent slide images for instant navigation (Req 7.4)
  // Uses high-priority preload for next/previous slides to ensure instant navigation
  useEffect(() => {
    if (!swiperInstance) return;

    const preloadedLinks = new Set<string>();

    const preloadAdjacentImages = () => {
      const activeIndex = swiperInstance.realIndex;
      const totalSlides = validCategories.length;
      
      // Calculate next and previous indices (with loop wrapping)
      const nextIndex = (activeIndex + 1) % totalSlides;
      const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
      
      // Preload next and previous images with high priority
      [nextIndex, prevIndex].forEach(index => {
        const category = validCategories[index];
        if (category?.imagePath && !preloadedLinks.has(category.imagePath)) {
          // Use proper preload with high priority for adjacent slides
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = category.imagePath;
          link.fetchPriority = 'high';
          document.head.appendChild(link);
          preloadedLinks.add(category.imagePath);
        }
      });
    };

    // Preload on slide change
    swiperInstance.on('slideChange', preloadAdjacentImages);
    
    // Initial preload
    preloadAdjacentImages();

    return () => {
      swiperInstance.off('slideChange', preloadAdjacentImages);
    };
  }, [swiperInstance, validCategories]);

  // Don't render if no valid categories
  if (validCategories.length === 0) {
    console.warn('No valid categories to display');
    return null;
  }

  return (
    <div className="relative category-carousel-container group">
      <Swiper
        modules={[Autoplay, Navigation, A11y]}
        spaceBetween={32}
        slidesPerView={3}
        breakpoints={{
          320: { 
            slidesPerView: 1, 
            spaceBetween: 20 
          },
          768: { 
            slidesPerView: 2, 
            spaceBetween: 28 
          },
          1024: { 
            slidesPerView: 3, 
            spaceBetween: 32 
          }
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        loop={true}
        speed={600}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          nextEl: '.category-carousel-button-next',
          prevEl: '.category-carousel-button-prev'
        }}
        keyboard={{
          enabled: true
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous category',
          nextSlideMessage: 'Next category'
        }}
        onSwiper={setSwiperInstance}
        className="category-carousel"
      >
        {validCategories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryImageCard
              category={category}
              locale={validatedLocale}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="category-carousel-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white/30 transition-all duration-300 border border-white/30 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Previous category"
      >
        <span className="material-icons-outlined text-2xl">
          {isRTL ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>
      <button
        className="category-carousel-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white/30 transition-all duration-300 border border-white/30 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Next category"
      >
        <span className="material-icons-outlined text-2xl">
          {isRTL ? 'chevron_left' : 'chevron_right'}
        </span>
      </button>
    </div>
  );
}
