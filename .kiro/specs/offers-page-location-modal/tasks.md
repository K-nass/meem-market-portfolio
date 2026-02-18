# Implementation Plan: Offers Page Location Modal

## Overview

This implementation plan breaks down the location-based branch filtering system into discrete coding tasks. The approach follows a bottom-up strategy: building individual components first, then integrating them into the hero swiper, and finally removing the legacy sidebar.

## Tasks

- [x] 1. Create base modal infrastructure
  - Create `app/components/LocationModal` directory
  - Create `LocationModal.tsx` with modal container, backdrop, and close functionality
  - Implement modal state management (open/close, escape key, backdrop click)
  - Add body scroll lock when modal is open
  - Style modal with backdrop blur, responsive sizing (full screen mobile, centered desktop)
  - _Requirements: 2.1, 2.3, 2.4, 2.5_

- [x] 2. Create LocationCircle component
  - Create `LocationCircle.tsx` in `app/components/LocationModal`
  - Implement circular button with location flag and name display
  - Add click handler to trigger modal opening
  - Style with gradient background, shadow, hover effects (scale 1.05)
  - Make responsive (80px mobile, 100px desktop)
  - Add keyboard accessibility (focusable, Enter/Space activation)
  - _Requirements: 1.1, 1.3, 1.4, 2.1_

- [x] 3. Create StepIndicator component
  - Create `StepIndicator.tsx` in `app/components/LocationModal`
  - Display 2 steps: "Select Branch" and "Choose Action"
  - Implement active, completed, and inactive step styling
  - Add step connector lines between steps
  - Make responsive (horizontal desktop, vertical mobile)
  - Support RTL layout
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 4. Create BranchSelectionStep component
  - Create `BranchSelectionStep.tsx` in `app/components/LocationModal`
  - Filter branches by selected locationId
  - Display branches as clickable cards in grid layout (1 col mobile, 2 col tablet, 3 col desktop)
  - Show branch name and city in current locale
  - Handle branch selection click to advance to step 2
  - Add hover effects and keyboard navigation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 5. Create ActionSelectionStep component
  - Create `ActionSelectionStep.tsx` in `app/components/LocationModal`
  - Display 3 action cards: Location (map icon), Contact & Social (contact icon), Offers (offers icon)
  - Use Material Icons for action icons (location_on, contact_phone, local_offer)
  - Implement grid layout (1 col mobile, 3 col desktop)
  - Handle action selection click
  - Style cards with gradient/shadow, hover effects (scale 1.03)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Create LocationMapView component
  - Create `LocationMapView.tsx` in `app/components/LocationModal`
  - Install and configure react-leaflet and leaflet dependencies
  - Implement MapContainer with OpenStreetMap tiles
  - Center map on branch coordinates
  - Display marker at branch location with popup
  - Show branch address below map
  - Handle missing coordinates with fallback UI (location_off icon + address text)
  - Make map responsive (400px desktop, 300px mobile)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7. Create ContactSocialView component
  - Create `ContactSocialView.tsx` in `app/components/LocationModal`
  - Display branch phone number as clickable tel: link (if available)
  - Display branch operating hours (if available)
  - Create social media links grid with 5 platforms (Instagram, Twitter/X, Facebook, WhatsApp, TikTok)
  - Style social buttons as circular icons with brand colors
  - Add decorative background pattern for social section
  - Add hover effects on social buttons (scale 1.1)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 8. Integrate modal flow logic
  - Update `LocationModal.tsx` to manage step state (1 or 2)
  - Implement step transitions: branch selection → step 2, action selection → view
  - Handle offers action: construct URL with locale, location name, branch name
  - Implement redirect to offers page with URL parameters
  - Close modal after offers redirect
  - Handle back navigation between steps
  - _Requirements: 3.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 9. Add internationalization support
  - Add translation keys to `messages/en.json` for modal content
  - Add translation keys to `messages/ar.json` for modal content
  - Include keys for: step labels, action titles/descriptions, error messages, labels
  - Ensure all components use `useTranslations` hook
  - Test locale switching updates all modal content
  - Verify RTL layout works correctly in Arabic
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 10. Integrate LocationCircles into HeroSwiper
  - Modify `app/components/HeroSwiper.tsx` to add location circles
  - Import locations data from `app/data/branches.ts`
  - Add modal state management (isOpen, selectedLocationId)
  - Position location circles in right side of hero overlay
  - Render LocationCircle components for Saudi Arabia and Kuwait
  - Pass click handler to open modal with selected locationId
  - Render LocationModal when isOpen is true
  - _Requirements: 1.1, 1.2, 1.5, 2.1, 2.2_

- [x] 11. Remove legacy BranchFilterSidebar
  - Remove BranchFilterSidebar import from `app/[locale]/page.tsx`
  - Remove desktop BranchFilterSidebar instance from home page layout
  - Remove mobile/tablet BranchFilterSidebar instance from home page layout
  - Remove container div for sidebar positioning
  - Verify LocationFilter on offers page remains unchanged
  - Test that home page renders correctly without sidebar
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 12. Checkpoint - Verify complete flow
  - Ensure location circle click opens modal
  - Ensure branch selection advances to step 2
  - Ensure all 3 actions work correctly (map, contact, offers)
  - Ensure offers redirect includes correct URL parameters
  - Ensure modal closes on backdrop click, escape key, and close button
  - Ask the user if questions arise.

- [ ] 13. Polish and premium styling
  - Apply smooth animations to modal open/close (200-300ms)
  - Add backdrop blur effect to modal overlay
  - Refine location circle styling (shadows, gradients)
  - Ensure consistent spacing and typography throughout modal
  - Add loading states for map component
  - Test hover effects on all interactive elements
  - Verify premium visual design meets requirements
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

## Notes

- Each task builds on previous tasks for incremental progress
- Modal components are self-contained and can be developed independently
- Integration happens in steps 8 and 10
- Legacy removal (step 11) happens after new system is working
- Checkpoint (step 12) verifies functionality before final polish
- No tests required per user specification
- Focus on production-grade UI/UX throughout implementation
