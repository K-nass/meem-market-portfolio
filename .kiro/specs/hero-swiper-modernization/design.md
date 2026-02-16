# Design Document: Hero Swiper Modernization

## Overview

This design transforms the static Hero component into a dynamic, production-grade swiper carousel with smooth animations and Ramadan theming. The implementation leverages the Swiper.js library (already installed) to create an auto-playing carousel that cycles through three hero images with zoom effects and professional overlays.

The design maintains the existing Next.js server component architecture while introducing client-side interactivity through a dedicated client component for the swiper functionality. The component will use local WebP images for optimal performance and integrate seamlessly with the existing next-intl localization system.

Key design decisions:
- Split architecture: Server component wrapper + Client component for swiper interactivity
- CSS-based zoom animations for performance (GPU-accelerated transforms)
- Swiper.js with minimal configuration for reliability
- Maintain existing Tailwind styling patterns and z-index hierarchy
- Preserve Ramadan theming with gold accents and decorative elements

## Architecture

### Component Structure

```
Hero (Server Component)
├── Fetches translations via next-intl
├── Passes translated content as props
└── Renders HeroSwiper (Client Component)
    ├── Swiper Container
    │   ├── SwiperSlide 1 (meem-hero-1.webp)
    │   ├── SwiperSlide 2 (meem-hero-2.webp)
    │   └── SwiperSlide 3 (meem-hero-3.webp)
    ├── Content Overlay
    │   ├── Ramadan Badge
    │   ├── Main Heading (Arabic)
    │   ├── Subheading (Arabic)
    │   ├── Call-to-action Text
    │   └── Action Buttons
    ├── Navigation Controls (Prev/Next Arrows)
    ├── Pagination Indicators
    └── Decorative Lantern SVG
```

### Data Flow

1. **Server-side**: Hero component fetches translations using `getTranslations('hero')`
2. **Props passing**: Translated strings passed to HeroSwiper client component
3. **Client-side**: HeroSwiper initializes Swiper with configuration
4. **Auto-play**: Swiper automatically transitions every 5 seconds
5. **User interaction**: Hover pauses auto-play, swipe/click changes slides

### File Organization

- `app/components/Hero.tsx` - Server component wrapper (modified)
- `app/components/HeroSwiper.tsx` - Client component with swiper logic (new)
- `messages/ar.json` - Updated with new hero translations
- `messages/en.json` - Updated with new hero translations
- `public/heros/` - Contains hero images (existing)

## Components and Interfaces

### Hero Component (Server)

**Purpose**: Server component that fetches translations and renders the client swiper component.

**Interface**:
```typescript
// No props - server component
export default async function Hero(): Promise<JSX.Element>
```

**Responsibilities**:
- Fetch translations using next-intl
- Pass translated content to HeroSwiper
- Maintain server component compatibility

### HeroSwiper Component (Client)

**Purpose**: Client component that implements the swiper carousel with animations.

**Interface**:
```typescript
'use client';

interface HeroSwiperProps {
  season: string;           // "موسم رمضان 2026"
  mainHeading: string;      // "كل ما تحتاجه في مكان واحد"
  subheading: string;       // "سوق ميم… وجهتك الشاملة للتسوق الذكي"
  callToAction: string;     // "اختر دولتك للوصول إلى..."
  exploreButton: string;    // Button text
  downloadButton: string;   // Button text
}

export default function HeroSwiper(props: HeroSwiperProps): JSX.Element
```

**Responsibilities**:
- Initialize Swiper with configuration
- Render slides with hero images
- Apply zoom animations via CSS
- Handle auto-play and user interactions
- Render navigation and pagination
- Display content overlay with translations

### Swiper Configuration

```typescript
const swiperConfig = {
  modules: [Autoplay, Pagination, Navigation, EffectFade],
  effect: 'fade',                    // Smooth fade transitions
  fadeEffect: {
    crossFade: true                  // Prevent overlapping during fade
  },
  speed: 800,                        // Transition duration in ms
  autoplay: {
    delay: 5000,                     // 5 seconds per slide
    disableOnInteraction: false,     // Resume after user interaction
    pauseOnMouseEnter: true          // Pause on hover
  },
  loop: true,                        // Infinite loop
  pagination: {
    clickable: true,
    dynamicBullets: false
  },
  navigation: true,                  // Show prev/next arrows
  keyboard: {
    enabled: true                    // Keyboard navigation
  },
  a11y: {
    enabled: true                    // Accessibility features
  }
}
```

## Data Models

### Translation Keys

**New keys to add to messages/ar.json**:
```json
{
  "hero": {
    "season": "موسم رمضان 2026",
    "mainHeading": "كل ما تحتاجه في مكان واحد",
    "subheading": "سوق ميم… وجهتك الشاملة للتسوق الذكي",
    "callToAction": "اختر دولتك للوصول إلى العروض المتاحة، والفروع، وقنوات التواصل",
    "exploreOffers": "تصفح العروض",
    "downloadCalendar": "تحميل التقويم",
    "heroImageAlt": "صورة بطل سوق ميم"
  }
}
```

**New keys to add to messages/en.json**:
```json
{
  "hero": {
    "season": "Ramadan Season 2026",
    "mainHeading": "Everything You Need in One Place",
    "subheading": "Meem Market... Your Comprehensive Destination for Smart Shopping",
    "callToAction": "Choose your country to access available offers, branches, and contact channels",
    "exploreOffers": "Explore Offers",
    "downloadCalendar": "Download Calendar",
    "heroImageAlt": "Meem Market hero image"
  }
}
```

### Hero Image Data

```typescript
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
```

## CSS Animations

### Zoom Effect

```css
@keyframes zoomIn {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

.hero-image-zoom {
  animation: zoomIn 5s ease-out forwards;
}
```

**Implementation approach**: Apply the animation class to each slide's image. The animation resets automatically when Swiper changes slides because the DOM element is replaced.

### Swiper Styling

Custom Tailwind classes for Swiper elements:
- `.swiper-button-next`, `.swiper-button-prev`: Navigation arrows with gold color
- `.swiper-pagination-bullet`: Pagination dots with gold active state
- `.swiper-pagination-bullet-active`: Active dot styling

## Correctness Properties


A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Image Accessibility

*For any* hero image rendered in the swiper, that image element SHALL include an alt attribute with descriptive text.

**Validates: Requirements 7.1**

**Rationale**: This property ensures accessibility compliance across all slides. Rather than testing each specific image individually, we verify the universal rule that every image must have alt text, regardless of which images are configured in the carousel.

## Error Handling

### Image Loading Failures

**Scenario**: Hero image fails to load due to network issues or missing file.

**Handling**:
1. Apply fallback background color (`bg-primary-dark`) to the slide container
2. Log error to console for debugging
3. Continue swiper functionality with remaining slides
4. Display alt text as fallback content

**Implementation**:
```typescript
<img
  src={image.src}
  alt={image.alt}
  onError={(e) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.parentElement.classList.add('bg-primary-dark');
  }}
/>
```

### Swiper Initialization Failure

**Scenario**: Swiper library fails to initialize due to browser incompatibility or JavaScript errors.

**Handling**:
1. Render first hero image as static fallback
2. Display content overlay normally
3. Hide navigation and pagination controls
4. Log error for monitoring

**Implementation**: Wrap Swiper initialization in try-catch block with fallback rendering.

### Translation Missing

**Scenario**: Translation keys are missing from messages file.

**Handling**:
1. next-intl automatically falls back to key name
2. Display key name as visible indicator of missing translation
3. Component continues to render normally
4. Log warning in development mode

### Responsive Breakpoint Edge Cases

**Scenario**: Browser window is resized during swiper auto-play.

**Handling**:
1. Swiper automatically recalculates dimensions
2. Auto-play continues without interruption
3. Layout adjusts smoothly via Tailwind responsive classes
4. No manual resize handling needed (Swiper handles this)

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific implementation details and edge cases using React Testing Library and Jest. Focus areas:

**Component Rendering**:
- Hero component renders without errors
- HeroSwiper receives correct props from Hero
- All three slides are rendered in the DOM
- Content overlay displays translated text correctly
- Ramadan badge and lantern SVG are present

**Swiper Configuration**:
- Swiper initializes with correct config (fade effect, 800ms speed, 5s delay)
- Loop mode is enabled
- Navigation and pagination are enabled
- Keyboard and a11y modules are configured

**Responsive Behavior**:
- Mobile viewport hides lantern icon
- Desktop viewport shows two-column layout
- Text sizes scale appropriately with viewport

**Accessibility**:
- Semantic HTML elements are used (header, h1, h2, button)
- ARIA labels are present on navigation controls
- Keyboard navigation works (test arrow key events)

**Error Handling**:
- Image load errors trigger fallback background
- Missing translations fall back to key names

**Integration Points**:
- next-intl translations are fetched correctly
- Tailwind classes are applied
- z-index layering is preserved

### Property-Based Testing Approach

Property tests will verify universal correctness properties across randomized inputs using a property-based testing library (fast-check for TypeScript).

**Configuration**: Each property test will run a minimum of 100 iterations to ensure comprehensive coverage through randomization.

**Property Test 1: Image Accessibility**
- **Property**: For any hero image rendered in the swiper, that image element SHALL include an alt attribute with descriptive text
- **Test approach**: Generate random arrays of image data (varying lengths, different src/alt combinations), render HeroSwiper with that data, query all img elements, verify each has a non-empty alt attribute
- **Tag**: `Feature: hero-swiper-modernization, Property 1: For any hero image rendered in the swiper, that image element SHALL include an alt attribute with descriptive text`
- **Validates**: Requirements 7.1

### Testing Balance

This feature has primarily concrete, specific requirements (specific text content, specific images, specific timing values) rather than universal rules. Therefore:

- **Unit tests** will handle the majority of verification (specific examples, configuration, integration)
- **Property tests** will verify the one universal rule (image accessibility)
- Both approaches are necessary: unit tests catch specific implementation bugs, property tests ensure the universal accessibility rule holds

### Test Organization

```
__tests__/
├── Hero.test.tsx                    # Server component unit tests
├── HeroSwiper.test.tsx              # Client component unit tests
└── HeroSwiper.property.test.tsx     # Property-based tests
```

### Manual Testing Checklist

After automated tests pass, manually verify:
- [ ] Swiper auto-plays smoothly on page load
- [ ] Hover pauses auto-play, mouse leave resumes
- [ ] Swipe gestures work on mobile devices
- [ ] Zoom animation is smooth and performant
- [ ] Text is readable against all three hero images
- [ ] Navigation arrows and pagination work correctly
- [ ] Keyboard navigation (arrow keys) works
- [ ] Layout is responsive across mobile, tablet, desktop
- [ ] RTL text direction displays correctly for Arabic
- [ ] Ramadan theming looks visually cohesive
