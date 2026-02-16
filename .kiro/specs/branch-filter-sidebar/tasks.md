# Implementation Plan: Branch Filter Sidebar

## Overview

This implementation plan breaks down the Branch Filter Sidebar feature into discrete, incremental coding tasks. Each task builds on previous work, with testing integrated throughout to catch errors early. The implementation follows a bottom-up approach: data models → core components → integration → responsive behavior → accessibility.

## Tasks

- [x] 1. Set up data models and types
  - Create TypeScript interfaces for Location and Branch models
  - Create translation keys in messages/en.json and messages/ar.json
  - Add sample data for locations and branches (Saudi Arabia and Kuwait)
  - _Requirements: 1.1, 2.1_

- [ ] 2. Implement LocationSelector component
  - [x] 2.1 Create LocationSelector component with props interface
    - Implement radio button group UI for location selection
    - Add click handlers for location selection
    - Apply brand colors and styling (primary, gold, background-light)
    - _Requirements: 1.1, 1.2, 1.3, 8.1, 8.2, 8.3_

  - [ ]* 2.2 Write property test for LocationSelector
    - **Property 2: Selection State Visual Indicators**
    - **Validates: Requirements 1.3**

  - [ ]* 2.3 Write unit tests for LocationSelector
    - Test initial render with multiple locations
    - Test selection state changes
    - Test brand color application
    - _Requirements: 1.1, 1.3, 8.1_

- [ ] 3. Implement BranchList component
  - [x] 3.1 Create BranchList component with props interface
    - Implement scrollable list UI for branches
    - Add click handlers for branch selection
    - Apply styling with custom scrollbar
    - Add max-height and overflow-y-auto for scrolling
    - _Requirements: 2.1, 2.4, 3.1, 3.2_

  - [ ]* 3.2 Write property test for BranchList
    - **Property 6: Single Branch Selection**
    - **Validates: Requirements 3.3, 3.4**

  - [ ]* 3.3 Write unit tests for BranchList
    - Test branch list rendering
    - Test scrolling with more than 5 branches (edge case)
    - Test empty branch list
    - _Requirements: 2.1, 2.4, 2.5_

- [x] 4. Implement LoadingIndicator and ErrorDisplay components
  - Create LoadingIndicator component with spinner animation
  - Create ErrorDisplay component with retry functionality
  - Apply brand colors and styling
  - _Requirements: 5.2, 5.4_

- [ ] 5. Implement main BranchFilterSidebar container
  - [x] 5.1 Create BranchFilterSidebar component with state management
    - Set up useState hooks for selectedLocation, selectedBranch, isOpen
    - Implement handleLocationSelect method
    - Implement handleBranchSelect method
    - Implement getFilteredBranches method
    - Wire LocationSelector and BranchList components together
    - _Requirements: 1.2, 1.4, 3.1, 4.1, 4.2, 4.3_

  - [ ]* 5.2 Write property test for location selection clearing branch
    - **Property 3: Location Switch Clears Branch Selection**
    - **Validates: Requirements 1.4, 4.5**

  - [ ]* 5.3 Write property test for branch filtering
    - **Property 5: Branch Filtering by Location**
    - **Validates: Requirements 2.1**

  - [ ]* 5.4 Write property test for state updates
    - **Property 7: Branch Selection Updates State**
    - **Property 9: Location Selection Updates State**
    - **Validates: Requirements 3.1, 4.1, 4.2**

  - [ ]* 5.5 Write property test for callback invocation
    - **Property 10: State Changes Trigger Callbacks**
    - **Validates: Requirements 4.3, 5.1**

- [ ] 6. Checkpoint - Ensure core functionality works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement localization support
  - [x] 7.1 Add next-intl integration to BranchFilterSidebar
    - Use useTranslations hook for all text content
    - Display location and branch names based on current locale
    - Add dir attribute based on locale (rtl for Arabic, ltr for English)
    - Apply font-family based on locale (Almarai for Arabic, Inter for English)
    - _Requirements: 1.5, 2.3, 7.1, 7.2, 7.3, 7.4, 8.4_

  - [ ]* 7.2 Write property test for localization
    - **Property 4: Localization Displays Correct Language**
    - **Validates: Requirements 1.5, 2.3, 7.1, 7.2**

  - [ ]* 7.3 Write property test for RTL layout
    - **Property 11: RTL Layout Based on Locale**
    - **Validates: Requirements 7.3, 7.4**

  - [ ]* 7.4 Write unit tests for localization
    - Test Arabic locale rendering
    - Test English locale rendering
    - Test RTL layout application
    - Test font family application
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.4_

- [ ] 8. Implement responsive design
  - [x] 8.1 Add responsive layout logic
    - Create useResponsive custom hook for breakpoint detection
    - Implement desktop layout (fixed sidebar, w-80, always visible)
    - Implement tablet layout (collapsible sidebar with toggle)
    - Implement mobile layout (bottom sheet modal)
    - Add backdrop overlay for mobile/tablet when open
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

  - [ ] 8.2 Create mobile toggle button component
    - Add floating action button for mobile/tablet
    - Implement toggleSidebar method
    - Position button appropriately for each breakpoint
    - _Requirements: 6.4_

  - [ ]* 8.3 Write unit tests for responsive behavior
    - Test desktop layout rendering
    - Test tablet layout with toggle
    - Test mobile bottom sheet
    - Test toggle button visibility
    - Test backdrop overlay
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9. Implement animations and transitions
  - [x] 9.1 Add CSS transitions for interactive elements
    - Add 300ms transitions for sidebar open/close
    - Add 200ms transitions for selection state changes
    - Add 200ms transitions for hover effects
    - Use cubic-bezier easing functions
    - _Requirements: 8.5, 10.1, 10.2, 10.3, 10.4_

  - [ ]* 9.2 Write property test for selection transitions
    - **Property 16: Selection Transitions**
    - **Validates: Requirements 10.2**

  - [ ]* 9.3 Write property test for hover effects
    - **Property 17: Hover Effects on Interactive Elements**
    - **Validates: Requirements 10.4**

  - [ ]* 9.4 Write unit tests for animations
    - Test sidebar open/close animation timing
    - Test branch list expansion animation
    - Test transition properties
    - _Requirements: 8.5, 10.1, 10.3_

- [ ] 10. Implement accessibility features
  - [x] 10.1 Add keyboard navigation support
    - Ensure all interactive elements are focusable
    - Add keyboard event handlers (Enter, Space, Tab)
    - Implement focus management
    - Add visible focus indicators
    - _Requirements: 9.1, 9.2, 9.6_

  - [x] 10.2 Add ARIA attributes
    - Add aria-pressed to location and branch buttons
    - Add aria-label to toggle button
    - Add aria-live region for dynamic content updates
    - Add role attributes where appropriate
    - _Requirements: 9.3, 9.4_

  - [ ]* 10.3 Write property test for keyboard navigation
    - **Property 12: Keyboard Navigation Through Interactive Elements**
    - **Validates: Requirements 9.1, 9.2**

  - [ ]* 10.4 Write property test for ARIA labels
    - **Property 13: ARIA Labels on Interactive Elements**
    - **Validates: Requirements 9.3**

  - [ ]* 10.5 Write property test for focus indicators
    - **Property 15: Focus Indicators on Focusable Elements**
    - **Validates: Requirements 9.6**

  - [ ]* 10.6 Write property test for contrast ratios
    - **Property 14: Text Contrast Ratio Compliance**
    - **Validates: Requirements 9.5**

  - [ ]* 10.7 Run automated accessibility tests
    - Use jest-axe to verify WCAG 2.1 AA compliance
    - Test with screen reader simulation
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 11. Checkpoint - Ensure accessibility and responsive design work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Integrate BranchFilterSidebar into landing page
  - [x] 12.1 Add BranchFilterSidebar to app/[locale]/page.tsx
    - Import BranchFilterSidebar component
    - Position after Hero component with proper spacing
    - Add state management for selectedBranch in page component
    - Implement handleBranchChange callback
    - Add content offset for desktop layout (ml-80)
    - _Requirements: 12.1, 12.2, 12.3_

  - [ ] 12.2 Implement data fetching logic
    - Create fetchBranchOffers function (mock or real API)
    - Add loading state management
    - Add error handling
    - Update page content based on selected branch
    - _Requirements: 5.1, 5.3_

  - [ ]* 12.3 Write integration tests
    - Test sidebar integration with page
    - Test data fetching on branch selection
    - Test loading and error states
    - Test content updates
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 13. Add state persistence (optional enhancement)
  - [ ] 13.1 Implement session storage for selected branch
    - Save selectedBranch to sessionStorage on change
    - Load selectedBranch from sessionStorage on mount
    - _Requirements: 3.5_

  - [ ]* 13.2 Write property test for state persistence
    - **Property 8: State Persistence Across Re-renders**
    - **Validates: Requirements 3.5**

- [ ] 14. Polish and refinement
  - [x] 14.1 Add custom scrollbar styling
    - Style webkit scrollbar for branch list
    - Ensure scrollbar matches brand colors
    - _Requirements: 2.4_

  - [x] 14.2 Add sticky positioning for desktop
    - Apply sticky positioning to sidebar on desktop
    - Ensure sidebar stays visible during scroll
    - _Requirements: 12.5_

  - [ ]* 14.3 Write unit tests for positioning
    - Test positioning after Hero component
    - Test spacing and alignment
    - Test sticky positioning
    - _Requirements: 12.1, 12.2, 12.3, 12.5_

- [ ] 15. Final checkpoint - Comprehensive testing
  - Run all unit tests and property tests
  - Verify all 17 correctness properties pass
  - Test manually on different devices and browsers
  - Verify RTL layout in Arabic
  - Verify accessibility with keyboard navigation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples, edge cases, and visual design
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- The implementation follows a bottom-up approach for better testability
- All components should use TypeScript for type safety
- All styling should use Tailwind CSS with custom theme variables
- All text should use next-intl for localization
