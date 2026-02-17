# Design Document: Featured Categories Swiper

## Overview

This design transforms the homepage featured categories section by replacing external dummy images with local category images and converting the largest featured card into an interactive swiper component. The solution leverages the existing Swiper.js library (already used in HeroSwiper) to create a production-grade carousel experience while maintaining the bento grid layout structure and reusing the CategoryCard component.

The design follows a component-based architecture where:
1. A new `FeaturedCategoriesSwiper` component encapsulates the swiper logic
2. Category data is centralized in a data file for easy management
3. The existing `CategoryCard` component is reused without modification
4. The bento grid layout in `page.tsx` is updated to integrate the swiper

## Architecture

### Component Hierarchy

```
page.tsx (Homepage)
├── FeaturedCategoriesSwiper (new)
│   └── Swiper
│       └── SwiperSlide[]
│           └── CategoryCard (reused)
├── CategoryCard (tall variant)
├── CategoryCard (wide variant)
├── CategoryCard (small variant)
├── CategoryCard (recipe variant)
└── Charity Box
```

### Data Flow

```
categories.ts (data source)
    ↓
page.tsx (filters featured categories)
    ↓
FeaturedCategoriesSwiper (receives featured categories)
    ↓
CategoryCard (renders each slide)
```

### File Structure

```
app/
├── [locale]/
│   └── page.tsx (updated)
├── components/
│   └── Home/
│       ├── CategoryCard.tsx (existing, no changes)
│       └── FeaturedCategoriesSwiper.tsx (new)
├── data/
│   └── categories.ts (new)
└── public/
    └── categories/
        └── *.webp (existing images)
```

## Components and Interfaces

### 1. Category Data Structure

**File:** `app/data/categories.ts`

```typescript
export interface Category {
  id: string;
  title: string;
  arabicTitle: string;
  description?: string;
  imagePath: string;
  badge?: string;
  discount?: string;
  icon?: string;
  isFeatured?: boolean;
  variant?: 'large' | 'tall' | 'wide' | 'small' | 'recipe';
}

export const categories: Category[] = [
  {
    id: 'beauty-tools',
    title: 'Beauty Tools',
    arabicTitle: 'أدوات التجميل',
    imagePath: '/categories/قسم-أدوات-التجميل.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'shoes-bags',
    title: 'Shoes & Bags',
    arabicTitle: 'الأحذية والشنط',
    imagePath: '/categories/قسم-الأحذية-والشنط.webp',
    isFeatured: true,
    variant: 'large',
    badge: 'New Arrivals'
  },
  {
    id: 'toys-entertainment',
    title: 'Toys & Entertainment',
    arabicTitle: 'الألعاب والترفية',
    imagePath: '/categories/قسم-الألعاب-والترفية.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'household-items',
    title: 'Household Items',
    arabicTitle: 'الأواني المنزلية',
    imagePath: '/categories/قسم-الأواني-المنزلية.webp',
    variant: 'wide',
    discount: '40%',
    icon: 'countertops'
  },
  {
    id: 'plastic-hardware',
    title: 'Plastic & Hardware',
    arabicTitle: 'البلاستك والخردوات',
    imagePath: '/categories/قسم-البلاستك-والخردوات.webp',
    variant: 'tall'
  },
  {
    id: 'gifts-collectibles',
    title: 'Gifts & Collectibles',
    arabicTitle: 'التحف والهدايا',
    imagePath: '/categories/قسم-التحف-والهدايا.webp',
    variant: 'small',
    badge: 'Premium'
  },
  {
    id: 'vegetables-fruits',
    title: 'Vegetables & Fruits',
    arabicTitle: 'الخضروات والفواكة',
    imagePath: '/categories/قسم-الخضروات-والفواكة.webp',
    variant: 'recipe',
    badge: 'Fresh Daily',
    description: 'Farm-fresh produce delivered daily'
  },
  {
    id: 'perfumes-incense',
    title: 'Perfumes & Incense',
    arabicTitle: 'العطور والبخور',
    imagePath: '/categories/قسم-العطور-والبخور.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'baby-care',
    title: 'Baby Care',
    arabicTitle: 'العناية بالطفل',
    imagePath: '/categories/قسم-العناية-بالطفل.webp'
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    arabicTitle: 'العناية',
    imagePath: '/categories/قسم-العناية.webp'
  },
  {
    id: 'tools-car-accessories',
    title: 'Tools & Car Accessories',
    arabicTitle: 'العِدد وزينة السيارات',
    imagePath: '/categories/قسم-العِدد-وزينة-السيارات.webp'
  },
  {
    id: 'towels',
    title: 'Towels',
    arabicTitle: 'الفوط',
    imagePath: '/categories/قسم-الفوط.webp'
  },
  {
    id: 'personal-supplies',
    title: 'Personal Supplies',
    arabicTitle: 'اللوازم الشخصية',
    imagePath: '/categories/قسم-اللوازم-الشخصية.webp'
  },
  {
    id: 'furnishings',
    title: 'Furnishings',
    arabicTitle: 'المفروشات',
    imagePath: '/categories/قسم-المفروشات.webp'
  },
  {
    id: 'cleaning-products',
    title: 'Cleaning Products',
    arabicTitle: 'المنظفات',
    imagePath: '/categories/قسم-المنظفات.webp'
  },
  {
    id: 'consumables',
    title: 'Consumables',
    arabicTitle: 'المواد الاستهلاكية',
    imagePath: '/categories/قسم-المواد-الاستهلاكية.webp'
  },
  {
    id: 'food-products',
    title: 'Food Products',
    arabicTitle: 'المواد الغذائية',
    imagePath: '/categories/قسم-المواد-الغذائية.webp'
  }
];

// Helper function to get featured categories
export function getFeaturedCategories(): Category[] {
  return categories.filter(cat => cat.isFeatured);
}

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}
```

### 2. FeaturedCategoriesSwiper Component

**File:** `app/components/Home/FeaturedCategoriesSwiper.tsx`

```typescript
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
  const isRTL = locale === 'ar';

  return (
    <div className="md:col-span-2 md:row-span-2 rounded-[24px] overflow-hidden shadow-xl featured-swiper-container">
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
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="h-full">
            <CategoryCard
              variant="large"
              title={category.title}
              arabicTitle={category.arabicTitle}
              description={category.description}
              image={category.imagePath}
              badge={category.badge}
              shopNowLabel={shopNowLabel}
            />
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
```

### 3. Updated Homepage Integration

**File:** `app/[locale]/page.tsx` (relevant section)

```typescript
import { getTranslations } from "next-intl/server";
import { getFeaturedCategories, categories } from "../data/categories";
import FeaturedCategoriesSwiper from "../components/Home/FeaturedCategoriesSwiper";
import CategoryCard from "../components/Home/CategoryCard";

export default async function Home({ params }: { params: { locale: string } }) {
    const t = await getTranslations('categories');
    const featuredCategories = getFeaturedCategories();
    
    // Get specific categories for static cards
    const tallCategory = categories.find(c => c.id === 'plastic-hardware');
    const wideCategory = categories.find(c => c.id === 'household-items');
    const smallCategory = categories.find(c => c.id === 'gifts-collectibles');
    const recipeCategory = categories.find(c => c.id === 'vegetables-fruits');

    return (
        <>
            {/* ... Hero and other sections ... */}
            
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-20 pb-20 w-full">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 text-white md:text-gray-800">
                    <div>
                        <span className="uppercase tracking-widest text-xs font-bold text-gold mb-1 block">
                            {t('seasonalCollections')}
                        </span>
                        <h3 className="text-3xl font-bold">{t('featuredCategories')}</h3>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors mt-4 md:mt-0">
                        {t('viewAllCategories')} 
                        <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </a>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px] group">
                    {/* Featured Swiper - replaces the large card */}
                    <FeaturedCategoriesSwiper
                        categories={featuredCategories}
                        shopNowLabel={t('shopNow')}
                        locale={params.locale}
                    />
                    
                    {/* Static Category Cards */}
                    {tallCategory && (
                        <CategoryCard
                            variant="tall"
                            title={tallCategory.title}
                            arabicTitle={tallCategory.arabicTitle}
                            description={tallCategory.description}
                            image={tallCategory.imagePath}
                        />
                    )}
                    
                    {wideCategory && (
                        <CategoryCard
                            variant="wide"
                            title={wideCategory.title}
                            arabicTitle={wideCategory.arabicTitle}
                            image={wideCategory.imagePath}
                            discount={wideCategory.discount}
                            icon={wideCategory.icon}
                            offLabel={t('off')}
                        />
                    )}
                    
                    {smallCategory && (
                        <CategoryCard
                            variant="small"
                            title={smallCategory.title}
                            arabicTitle={smallCategory.arabicTitle}
                            image={smallCategory.imagePath}
                            badge={smallCategory.badge}
                            viewCollectionLabel={t('viewCollection')}
                        />
                    )}
                    
                    {recipeCategory && (
                        <CategoryCard
                            variant="recipe"
                            title={recipeCategory.title}
                            arabicTitle={recipeCategory.arabicTitle}
                            description={recipeCategory.description}
                            image={recipeCategory.imagePath}
                            badge={recipeCategory.badge}
                            readRecipesLabel={t('readRecipes')}
                        />
                    )}

                    {/* Charity Box - unchanged */}
                    <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[24px] shadow-lg hover-lift bg-gradient-to-br from-[#1a3a1a] to-[#0d1f0d] p-6 text-center flex flex-col items-center justify-center cursor-pointer border border-white/5">
                        {/* ... charity box content unchanged ... */}
                    </div>
                </div>
            </main>
        </>
    );
}
```

## Data Models

### Category Interface

The `Category` interface serves as the central data model for all category information:

```typescript
interface Category {
  id: string;              // Unique identifier (kebab-case)
  title: string;           // English title
  arabicTitle: string;     // Arabic title
  description?: string;    // Optional description for detailed cards
  imagePath: string;       // Path to image in public/categories
  badge?: string;          // Optional badge text (e.g., "New", "Premium")
  discount?: string;       // Optional discount text (e.g., "40%")
  icon?: string;           // Optional Material Icons name
  isFeatured?: boolean;    // Flag to include in swiper
  variant?: string;        // Preferred display variant
}
```

**Field Constraints:**
- `id`: Must be unique, lowercase, kebab-case
- `imagePath`: Must start with `/categories/` and end with `.webp`
- `title` and `arabicTitle`: Required, non-empty strings
- `isFeatured`: Defaults to `false` if not specified
- `variant`: Must match CategoryCard variant types if specified

### Swiper Configuration Model

```typescript
interface SwiperConfig {
  speed: number;                    // Transition speed in ms
  autoplayDelay: number;            // Auto-advance delay in ms
  loop: boolean;                    // Enable infinite loop
  pauseOnMouseEnter: boolean;       // Pause on hover
  disableOnInteraction: boolean;    // Continue after manual navigation
  paginationClickable: boolean;     // Enable dot navigation
  navigationEnabled: boolean;       // Show prev/next buttons
  keyboardEnabled: boolean;         // Enable keyboard navigation
  a11yEnabled: boolean;             // Enable accessibility features
}
```

**Default Configuration:**
```typescript
const defaultSwiperConfig: SwiperConfig = {
  speed: 600,
  autoplayDelay: 4000,
  loop: true,
  pauseOnMouseEnter: true,
  disableOnInteraction: false,
  paginationClickable: true,
  navigationEnabled: true,
  keyboardEnabled: true,
  a11yEnabled: true
};
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Image Path Validity

*For any* category in the categories array, its imagePath field should start with `/categories/`, end with `.webp`, and reference an Arabic filename format.

**Validates: Requirements 1.1, 1.2, 4.4**

### Property 2: Image Load Error Handling

*For any* CategoryCard component, when its image fails to load, the component should display a fallback state or error handling behavior.

**Validates: Requirements 1.4**

### Property 3: Swiper Navigation Controls Presence

*For any* rendered FeaturedCategoriesSwiper component, the DOM should contain both navigation buttons (prev/next) and pagination dots.

**Validates: Requirements 2.3**

### Property 4: Swiper Auto-Advance Configuration

*For any* FeaturedCategoriesSwiper instance, the autoplay configuration should be enabled with a delay value greater than 0.

**Validates: Requirements 2.4**

### Property 5: Swiper Slide Content

*For any* slide in the FeaturedCategoriesSwiper, the slide should contain a CategoryCard component with variant="large".

**Validates: Requirements 2.5, 8.1**

### Property 6: Border Radius Consistency

*For any* card element in the bento grid (including the swiper container), the element should have rounded-[24px] styling applied.

**Validates: Requirements 3.6**

### Property 7: Accessibility Attributes

*For any* FeaturedCategoriesSwiper component, the swiper configuration should include a11y enabled settings and navigation buttons should have aria-label attributes.

**Validates: Requirements 4.5**

### Property 8: Locale-Based Title Display

*For any* category displayed in the UI, when locale is Arabic the arabicTitle should be used, and when locale is English the title should be used.

**Validates: Requirements 5.1, 5.2**

### Property 9: RTL Direction Support

*For any* FeaturedCategoriesSwiper component, when locale is Arabic, the swiper should have dir="rtl" attribute and navigation icons should be reversed (chevron_right for prev, chevron_left for next).

**Validates: Requirements 5.3, 5.5**

### Property 10: Category Data Structure Validity

*For any* category object in the categories array, it must have required fields (id, title, arabicTitle, imagePath) as non-empty strings, and may have optional fields (badge, description, discount, icon, isFeatured, variant).

**Validates: Requirements 6.1, 6.4**

### Property 11: Image Path to File Mapping

*For any* category in the categories array, its imagePath should correspond to an actual file in the public/categories directory.

**Validates: Requirements 6.3**

### Property 12: Featured Category Filtering

*For any* category with isFeatured=true, that category should appear in the array returned by getFeaturedCategories().

**Validates: Requirements 6.5**

### Property 13: Props Mapping Consistency

*For any* category data passed to FeaturedCategoriesSwiper, the corresponding CategoryCard in each slide should receive props that match the category's fields (title, arabicTitle, imagePath, badge, description).

**Validates: Requirements 8.2**

## Error Handling

### Image Loading Errors

**Scenario:** Category image fails to load from public/categories directory

**Handling Strategy:**
1. CategoryCard component includes onError handler on img element
2. On error, hide the broken image and apply fallback background color
3. Log error to console for debugging (development only)
4. Display category title and metadata even if image fails

**Implementation:**
```typescript
<img
  src={category.imagePath}
  alt={category.title}
  onError={(e) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.parentElement?.classList.add('bg-primary-dark');
  }}
/>
```

### Missing Category Data

**Scenario:** Required category data is missing or undefined

**Handling Strategy:**
1. Use optional chaining when accessing category properties
2. Provide default values for optional fields
3. Filter out invalid categories before rendering
4. Log warning for missing data (development only)

**Implementation:**
```typescript
const validCategories = categories.filter(cat => 
  cat && cat.id && cat.title && cat.arabicTitle && cat.imagePath
);
```

### Swiper Initialization Failure

**Scenario:** Swiper library fails to initialize or no featured categories available

**Handling Strategy:**
1. Check if featuredCategories array has items before rendering swiper
2. If empty, render a fallback static card instead
3. Wrap swiper in error boundary to catch React errors
4. Provide graceful degradation to static content

**Implementation:**
```typescript
{featuredCategories.length > 0 ? (
  <FeaturedCategoriesSwiper categories={featuredCategories} />
) : (
  <CategoryCard variant="large" {...fallbackCategory} />
)}
```

### Locale Resolution Errors

**Scenario:** Locale parameter is missing or invalid

**Handling Strategy:**
1. Default to 'en' if locale is undefined
2. Validate locale against supported locales ['en', 'ar']
3. Use fallback text if translation key is missing
4. Log warning for unsupported locale (development only)

**Implementation:**
```typescript
const locale = params?.locale && ['en', 'ar'].includes(params.locale) 
  ? params.locale 
  : 'en';
```

### Navigation Control Errors

**Scenario:** Custom navigation buttons fail to connect with Swiper instance

**Handling Strategy:**
1. Use Swiper's built-in navigation module with custom selectors
2. Verify navigation elements exist in DOM before Swiper initialization
3. Fallback to pagination dots if navigation buttons fail
4. Ensure navigation works with keyboard as alternative

**Implementation:**
```typescript
navigation={{
  nextEl: '.swiper-button-next-custom',
  prevEl: '.swiper-button-prev-custom',
  disabledClass: 'opacity-50 cursor-not-allowed'
}}
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of category data rendering
- Edge cases (empty arrays, missing fields, invalid locales)
- Integration between components (page → swiper → CategoryCard)
- Error handling scenarios (image load failures, missing data)

**Property-Based Tests** focus on:
- Universal properties that hold for all category data
- Data structure validation across all categories
- Locale handling for any supported language
- Image path format validation for all categories

### Property-Based Testing Configuration

**Library:** fast-check (for TypeScript/JavaScript)

**Configuration:**
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `Feature: featured-categories-swiper, Property {number}: {property_text}`

**Example Test Structure:**
```typescript
import fc from 'fast-check';

describe('Feature: featured-categories-swiper', () => {
  it('Property 1: Image Path Validity', () => {
    fc.assert(
      fc.property(
        fc.array(categoryArbitrary),
        (categories) => {
          categories.forEach(cat => {
            expect(cat.imagePath).toMatch(/^\/categories\/.+\.webp$/);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage Areas

1. **Component Rendering**
   - FeaturedCategoriesSwiper renders with valid props
   - CategoryCard receives correct props from swiper
   - Navigation buttons render with correct ARIA labels
   - Pagination dots render and are clickable

2. **Data Integration**
   - getFeaturedCategories() returns only categories with isFeatured=true
   - getCategoryById() returns correct category or undefined
   - All 17 category images are included in categories array
   - Category data structure matches TypeScript interface

3. **Locale Handling**
   - Arabic locale displays arabicTitle
   - English locale displays title
   - RTL direction applied for Arabic
   - Navigation icons reversed for RTL

4. **Error Scenarios**
   - Image load failure triggers fallback
   - Empty featured categories array handled gracefully
   - Invalid locale defaults to English
   - Missing optional fields don't break rendering

5. **Grid Layout**
   - Swiper container has correct grid classes (md:col-span-2 md:row-span-2)
   - Grid container has responsive column classes
   - Gap and auto-rows classes preserved
   - All cards maintain rounded-[24px] styling

### Integration Test Scenarios

1. **Full Page Render**
   - Homepage renders with swiper and static cards
   - All category images load successfully
   - Swiper auto-advances after configured delay
   - Navigation controls respond to user interaction

2. **Locale Switching**
   - Switching from English to Arabic updates all text
   - RTL direction applied correctly
   - Navigation direction reversed
   - No layout breaks during transition

3. **Responsive Behavior**
   - Mobile view shows single column
   - Tablet view shows 3 columns
   - Desktop view shows 4 columns
   - Swiper maintains aspect ratio across breakpoints

### Performance Testing

1. **Image Loading**
   - All images use webp format for optimization
   - Lazy loading applied to non-visible slides
   - First slide loads eagerly
   - No layout shift during image load

2. **Animation Performance**
   - Swiper transitions run at 60fps
   - No jank during auto-advance
   - Smooth hover effects on cards
   - Navigation button transitions smooth

### Accessibility Testing

1. **Keyboard Navigation**
   - Tab through navigation controls
   - Arrow keys navigate slides
   - Enter/Space activate buttons
   - Focus indicators visible

2. **Screen Reader**
   - ARIA labels announced correctly
   - Slide changes announced
   - Image alt text descriptive
   - Navigation instructions clear

3. **WCAG Compliance**
   - Color contrast meets AA standards
   - Touch targets minimum 44x44px
   - Focus indicators visible
   - No keyboard traps
