# Implementation Plan: Category Grid Carousel Optimization

## Overview

This implementation plan converts the current bento grid category layout into a modern, image-only carousel using Swiper.js. The approach focuses on creating two new components (CategoryCarousel and CategoryImageCard), integrating them into the homepage, and removing the old bento grid components. The implementation prioritizes accessibility, performance, and responsive design while maintaining RTL/LTR support.

## Tasks

- [x] 1. Create CategoryImageCard component
  - Create `app/components/Home/CategoryImageCard.tsx`
  - Implement image-only card with Next.js Image component
  - Add hover effects (scale + shadow transitions)
  - Implement click handler for category navigation
  - Add loading placeholder/skeleton state
  - Wrap card in Link component for proper navigation
  - Add proper alt text using locale-aware category titles
  - Apply rounded corners (24px) and styling matching design system
  - _Requirements: 2.1, 2.2, 2.4, 3.3, 7.3, 8.1, 8.4_

- [ ]* 1.1 Write property test for image-only display
  - **Property 2: Image-Only Display**
  - **Validates: Requirements 2.1, 2.2**

- [ ]* 1.2 Write property test for image path consistency
  - **Property 3: Image Path Consistency**
  - **Validates: Requirements 2.4**

- [ ]* 1.3 Write property test for hover state consistency
  - **Property 10: Hover State Consistency**
  - **Validates: Requirements 3.3**

- [ ]* 1.4 Write property test for image loading state
  - **Property 11: Image Loading State**
  - **Validates: Requirements 7.3**

- [ ]* 1.5 Write property test for click navigation
  - **Property 9: Click Navigation**
  - **Validates: Requirements 8.1**

- [x] 2. Create CategoryCarousel component
  - Create `app/components/Home/CategoryCarousel.tsx` as client component
  - Import Swiper, SwiperSlide, and required modules (Autoplay, Pagination, Navigation, A11y)
  - Configure Swiper with responsive breakpoints (1.2 slides mobile, 2.5 tablet, 3.5 desktop)
  - Set up RTL/LTR direction based on locale prop
  - Configure autoplay (3500ms delay, pause on hover)
  - Add loop, speed (600ms), and keyboard navigation
  - Implement custom navigation arrows with hover reveal
  - Add pagination with dynamic bullets
  - Set up ARIA labels for accessibility
  - Filter invalid categories before rendering
  - Map all valid categories to SwiperSlide with CategoryImageCard
  - _Requirements: 1.2, 3.2, 3.5, 3.6, 4.1, 4.2, 5.1, 5.2, 5.3, 5.6, 6.1, 6.2, 6.3_

- [ ]* 2.1 Write property test for all categories rendered
  - **Property 1: All Categories Rendered**
  - **Validates: Requirements 1.2**

- [ ]* 2.2 Write property test for RTL/LTR direction mapping
  - **Property 4: RTL/LTR Direction Mapping**
  - **Validates: Requirements 4.1, 4.2**

- [ ]* 2.3 Write property test for responsive breakpoint behavior
  - **Property 5: Responsive Breakpoint Behavior**
  - **Validates: Requirements 5.1, 5.2, 5.3**

- [ ]* 2.4 Write property test for touch swipe navigation
  - **Property 6: Touch Swipe Navigation**
  - **Validates: Requirements 5.6**

- [ ]* 2.5 Write property test for keyboard navigation
  - **Property 7: Keyboard Navigation**
  - **Validates: Requirements 6.1**

- [ ]* 2.6 Write unit tests for accessibility features
  - Test ARIA labels on navigation controls
  - Test screen reader announcements
  - Test Tab key navigation
  - _Requirements: 6.2, 6.3, 6.5_

- [x] 3. Integrate CategoryCarousel into homepage
  - Open `app/[locale]/page.tsx`
  - Import CategoryCarousel component
  - Replace the entire bento grid section (lines 75-133) with CategoryCarousel
  - Pass all categories from categories array (not just featured)
  - Pass locale prop to CategoryCarousel
  - Remove imports for FeaturedCategoriesSwiper and CategoryCard
  - Maintain section header ("Seasonal Collections", "Featured Categories")
  - Keep "View All Categories" link
  - _Requirements: 1.1, 1.5_

- [ ]* 3.1 Write integration test for homepage carousel rendering
  - Test carousel renders on homepage
  - Test bento grid components are not present
  - Test all 17 categories are displayed
  - _Requirements: 1.1, 1.5_

- [x] 4. Add custom styling for carousel
  - Create or update carousel-specific styles
  - Style navigation arrows (white/20 backdrop blur, hover effects)
  - Style pagination dots (position, colors, active state)
  - Add focus indicators for accessibility
  - Ensure spacing matches design (24px desktop, 20px tablet, 16px mobile)
  - Add smooth transitions for hover effects
  - Test RTL styles work correctly
  - _Requirements: 3.1, 3.5, 3.6, 6.4_

- [ ]* 4.1 Write property test for focus indicator visibility
  - **Property 8: Focus Indicator Visibility**
  - **Validates: Requirements 6.4**

- [x] 5. Optimize images and performance
  - Ensure Next.js Image component uses proper sizes attribute
  - Configure lazy loading for off-screen images
  - Add loading placeholder component
  - Test image optimization with WebP format
  - Verify preloading of adjacent slides
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 5.1 Write unit tests for image optimization
  - Test lazy loading attribute present
  - Test Next.js Image component used
  - Test sizes attribute configured correctly
  - _Requirements: 7.1, 7.2_

- [x] 6. Add error handling
  - Implement image load error handler with fallback placeholder
  - Add category data validation (filter invalid categories)
  - Add locale validation with default to 'en'
  - Add console warnings for missing data
  - Handle empty categories array gracefully
  - _Requirements: Error Handling section_

- [ ]* 6.1 Write unit tests for error handling
  - Test image load failure shows placeholder
  - Test invalid categories filtered out
  - Test invalid locale defaults to 'en'
  - Test empty categories array handled

- [x] 7. Clean up old components
  - Remove or deprecate `app/components/Home/FeaturedCategoriesSwiper.tsx`
  - Remove or deprecate `app/components/Home/CategoryCard.tsx`
  - Remove unused imports from page.tsx
  - Remove unused translation keys if any
  - Verify no other files reference removed components
  - _Requirements: 1.5_

- [x] 8. Checkpoint - Test across devices and locales
  - Test on mobile (375px, 414px widths)
  - Test on tablet (768px, 1024px widths)
  - Test on desktop (1280px, 1920px widths)
  - Test with English locale (LTR)
  - Test with Arabic locale (RTL)
  - Test keyboard navigation (arrow keys, Tab)
  - Test touch swipe on mobile
  - Test hover effects on desktop
  - Test image loading and error states
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Final accessibility audit
  - Verify ARIA labels present and correct
  - Test with screen reader (VoiceOver or NVDA)
  - Verify keyboard navigation works completely
  - Check focus indicators visible
  - Verify color contrast meets WCAG standards
  - Test with keyboard only (no mouse)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 9.1 Write accessibility integration tests
  - Test complete keyboard navigation flow
  - Test focus management
  - Test ARIA announcements
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 10. Performance validation
  - Run Lighthouse audit on homepage
  - Verify 60fps during animations
  - Check image loading performance
  - Verify no layout shifts (CLS)
  - Test on slower network (3G throttling)
  - _Requirements: 7.5_

- [ ] 11. Final checkpoint - Production readiness
  - All property tests passing (100+ iterations each)
  - All unit tests passing
  - All integration tests passing
  - Visual regression tests passing (if applicable)
  - No console errors or warnings
  - Performance metrics acceptable
  - Accessibility audit complete
  - Cross-browser testing complete (Chrome, Firefox, Safari)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples and edge cases
- Focus on creating clean, accessible, performant code
- Maintain existing design system patterns (colors, spacing, typography)
- Ensure smooth migration by testing thoroughly before removing old components
