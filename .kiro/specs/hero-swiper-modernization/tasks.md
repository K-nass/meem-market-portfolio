# Implementation Plan: Hero Swiper Modernization

## Overview

This implementation plan transforms the static Hero component into a dynamic swiper carousel with smooth animations and Ramadan theming. The approach splits the component into a server component wrapper (for translations) and a client component (for swiper interactivity), leveraging the already-installed Swiper.js library. The implementation will be incremental, with early validation through testing to catch issues quickly.

## Tasks

- [x] 1. Update translation files with new hero content
  - Add new translation keys to messages/ar.json for Arabic content
  - Add new translation keys to messages/en.json for English content
  - Include keys: mainHeading, subheading, callToAction, heroImageAlt
  - _Requirements: 3.1, 3.2, 3.3, 3.6_

- [x] 2. Create HeroSwiper client component with basic structure
  - [x] 2.1 Create app/components/HeroSwiper.tsx with 'use client' directive
    - Define HeroSwiperProps interface with translation props
    - Import Swiper and required modules from 'swiper' library
    - Import Swiper styles ('swiper/css', 'swiper/css/navigation', etc.)
    - Create basic component structure with props destructuring
    - _Requirements: 1.1, 8.5_
  
  - [x] 2.2 Implement hero image data array
    - Define heroImages array with three image objects (src, alt)
    - Use paths: /heros/meem-hero-1.webp, meem-hero-2.webp, meem-hero-3.webp
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 2.3 Configure Swiper with required settings
    - Set up Swiper modules: Autoplay, Pagination, Navigation, EffectFade
    - Configure effect: 'fade', speed: 800ms
    - Configure autoplay: delay 5000ms, pauseOnMouseEnter: true
    - Enable loop, pagination (clickable), navigation, keyboard, a11y
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 6.6, 6.7, 7.2, 7.3_

- [x] 3. Implement slide rendering with images and overlays
  - [x] 3.1 Render Swiper container with SwiperSlide components
    - Map over heroImages array to create SwiperSlide for each image
    - Render img element with src, alt, and zoom animation class
    - Add image error handling with onError callback for fallback
    - Apply lazy loading to non-first images (loading="lazy")
    - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4, 4.6, 7.1, 7.5, 7.6_
  
  - [x] 3.2 Add gradient overlays to each slide
    - Create overlay div with gradient classes (from-primary-dark/80 to transparent)
    - Add secondary gradient overlay (from-background-light via transparent)
    - Position overlays absolutely over images with z-index layering
    - _Requirements: 2.4, 2.5_

- [~] 4. Add CSS animation for zoom effect
  - [x] 4.1 Create zoom animation in global CSS or Tailwind config
    - Define @keyframes zoomIn animation (scale 1 to 1.05)
    - Set animation duration to 5 seconds with ease-out timing
    - Create utility class .hero-image-zoom for applying animation
    - _Requirements: 2.1, 2.2, 2.3, 7.7_
  
  - [x] 4.2 Apply zoom animation class to slide images
    - Add hero-image-zoom class to img elements
    - Verify animation resets on slide change (automatic with Swiper)
    - _Requirements: 2.1, 2.3_

- [x] 5. Implement content overlay with localized text
  - [x] 5.1 Create content overlay structure
    - Position content overlay absolutely with z-10
    - Use max-w-7xl container with responsive padding
    - Create flex layout for content and decorative elements
    - _Requirements: 3.1, 3.2, 3.3, 6.1, 6.2_
  
  - [x] 5.2 Add Ramadan badge with season text
    - Render badge with gold background and border (bg-gold/20, border-gold/30)
    - Display season text from props
    - Apply uppercase and tracking-wider styles
    - _Requirements: 5.1, 5.2_
  
  - [x] 5.3 Add main heading and subheading
    - Render h1 with mainHeading text (text-5xl md:text-7xl)
    - Render h2 with subheading text (text-4xl md:text-6xl)
    - Apply font-arabic class and dir="rtl" to Arabic text
    - Add responsive text sizing for mobile and desktop
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 6.3_
  
  - [x] 5.4 Add call-to-action text and buttons
    - Render call-to-action paragraph with text from props
    - Create two buttons: "Explore Offers" and "Download Calendar"
    - Apply primary button styling with hover effects
    - Use semantic button elements
    - _Requirements: 3.3, 7.4, 8.7_

- [x] 6. Add decorative Ramadan lantern SVG
  - [x] 6.1 Render lantern SVG with gold color (#D4AF37)
    - Copy existing lantern SVG from current Hero component
    - Apply pulse animation (animate-pulse)
    - Hide on mobile with responsive classes (hidden md:block)
    - _Requirements: 5.3, 5.4, 5.5, 6.4_

- [x] 7. Style Swiper navigation and pagination
  - [x] 7.1 Customize Swiper navigation arrows
    - Add custom styles for .swiper-button-next and .swiper-button-prev
    - Use gold color for arrows
    - Ensure arrows are visible against all hero images
    - _Requirements: 1.8, 5.2_
  
  - [x] 7.2 Customize Swiper pagination bullets
    - Add custom styles for .swiper-pagination-bullet
    - Use gold color for active bullet (.swiper-pagination-bullet-active)
    - Position pagination at bottom center
    - _Requirements: 1.9, 5.2_

- [x] 8. Update Hero server component to use HeroSwiper
  - [x] 8.1 Modify app/components/Hero.tsx
    - Keep server component structure (no 'use client')
    - Fetch translations using getTranslations('hero')
    - Import and render HeroSwiper component
    - Pass all required translation props to HeroSwiper
    - Maintain semantic header element
    - Preserve z-index and height for categories section offset
    - _Requirements: 7.4, 8.1, 8.2, 8.3, 8.4, 8.6_

- [x] 9. Checkpoint - Manual testing and validation
  - Test swiper auto-play functionality in browser
  - Verify hover pause/resume behavior
  - Test swipe gestures on mobile device or emulator
  - Verify zoom animation smoothness
  - Check text readability against all three hero images
  - Test navigation arrows and pagination clicks
  - Verify keyboard navigation (arrow keys, tab)
  - Test responsive layout on mobile, tablet, desktop viewports
  - Verify RTL text direction for Arabic content
  - Check Ramadan theming visual cohesion
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Write unit tests for Hero and HeroSwiper components
  - [ ]* 10.1 Create __tests__/Hero.test.tsx
    - Test Hero component renders without errors
    - Test translations are fetched correctly
    - Test HeroSwiper receives correct props
    - _Requirements: 8.1, 8.2_
  
  - [ ]* 10.2 Create __tests__/HeroSwiper.test.tsx
    - Test HeroSwiper renders three slides
    - Test swiper configuration (fade effect, timing, loop)
    - Test navigation and pagination elements are present
    - Test content overlay displays correct text
    - Test Ramadan badge and lantern SVG are rendered
    - Test responsive classes (mobile hides lantern, text scales)
    - Test semantic HTML elements (header, h1, h2, button)
    - Test image error handling triggers fallback
    - Test lazy loading attribute on non-first images
    - Test keyboard and a11y configuration
    - _Requirements: 1.1, 1.4, 1.5, 1.8, 1.9, 3.1, 3.2, 3.3, 3.4, 3.5, 4.2, 4.3, 4.4, 4.6, 5.1, 5.3, 6.3, 6.4, 7.4, 7.6_
  
  - [ ]* 10.3 Write property test for image accessibility
    - **Property 1: Image Accessibility**
    - **Validates: Requirements 7.1**
    - Create __tests__/HeroSwiper.property.test.tsx
    - Use fast-check to generate random image arrays
    - Render HeroSwiper with generated image data
    - Query all img elements and verify each has non-empty alt attribute
    - Run minimum 100 iterations per test
    - Tag: "Feature: hero-swiper-modernization, Property 1: For any hero image rendered in the swiper, that image element SHALL include an alt attribute with descriptive text"

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Verify no console errors or warnings
  - Confirm all requirements are met
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The swiper library (v12.1.1) is already installed, no additional dependencies needed
- Hero images are already available in public/heros/ directory
- The component maintains server/client split for Next.js App Router compatibility
- Zoom animation uses CSS transforms for optimal performance (GPU-accelerated)
- Property test validates the universal accessibility rule across all images
- Unit tests cover specific implementation details and configuration
- Manual testing checkpoint ensures visual quality and user experience
