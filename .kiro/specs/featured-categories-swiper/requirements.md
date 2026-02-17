# Requirements Document

## Introduction

This feature transforms the current static category grid on the homepage into a production-grade, modern interface by replacing dummy external images with local category images and converting the largest featured card into an interactive swiper component. The feature maintains the existing bento grid layout structure while enhancing visual appeal and user engagement through dynamic content presentation.

## Glossary

- **System**: The featured categories section on the homepage
- **Swiper_Component**: An interactive carousel/slider component that displays multiple category cards with navigation controls
- **Category_Card**: A reusable UI component that displays category information including title, image, and optional metadata
- **Bento_Grid**: A responsive grid layout system with varying card sizes (large, tall, wide, small, recipe)
- **Local_Image**: An image file stored in the public/categories directory of the application
- **Featured_Slot**: The largest card position in the bento grid (currently "Ramadan Essentials" with variant="large")
- **Locale**: The current language setting (Arabic or English) managed by next-intl

## Requirements

### Requirement 1: Local Image Integration

**User Story:** As a developer, I want to use local category images from the public/categories folder, so that the application does not depend on external image URLs and loads faster.

#### Acceptance Criteria

1. WHEN the System renders category cards, THE System SHALL load images from the public/categories directory
2. WHEN a category image path is constructed, THE System SHALL use the Arabic filename format from the available category images
3. THE System SHALL support all 17 available category image files in webp format
4. WHEN an image fails to load, THE System SHALL display a fallback placeholder or error state

### Requirement 2: Swiper Component Implementation

**User Story:** As a user, I want to see featured categories in an interactive swiper, so that I can browse through multiple featured items in an engaging way.

#### Acceptance Criteria

1. WHEN the homepage loads, THE System SHALL display a Swiper_Component in the Featured_Slot position
2. THE Swiper_Component SHALL occupy the same grid space as the current large variant card (2 columns × 2 rows on desktop)
3. WHEN a user interacts with the swiper, THE System SHALL provide navigation controls (previous/next buttons or dots)
4. THE Swiper_Component SHALL auto-advance slides at a configurable interval
5. WHEN the Swiper_Component displays a slide, THE System SHALL show a Category_Card with appropriate styling
6. THE Swiper_Component SHALL support touch gestures on mobile devices
7. THE Swiper_Component SHALL display at least 3 different featured category cards

### Requirement 3: Bento Grid Layout Preservation

**User Story:** As a designer, I want to maintain the existing bento grid layout structure, so that the overall page design remains consistent and responsive.

#### Acceptance Criteria

1. THE System SHALL maintain the grid structure with 1 column on mobile, 3 columns on tablet, and 4 columns on desktop
2. THE System SHALL preserve the auto-rows height of 280px
3. WHEN the Swiper_Component is rendered, THE System SHALL occupy the md:col-span-2 md:row-span-2 grid space
4. THE System SHALL maintain the existing card variants (tall, wide, small, recipe) for non-swiper cards
5. THE System SHALL preserve the gap-6 spacing between grid items
6. THE System SHALL maintain the rounded-[24px] border radius styling for all cards

### Requirement 4: Production-Grade UI/UX Enhancement

**User Story:** As a user, I want a modern and polished interface, so that the website feels professional and trustworthy.

#### Acceptance Criteria

1. WHEN the Swiper_Component transitions between slides, THE System SHALL use smooth animations
2. THE System SHALL apply consistent hover effects across all Category_Card components
3. WHEN a user hovers over navigation controls, THE System SHALL provide visual feedback
4. THE System SHALL ensure all images are optimized for web performance (webp format)
5. THE System SHALL maintain accessibility standards with proper ARIA labels for swiper controls
6. THE Swiper_Component SHALL display loading states during image loading
7. WHEN the swiper is in view, THE System SHALL pause auto-advance on user interaction

### Requirement 5: Internationalization Support

**User Story:** As a multilingual user, I want the category interface to display correctly in both Arabic and English, so that I can browse categories in my preferred language.

#### Acceptance Criteria

1. WHEN the Locale is Arabic, THE System SHALL display Arabic category titles using the arabicTitle prop
2. WHEN the Locale is English, THE System SHALL display English category titles using the title prop
3. THE System SHALL apply dir="rtl" attribute for Arabic text content
4. WHEN the Locale changes, THE System SHALL update all text content without page reload
5. THE Swiper_Component SHALL support RTL (right-to-left) navigation for Arabic locale
6. THE System SHALL use next-intl translation keys for all user-facing text

### Requirement 6: Category Data Management

**User Story:** As a developer, I want category data to be centrally managed, so that I can easily update categories without modifying multiple files.

#### Acceptance Criteria

1. THE System SHALL define category data in a structured format with title, arabicTitle, image path, and optional metadata
2. WHEN category data is updated, THE System SHALL reflect changes in both the Swiper_Component and static Category_Card components
3. THE System SHALL map category image filenames to their corresponding category data
4. THE System SHALL support optional fields for badge, description, discount, and icon per category
5. WHEN a category is marked as featured, THE System SHALL include it in the Swiper_Component rotation

### Requirement 7: Responsive Design Maintenance

**User Story:** As a mobile user, I want the category section to work seamlessly on my device, so that I can browse categories comfortably on any screen size.

#### Acceptance Criteria

1. WHEN viewed on mobile devices, THE System SHALL display the grid in a single column layout
2. WHEN viewed on tablet devices (md breakpoint), THE System SHALL display the grid in 3 columns
3. WHEN viewed on desktop devices (lg breakpoint), THE System SHALL display the grid in 4 columns
4. THE Swiper_Component SHALL be touch-enabled on mobile and tablet devices
5. WHEN the viewport width changes, THE System SHALL adjust the grid layout without breaking the design
6. THE System SHALL maintain readable text sizes across all breakpoints

### Requirement 8: Component Reusability

**User Story:** As a developer, I want to reuse the existing CategoryCard component, so that I maintain consistency and reduce code duplication.

#### Acceptance Criteria

1. THE Swiper_Component SHALL render Category_Card components for each slide
2. THE System SHALL pass appropriate props (title, arabicTitle, image, badge, variant) to each Category_Card
3. WHEN the CategoryCard component is updated, THE System SHALL reflect changes in both swiper and static cards
4. THE System SHALL support all existing CategoryCard variants within the swiper
5. THE System SHALL maintain the CategoryCard interface without breaking changes
