'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CategoryCard from './CategoryCard';
import type { Category } from '@/app/data/categories';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface FeaturedCategoriesSwiperProps {
  categories: Category[];
  shopNowLabel: string;
  locale: string;
}

export default function FeaturedCategoriesSwiper({
  categories,
  shopNowLabel,
  locale
}: FeaturedCategoriesSwiperProps) {
  // Validate locale parameter against supported locales
  const validLocales = ['en', 'ar'];
  const validatedLocale = locale && validLocales.includes(locale) ? locale : 'en';
  const isRTL = validatedLocale === 'ar';
  
  // Filter out invalid categories before rendering
  const validCategories = categories.filter(cat => 
    cat?.id && 
    cat?.title && 
    cat?.arabicTitle && 
    cat?.imagePath
  );
  
  // Don't render if no valid categories
  if (validCategories.length === 0) {
    return null;
  }

  return (
    <div className="md:col-span-2 md:row-span-2 rounded-[24px] overflow-hidden shadow-xl featured-swiper-container group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        speed={600}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: false
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        keyboard={{
          enabled: true
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous category',
          nextSlideMessage: 'Next category',
          paginationBulletMessage: 'Go to category {{index}}'
        }}
        className="h-full"
      >
        {validCategories.map((category) => (
          <SwiperSlide key={category.id} className="h-full">
            <div className="h-full">
              <CategoryCard
                variant="large"
                title={category?.title}
                arabicTitle={category?.arabicTitle}
                description={category?.description}
                image={category?.imagePath}
                badge={category?.badge}
                shopNowLabel={shopNowLabel}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30 opacity-0 group-hover:opacity-100"
        aria-label="Previous category"
      >
        <span className="material-icons-outlined">
          {isRTL ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>
      <button
        className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30 opacity-0 group-hover:opacity-100"
        aria-label="Next category"
      >
        <span className="material-icons-outlined">
          {isRTL ? 'chevron_left' : 'chevron_right'}
        </span>
      </button>
    </div>
  );
}
