# Requirements Document

## Introduction

This specification defines the requirements for replacing the current bento grid category layout on the homepage with a modern, clean carousel that displays category images in a high-end, professional manner. The current bento grid layout with mixed card sizes and text overlays does not suit the large category images effectively. The new carousel will showcase category images prominently without text overlays, following modern frontend design patterns seen on premium e-commerce websites.

## Glossary

- **Category_Carousel**: The new carousel component that displays category cards in a horizontal scrollable layout
- **Category_Card**: An individual card within the carousel that displays only a category image
- **Swiper**: The Swiper.js library already used in the application for carousel functionality
- **Homepage**: The main landing page at `app/[locale]/page.tsx`
- **Locale**: The language/region setting (English 'en' or Arabic 'ar')
- **RTL**: Right-to-left text direction used for Arabic locale
- **LTR**: Left-to-right text direction used for English locale
- **Category_Data**: The category information stored in `app/data/categories.ts`
- **Responsive_Breakpoint**: Screen size thresholds where layout changes (mobile, tablet, desktop)

## Requirements

### Requirement 1: Replace Bento Grid with Carousel

**User Story:** As a user, I want to browse categories in a modern carousel format, so that I can easily explore all available categories with smooth navigation.

#### Acceptance Criteria

1. WHEN the homepage loads, THE Category_Carousel SHALL replace the entire bento grid layout (lines 75-133 in page.tsx)
2. THE Category_Carousel SHALL display all 17 categories from Category_Data in a horizontal scrollable layout
3. WHEN a user interacts with the carousel, THE Category_Carousel SHALL provide smooth transitions between category cards
4. THE Category_Carousel SHALL use the existing Swiper library for carousel functionality
5. WHEN the carousel is rendered, THE Category_Carousel SHALL remove all previous bento grid components (FeaturedCategoriesSwiper, CategoryCard variants)

### Requirement 2: Image-Only Category Cards

**User Story:** As a user, I want to see category images without text overlays, so that I can appreciate the visual content that already contains all necessary information.

#### Acceptance Criteria

1. WHEN a Category_Card is rendered, THE Category_Card SHALL display only the category image without text overlays
2. THE Category_Card SHALL NOT display title, description, badges, discount labels, or action buttons
3. WHEN a Category_Card is displayed, THE Category_Card SHALL use the full card area for the image
4. THE Category_Card SHALL load images from the `/public/categories/` directory using the imagePath from Category_Data
5. WHEN an image loads, THE Category_Card SHALL maintain proper aspect ratio and prevent distortion

### Requirement 3: Modern Carousel Design

**User Story:** As a user, I want a visually appealing carousel with modern design patterns, so that I have a premium browsing experience.

#### Acceptance Criteria

1. THE Category_Carousel SHALL display cards with consistent spacing between them
2. THE Category_Carousel SHALL show partial visibility of the next and previous cards to indicate scrollability
3. WHEN hovering over a Category_Card, THE Category_Card SHALL apply a subtle hover effect (scale, shadow, or overlay)
4. THE Category_Carousel SHALL include smooth slide transitions with appropriate animation duration
5. THE Category_Carousel SHALL display navigation arrows that appear on hover
6. THE Category_Carousel SHALL include a progress indicator (pagination dots or progress bar)
7. WHEN navigation arrows are displayed, THE Category_Carousel SHALL position them elegantly without obscuring content

### Requirement 4: Internationalization Support

**User Story:** As a user viewing the site in Arabic or English, I want the carousel to adapt to my language direction, so that navigation feels natural.

#### Acceptance Criteria

1. WHEN the Locale is 'ar', THE Category_Carousel SHALL render in RTL direction
2. WHEN the Locale is 'en', THE Category_Carousel SHALL render in LTR direction
3. WHEN the Locale is 'ar', THE Category_Carousel SHALL reverse navigation arrow directions (left arrow moves right, right arrow moves left)
4. THE Category_Carousel SHALL use the existing next-intl integration for any required text labels
5. WHEN switching between locales, THE Category_Carousel SHALL maintain consistent visual appearance

### Requirement 5: Responsive Design

**User Story:** As a user on any device, I want the carousel to adapt to my screen size, so that I have an optimal viewing experience.

#### Acceptance Criteria

1. WHEN viewed on mobile (< 768px), THE Category_Carousel SHALL display 1.2 cards visible with partial next card
2. WHEN viewed on tablet (768px - 1024px), THE Category_Carousel SHALL display 2.5 cards visible with partial next card
3. WHEN viewed on desktop (> 1024px), THE Category_Carousel SHALL display 3.5 cards visible with partial next card
4. THE Category_Carousel SHALL maintain consistent card aspect ratio across all Responsive_Breakpoints
5. WHEN the viewport size changes, THE Category_Carousel SHALL smoothly adapt without layout shifts
6. WHEN viewed on mobile, THE Category_Carousel SHALL support touch swipe gestures for navigation

### Requirement 6: Accessibility

**User Story:** As a user with accessibility needs, I want the carousel to be keyboard navigable and screen reader friendly, so that I can access all categories.

#### Acceptance Criteria

1. WHEN using keyboard navigation, THE Category_Carousel SHALL support arrow keys for moving between slides
2. THE Category_Carousel SHALL include ARIA labels for navigation controls
3. THE Category_Carousel SHALL provide screen reader announcements for slide changes
4. WHEN a Category_Card receives focus, THE Category_Card SHALL display a visible focus indicator
5. THE Category_Carousel SHALL support Tab key navigation through interactive elements

### Requirement 7: Performance Optimization

**User Story:** As a user, I want the carousel to load quickly and perform smoothly, so that I have a seamless browsing experience.

#### Acceptance Criteria

1. THE Category_Carousel SHALL use lazy loading for images not currently visible
2. THE Category_Carousel SHALL use Next.js Image component for optimized image delivery
3. WHEN images are loading, THE Category_Card SHALL display a loading placeholder or skeleton
4. THE Category_Carousel SHALL preload the next and previous images for instant navigation
5. WHEN animations occur, THE Category_Carousel SHALL maintain 60fps performance

### Requirement 8: Category Navigation

**User Story:** As a user, I want to click on category cards to navigate to category pages, so that I can explore products in that category.

#### Acceptance Criteria

1. WHEN a user clicks a Category_Card, THE Category_Carousel SHALL navigate to the category detail page
2. THE Category_Card SHALL display a pointer cursor on hover to indicate clickability
3. WHEN a Category_Card is clicked, THE Category_Carousel SHALL provide visual feedback (e.g., slight scale down)
4. THE Category_Card SHALL be implemented as a clickable link for proper SEO and navigation
5. WHEN a user right-clicks a Category_Card, THE Category_Card SHALL support "Open in new tab" functionality
