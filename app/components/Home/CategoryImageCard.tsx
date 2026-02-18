'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Category } from '@/app/data/categories';

interface CategoryImageCardProps {
  category: Category;
  locale: string;
}

/**
 * CategoryImageCard Component
 * 
 * Performance Optimizations:
 * - Uses Next.js Image component for automatic optimization (Req 7.2)
 * - Lazy loading enabled for off-screen images (Req 7.1)
 * - Blur placeholder for smooth loading experience (Req 7.3)
 * - Proper sizes attribute for responsive image delivery (Req 7.2)
 * - WebP format images for optimal compression (Req 7.4)
 * - Loading state with spinner placeholder (Req 7.3)
 * - Error handling with fallback UI
 */
export default function CategoryImageCard({ category, locale }: CategoryImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get locale-aware title for alt text
  const altText = locale === 'ar' ? category.arabicTitle : category.title;

  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle image load error with fallback UI
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Failed to load image: ${category.imagePath} for category: ${category.id}`);
  };

  return (
    <Link
      href={`/${locale}/categories/${category.id}`}
      className="block relative w-full aspect-[4/3] rounded-[24px] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading Placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <span className="material-icons-outlined text-gray-400 text-5xl mb-2">image_not_supported</span>
            <p className="text-gray-500 text-sm">{altText}</p>
          </div>
        </div>
      )}

      {/* Category Image */}
      {!hasError && (
        <Image
          src={category.imagePath}
          alt={altText}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 40vw, 28vw"
          className="object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          quality={85}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
        />
      )}
      
      {/* Dark Overlay on Hover - controlled by state */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out pointer-events-none ${
          isHovered ? 'opacity-40' : 'opacity-0'
        }`}
      />
      
      {/* Glassmorphic Explore Badge - appears on hover */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-out ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
          <span className="text-white font-semibold text-sm tracking-wide">
            {locale === 'ar' ? 'استكشف' : 'Explore'}
          </span>
        </div>
      </div>
    </Link>
  );
}
