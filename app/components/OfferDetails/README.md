# Offer Details Components

This folder contains reusable components for the offer detail page.

## Components

### OfferDetailHero
Displays the page title, location, branch, and status badge at the top of the offer detail page.

**Props:**
- `title`: string - Page title
- `location`: string - Location/country name
- `branch`: string - Branch name
- `status`: string - Offer status text

### OfferCategoryFilter
A horizontal scrollable filter bar with category buttons. Client component with state management.

**Props:**
- `categories`: Category[] - Array of category objects with id, label, and optional icon
- `activeCategory`: string - Initially active category ID

### OfferImageGallery
Displays offer images in a grid with modal zoom functionality. Client component.

**Props:**
- `title`: string - Offer title
- `category`: string - Category name
- `images`: string[] - Array of image URLs

**Features:**
- Click to zoom/enlarge images
- Modal overlay with close button
- Responsive grid layout

### RelatedOffers
Shows related offers in a grid with links to their detail pages.

**Props:**
- `currentOfferId`: string - ID of the current offer (to exclude from related offers)

## Usage

```tsx
import {
  OfferDetailHero,
  OfferCategoryFilter,
  OfferImageGallery,
  RelatedOffers
} from '@/app/components/OfferDetails';

// Or import individually
import OfferDetailHero from '@/app/components/OfferDetails/OfferDetailHero';
```

## Page Structure

The offer detail page (`app/[locale]/offers/[id]/page.tsx`) is a server component that:
1. Fetches offer data based on the ID parameter
2. Returns 404 if offer not found
3. Renders the hero, category filter, image gallery, and related offers
