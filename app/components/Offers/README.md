# Offers Components

Reusable components for the Offers page following the Meem Market design system.

## Components

### OffersHero (Server Component)
Hero section for the offers page with location information.

**Props:**
- `title`: string - Main title
- `description`: string - Description text
- `badge`: string - Badge text (e.g., "Certified Exclusive Offers")
- `country`: string - Country name
- `city`: string - City name
- `branch`: string - Branch name

**Usage:**
```tsx
<OffersHero
  badge={t('hero.badge')}
  title={t('hero.title')}
  description={t('hero.description')}
  country={t('hero.country')}
  city={t('hero.city')}
  branch={t('hero.branch')}
/>
```

---

### LocationFilter (Client Component)
Interactive filter for selecting country, city, and branch.

**Props:**
- `countryLabel`: string - Label for country dropdown
- `cityLabel`: string - Label for city dropdown
- `branchLabel`: string - Label for branch dropdown
- `countries`: string[] - Array of country names
- `cities`: string[] - Array of city names
- `branches`: string[] - Array of branch names

**Usage:**
```tsx
<LocationFilter
  countryLabel={t('filter.countryLabel')}
  cityLabel={t('filter.cityLabel')}
  branchLabel={t('filter.branchLabel')}
  countries={['Saudi Arabia', 'UAE', 'Kuwait']}
  cities={['Riyadh', 'Jeddah', 'Dammam']}
  branches={['Main Branch', 'Branch 2']}
/>
```

---

### OfferCard (Server Component)
Versatile card component for displaying offers with multiple variants.

**Variants:**
- `large` - Large card with image overlay and gradient
- `medium` - Medium card with image and icon (default)
- `tech` - Tech-themed card with minimal design
- `minimal` - White background card with progress bar
- `flash` - Flash sale card with animated icon

**Props:**
- `variant?`: 'large' | 'medium' | 'small' | 'tech' | 'minimal' | 'flash'
- `title`: string - Card title
- `description?`: string - Card description
- `badge?`: string - Badge text
- `badgeColor?`: 'gold' | 'accent' | 'primary'
- `image?`: string - Image URL
- `icon?`: string - Material icon name
- `buttonText?`: string - Button text
- `buttonHref?`: string - Button link
- `progress?`: number - Progress percentage (0-100)
- `progressLabel?`: string - Progress label text

**Usage:**
```tsx
// Large variant
<OfferCard
  variant="large"
  badge="Seasonal Deals"
  badgeColor="gold"
  title="Winter Sale"
  description="Up to 40% off"
  image="/image.jpg"
  buttonText="Shop Now"
/>

// Minimal variant with progress
<OfferCard
  variant="minimal"
  title="Household Essentials"
  description="Family savings"
  icon="home_repair_service"
  progress={75}
  progressLabel="Offer ends soon"
  buttonText="View Products"
/>

// Flash variant
<OfferCard
  variant="flash"
  title="24-Hour Deals"
  description="Daily exclusive deals"
  icon="flash_on"
  buttonText="Download App"
/>
```

---

### WhyChooseSection (Server Component)
Section displaying features/benefits with icons.

**Props:**
- `title`: string - Section title
- `features`: Feature[] - Array of feature objects
  - `icon`: string - Material icon name
  - `title`: string - Feature title
  - `description`: string - Feature description

**Usage:**
```tsx
const features = [
  {
    icon: 'verified_user',
    title: 'Guaranteed Quality',
    description: 'We ensure the highest quality standards.',
  },
  {
    icon: 'local_shipping',
    title: 'Fast Delivery',
    description: 'Dedicated delivery services.',
  },
];

<WhyChooseSection title="Why Choose Us?" features={features} />
```

---

## Design System

### Colors (from globals.css)
- `--primary`: #124e91
- `--primary-dark`: #0b3666
- `--gold`: #f59e0b
- `--accent`: #16a34a
- `--background-light`: #f5f8fc

### Tailwind Classes
- Primary: `bg-primary`, `text-primary`
- Gold: `bg-gold`, `text-gold`
- Accent: `bg-accent`, `text-accent`

### Icons
Using Material Symbols Outlined from Google Fonts.

---

## Translation Keys

All text content uses `next-intl` translations under the `offersPage` namespace:

```json
{
  "offersPage": {
    "hero": { ... },
    "filter": { ... },
    "offers": {
      "seasonal": { ... },
      "fresh": { ... },
      "tech": { ... },
      "household": { ... },
      "gourmet": { ... },
      "flash": { ... }
    },
    "whyChoose": { ... }
  }
}
```

---

## Component Architecture

- **Server Components**: OffersHero, OfferCard, WhyChooseSection
  - Use `getTranslations` from `next-intl/server`
  - No client-side interactivity
  - Better performance

- **Client Components**: LocationFilter
  - Use `'use client'` directive
  - Handle user interactions
  - Manage local state

---

## Best Practices

1. Keep server components as the default
2. Only use client components when needed for interactivity
3. Use translations for all text content
4. Follow the existing color scheme from globals.css
5. Use Material Icons for consistency
6. Maintain responsive design with Tailwind classes
