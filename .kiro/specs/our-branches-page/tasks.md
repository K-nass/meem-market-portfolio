# Implementation Plan: Our Branches Page

## Overview

This implementation plan breaks down the "Our Branches" page feature into discrete coding tasks. The page will display all Meem market branches with filtering, an interactive map, and full internationalization support. Each task builds incrementally on previous work, with testing integrated throughout.

## Tasks

- [x] 1. Set up translation files and route structure
  - Create translation keys in `messages/en.json` and `messages/ar.json` for branches page
  - Add keys: title, subtitle, filterAll, filterKuwait, filterSaudiArabia, noBranchesFound, phone, hours, openingHours, mapLoadError, selectBranch
  - Create page route at `app/[locale]/branches/page.tsx`
  - Set up basic page structure with locale validation
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 2. Create BranchesPageHeader component
  - [x] 2.1 Implement BranchesPageHeader component
    - Create `app/components/Branches/BranchesPageHeader.tsx`
    - Accept title and subtitle props
    - Apply responsive typography and spacing
    - Support RTL/LTR layouts
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
  
  - [ ]* 2.2 Write unit tests for BranchesPageHeader
    - Test component renders with provided title and subtitle
    - Test responsive styling classes are applied
    - _Requirements: 2.1, 2.4_

- [ ] 3. Create BranchesFilterTabs component
  - [x] 3.1 Implement BranchesFilterTabs component
    - Create `app/components/Branches/BranchesFilterTabs.tsx`
    - Define FilterOption type ('all' | 'kuwait' | 'saudi-arabia')
    - Render three tabs with localized labels
    - Manage active tab visual state
    - Handle click events and emit filter changes
    - Add keyboard navigation (Tab, Enter, Space)
    - Add ARIA attributes (role="tablist", role="tab", aria-selected)
    - _Requirements: 3.1, 3.6, 3.7, 3.8, 9.1, 9.2_
  
  - [ ]* 3.2 Write unit tests for BranchesFilterTabs
    - Test all three tabs render with correct labels
    - Test active tab has correct styling
    - Test click handler is called with correct filter value
    - Test keyboard navigation works (Enter and Space keys)
    - Test ARIA attributes are present
    - _Requirements: 3.1, 3.6, 9.1, 9.2_
  
  - [ ]* 3.3 Write property test for filter tab accessibility
    - **Property 12: Filter tab accessibility**
    - **Validates: Requirements 7.4, 9.1, 9.2**
    - Generate random filter states
    - Test that all tabs are keyboard navigable and have ARIA attributes

- [ ] 4. Create BranchCard component
  - [x] 4.1 Implement BranchCard component
    - Create `app/components/Branches/BranchCard.tsx`
    - Display branch name, address, city in current locale
    - Conditionally display phone number if present
    - Conditionally display operating hours if present
    - Apply selected state styling
    - Handle click events
    - Add keyboard interaction (Enter, Space)
    - Use semantic HTML (article, h3, p tags)
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7, 9.4_
  
  - [ ]* 4.2 Write unit tests for BranchCard
    - Test branch name, address, city display in correct locale
    - Test phone displays when present, hidden when absent
    - Test hours display when present, hidden when absent
    - Test selected state styling
    - Test click handler is called
    - Test keyboard interaction
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ]* 4.3 Write property test for optional field display
    - **Property 4: Optional field conditional display**
    - **Validates: Requirements 5.6, 5.7**
    - Generate branches with and without phone/hours
    - Test fields display if and only if defined

- [ ] 5. Create BranchesList component
  - [x] 5.1 Implement BranchesList component
    - Create `app/components/Branches/BranchesList.tsx`
    - Accept branches array, selectedBranch, onBranchSelect, locale props
    - Render list of BranchCard components
    - Display empty state when branches array is empty
    - Apply scrollable container styling
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 7.6_
  
  - [ ]* 5.2 Write unit tests for BranchesList
    - Test list renders all branches
    - Test empty state displays when no branches
    - Test selected branch is highlighted
    - Test onBranchSelect is called when card is clicked
    - _Requirements: 5.1, 5.2_
  
  - [ ]* 5.3 Write property test for branch data localization
    - **Property 3: Branch data localization**
    - **Validates: Requirements 5.3, 5.4, 5.5, 6.5**
    - Generate random branches and locales
    - Test that displayed values match branch data for current locale

- [x] 6. Checkpoint - Ensure list components work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Install and configure Leaflet map library
  - Install dependencies: `leaflet`, `react-leaflet`, `@types/leaflet`
  - Create Leaflet CSS import in layout or global styles
  - Add Leaflet attribution and tile layer configuration
  - _Requirements: 4.1_

- [ ] 8. Create BranchesMap component
  - [x] 8.1 Implement BranchesMap component with error handling
    - Create `app/components/Branches/BranchesMap.tsx`
    - Import MapContainer, TileLayer, Marker, Popup from react-leaflet
    - Filter branches to only those with valid coordinates
    - Calculate map center from branch coordinates
    - Calculate map bounds to fit all markers
    - Render markers for each branch with coordinates
    - Display popup with branch info on marker click
    - Implement error boundary for map loading failures
    - Display error message and retry button on failure
    - Make component client-side only (use dynamic import with ssr: false)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6, 4.7_
  
  - [ ]* 8.2 Write unit tests for BranchesMap
    - Test map renders with correct center and bounds
    - Test markers render for branches with coordinates
    - Test branches without coordinates are excluded
    - Test error boundary displays error message
    - _Requirements: 4.2, 4.3_
  
  - [ ]* 8.3 Write property test for coordinate filtering
    - **Property 5: Map marker coordinate filtering**
    - **Validates: Requirements 4.2, 4.3**
    - Generate branches with and without coordinates
    - Test that markers appear if and only if coordinates are defined
  
  - [ ]* 8.4 Write property test for map bounds calculation
    - **Property 7: Map bounds calculation**
    - **Validates: Requirements 4.6**
    - Generate random sets of branches with coordinates
    - Test that calculated bounds include all branch markers

- [ ] 9. Create BranchesContent container component
  - [~] 9.1 Implement BranchesContent component
    - Create `app/components/Branches/BranchesContent.tsx`
    - Manage activeFilter state (useState)
    - Manage selectedBranch state (useState)
    - Implement filterBranches function (all, kuwait, saudi-arabia)
    - Pass filtered branches to both map and list
    - Coordinate branch selection between map and list
    - Apply responsive layout (grid on desktop, stack on mobile)
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 4.5, 5.2, 5.8, 7.1, 7.3_
  
  - [ ]* 9.2 Write unit tests for BranchesContent
    - Test filter state updates when tab is clicked
    - Test filtered branches are passed to child components
    - Test branch selection synchronizes between map and list
    - Test responsive layout classes are applied
    - _Requirements: 3.2, 5.2, 5.8_
  
  - [ ]* 9.3 Write property test for filter behavior consistency
    - **Property 2: Filter behavior consistency**
    - **Validates: Requirements 3.2, 5.2, 4.5**
    - Generate random branch data with various locationIds
    - Test that filtering always returns correct subset for all filter options
  
  - [ ]* 9.4 Write property test for list update responsiveness
    - **Property 9: List update responsiveness**
    - **Validates: Requirements 5.8**
    - Generate random filter changes
    - Test that list updates without page reload

- [ ] 10. Integrate all components in main page
  - [~] 10.1 Complete branches page implementation
    - Import all components in `app/[locale]/branches/page.tsx`
    - Import branch data from `app/data/branches.ts`
    - Import location data from `app/data/branches.ts`
    - Fetch translations using getTranslations('branches')
    - Validate locale parameter (default to 'ar' if invalid)
    - Render BranchesPageHeader with translated title and subtitle
    - Render BranchesContent with branch data, locations, and locale
    - Apply page-level styling and layout
    - Set appropriate dir attribute based on locale (rtl for ar, ltr for en)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 6.3, 8.1, 8.2, 8.3, 8.4_
  
  - [ ]* 10.2 Write integration tests for branches page
    - Test page renders with all components
    - Test filter change updates both map and list
    - Test branch selection works from both map and list
    - Test locale switching updates all content
    - Test invalid locale defaults to 'ar'
    - _Requirements: 1.2, 3.2, 5.2, 6.6_
  
  - [ ]* 10.3 Write property test for locale-based content rendering
    - **Property 1: Locale-based content rendering**
    - **Validates: Requirements 1.2, 2.1, 2.4, 6.1**
    - Generate random locales (ar, en)
    - Test that all text content displays in corresponding language
  
  - [ ]* 10.4 Write property test for locale switching
    - **Property 10: Locale switching**
    - **Validates: Requirements 6.6**
    - Generate random locale changes
    - Test that page re-renders with new locale without reload
  
  - [ ]* 10.5 Write property test for data-driven rendering
    - **Property 11: Data-driven rendering**
    - **Validates: Requirements 8.4**
    - Generate random valid branch data arrays
    - Test that page renders all branches without code changes

- [~] 11. Checkpoint - Ensure full integration works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Add responsive design and styling
  - [~] 12.1 Implement responsive layouts
    - Add mobile styles (stacked layout, full-width map and list)
    - Add tablet styles (optimized medium screen layout)
    - Add desktop styles (side-by-side map and list)
    - Ensure filter tabs are accessible on all screen sizes
    - Make map responsive to viewport changes
    - Add scrollable overflow to branch list
    - Test on various screen sizes
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [ ]* 12.2 Write unit tests for responsive design
    - Test mobile layout classes are applied at small viewports
    - Test desktop layout classes are applied at large viewports
    - Test list has scrollable overflow
    - _Requirements: 7.1, 7.3, 7.6_
  
  - [ ]* 12.3 Write property test for responsive map sizing
    - **Property 13: Responsive map sizing**
    - **Validates: Requirements 7.5**
    - Generate random viewport sizes
    - Test that map container adjusts dimensions appropriately

- [ ] 13. Add accessibility enhancements
  - [~] 13.1 Implement accessibility features
    - Add ARIA live region for filter changes
    - Ensure semantic HTML throughout (header, main, nav, article)
    - Test keyboard navigation on all interactive elements
    - Verify color contrast meets WCAG standards
    - Add focus indicators for keyboard navigation
    - Test with screen reader (manual testing)
    - _Requirements: 9.1, 9.2, 9.4, 9.5, 9.6_
  
  - [ ]* 13.2 Write unit tests for accessibility
    - Test ARIA live region announces filter changes
    - Test semantic HTML elements are used
    - Test focus indicators are present
    - _Requirements: 9.4, 9.6_

- [ ] 14. Performance optimization
  - [~] 14.1 Implement performance optimizations
    - Add dynamic import for map component (ssr: false)
    - Implement React.memo for BranchCard to prevent unnecessary re-renders
    - Use useMemo for filtered branches calculation
    - Use useCallback for event handlers
    - Ensure map loads asynchronously
    - Test initial page load time
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [~] 15. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all 13 correctness properties are tested
  - Verify all requirements are covered
  - Test on multiple browsers (Chrome, Firefox, Safari)
  - Test on multiple devices (mobile, tablet, desktop)
  - Test with both Arabic and English locales
  - Verify RTL layout works correctly for Arabic
  - Verify LTR layout works correctly for English

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- Map component uses Leaflet (open-source, lightweight alternative to Google Maps)
- All components follow existing project patterns (TypeScript, Tailwind CSS, next-intl)
- Testing uses Jest and React Testing Library for unit tests, fast-check for property tests
