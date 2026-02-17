# Implementation Plan: Featured Categories Swiper

## Overview

This implementation plan transforms the homepage featured categories section by creating a centralized category data structure, building a new swiper component for featured categories, and integrating it into the existing bento grid layout. The implementation reuses the existing CategoryCard component and Swiper.js library (already used in HeroSwiper) to maintain consistency.

## Tasks

- [-] 1. Create centralized category data structure
  - Create `app/data/categories.ts` file with Category interface
  - Define all 17 categories with proper image paths, titles, and metadata
  - Implement `getFeaturedCategories()` helper function
  - Implement `getCategoryById()` helper function
  - Mark 3-4 categories as featured with `isFeatured: true` flag
  - _Requirements: 6.1, 6.3, 6.4, 6.5, 1.2, 1.3_

- [ ] 1.1 Write property test for category data structure
  - **Property 10: Category Data Structure Validity**
  - **Validates: Requirements 6.1, 6.4**

- [ ] 1.2 Write property test for image path format
  - **Property 1: Image Path Validity**
  - **Validates: Requirements 1.1, 1.2, 4.4**

- [ ] 1.3 Write property test for featured category filtering
  - **Property 12: Featured Category Filtering**
  - **Validates: Requirements 6.5**

- [ ] 1.4 Write unit test for all 17 categories included
  - Test that categories array has exactly 17 items
  - Test that all image paths reference webp files
  - _Requirements: 1.3_

- [ ] 2. Build FeaturedCategoriesSwiper component
  - [x] 2.1 Create `app/components/Home/FeaturedCategoriesSwiper.tsx` file
    - Set up 'use client' directive for client component
    - Import Swiper, SwiperSlide from 'swiper/react'
    - Import Autoplay, Pagination, Navigation modules
    - Import CategoryCard component
    - Import Swiper CSS files
    - _Requirements: 2.1, 2.2_

  - [x] 2.2 Implement component interface and props
    - Define FeaturedCategoriesSwiperProps interface (categories, shopNowLabel, locale)
    - Implement isRTL locale detection logic
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

  - [x] 2.3 Configure Swiper with proper settings
    - Set up modules: [Autoplay, Pagination, Navigation]
    - Configure autoplay: delay 4000ms, pauseOnMouseEnter true
    - Configure pagination: clickable true
    - Configure navigation with custom selectors
    - Set dir attribute based on isRTL
    - Enable keyboard navigation
    - Configure a11y with proper messages
    - _Requirements: 2.3, 2.4, 2.6, 4.1, 4.5, 4.7_

  - [x] 2.4 Render swiper slides with CategoryCard components
    - Map over categories array to create SwiperSlide elements
    - Pass category data as props to CategoryCard (variant="large")
    - Ensure proper key prop using category.id
    - _Requirements: 2.5, 8.1, 8.2_

  - [x] 2.5 Add custom navigation buttons
    - Create prev/next buttons with custom classes
    - Position buttons absolutely with proper z-index
    - Apply RTL-aware chevron icons (swap for Arabic)
    - Add hover effects and accessibility labels
    - Style with backdrop-blur and opacity transitions
    - _Requirements: 2.3, 5.5_

  - [x] 2.6 Apply grid positioning and styling
    - Add md:col-span-2 md:row-span-2 classes to container
    - Add rounded-[24px] and overflow-hidden
    - Add shadow-xl for elevation
    - Add group class for hover effects
    - _Requirements: 2.2, 3.2, 3.6_

- [ ] 2.7 Write property test for swiper slide content
  - **Property 5: Swiper Slide Content**
  - **Validates: Requirements 2.5, 8.1**

- [ ] 2.8 Write property test for navigation controls presence
  - **Property 3: Swiper Navigation Controls Presence**
  - **Validates: Requirements 2.3**

- [ ] 2.9 Write property test for RTL direction support
  - **Property 9: RTL Direction Support**
  - **Validates: Requirements 5.3, 5.5**

- [ ] 2.10 Write unit tests for swiper configuration
  - Test autoplay delay is set to 4000ms
  - Test pauseOnMouseEnter is enabled
  - Test pagination is clickable
  - Test keyboard navigation is enabled
  - Test a11y is enabled with proper messages
  - _Requirements: 2.4, 2.6, 4.1, 4.5, 4.7_

- [x] 3. Checkpoint - Ensure swiper component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Update homepage to integrate swiper and local images
  - [x] 4.1 Update imports in `app/[locale]/page.tsx`
    - Import getFeaturedCategories and categories from data file
    - Import FeaturedCategoriesSwiper component
    - Keep existing CategoryCard import
    - _Requirements: 6.2_

  - [x] 4.2 Fetch category data in page component
    - Call getFeaturedCategories() to get featured categories
    - Use categories.find() to get specific categories for static cards
    - Get categories by ID: 'plastic-hardware', 'household-items', 'gifts-collectibles', 'vegetables-fruits'
    - Extract locale from params
    - _Requirements: 6.2, 6.5_

  - [x] 4.3 Replace large card with FeaturedCategoriesSwiper
    - Remove the hardcoded CategoryCard with variant="large"
    - Add FeaturedCategoriesSwiper component in same grid position
    - Pass featuredCategories, shopNowLabel (from t()), and locale as props
    - _Requirements: 2.1, 2.2, 3.3_

  - [x] 4.4 Update static category cards to use local images
    - Update tall card to use tallCategory data
    - Update wide card to use wideCategory data
    - Update small card to use smallCategory data
    - Update recipe card to use recipeCategory data
    - Replace all image URLs with imagePath from category data
    - Pass all relevant props (title, arabicTitle, badge, discount, icon, description)
    - _Requirements: 1.1, 3.4, 8.2_

  - [x] 4.5 Preserve existing grid layout and styling
    - Verify grid classes: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
    - Verify gap-6 spacing
    - Verify auto-rows-[280px]
    - Keep charity box unchanged
    - _Requirements: 3.1, 3.2, 3.5_

- [ ] 4.6 Write property test for locale-based title display
  - **Property 8: Locale-Based Title Display**
  - **Validates: Requirements 5.1, 5.2**

- [ ] 4.7 Write property test for props mapping consistency
  - **Property 13: Props Mapping Consistency**
  - **Validates: Requirements 8.2**

- [ ] 4.8 Write unit tests for page integration
  - Test FeaturedCategoriesSwiper renders on homepage
  - Test static cards render with correct variants
  - Test grid layout classes are preserved
  - Test all category data is passed correctly
  - _Requirements: 2.1, 3.1, 3.4, 3.5_

- [ ] 5. Add error handling and fallbacks
  - [x] 5.1 Add image error handling to CategoryCard
    - Verify existing onError handler in CategoryCard component
    - If missing, add onError handler to hide broken images
    - Add fallback background color on error
    - _Requirements: 1.4_

  - [x] 5.2 Add validation for category data
    - Add optional chaining when accessing category properties in page.tsx
    - Filter out invalid categories before passing to swiper
    - Provide fallback if no featured categories exist
    - _Requirements: 6.1_

  - [x] 5.3 Add locale validation
    - Validate locale parameter against ['en', 'ar']
    - Default to 'en' if locale is invalid or missing
    - _Requirements: 5.1, 5.2_

- [ ] 5.4 Write property test for image load error handling
  - **Property 2: Image Load Error Handling**
  - **Validates: Requirements 1.4**

- [ ] 5.5 Write unit tests for error scenarios
  - Test empty featured categories array handling
  - Test invalid locale defaults to English
  - Test missing optional category fields don't break rendering
  - Test image load failure triggers fallback
  - _Requirements: 1.4, 5.1, 5.2, 6.1_

- [ ] 6. Add CSS styling and animations
  - [x] 6.1 Add custom styles for swiper in globals.css or component
    - Style pagination dots to match design system
    - Add hover effects for navigation buttons
    - Ensure smooth transitions (600ms speed)
    - Add group-hover effects for navigation visibility
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 6.2 Verify border radius consistency
    - Check all cards have rounded-[24px] class
    - Check swiper container has rounded-[24px] class
    - _Requirements: 3.6_

- [ ] 6.3 Write property test for border radius consistency
  - **Property 6: Border Radius Consistency**
  - **Validates: Requirements 3.6**

- [ ] 6.4 Write property test for accessibility attributes
  - **Property 7: Accessibility Attributes**
  - **Validates: Requirements 4.5**

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties across all category data
- Unit tests validate specific examples, edge cases, and integration points
- The existing CategoryCard component is reused without modification
- Swiper.js library is already installed (used in HeroSwiper)
- All 17 category images are already available in public/categories folder
