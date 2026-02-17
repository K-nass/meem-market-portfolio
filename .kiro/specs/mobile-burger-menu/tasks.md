# Implementation Plan: Mobile Burger Menu

## Overview

This implementation plan converts the mobile burger menu design into discrete coding tasks. The approach focuses on creating a client component for interactive elements while keeping the main Navbar as a server component. Each task builds incrementally, with property-based tests integrated close to implementation to catch errors early.

## Tasks

- [x] 1. Create MobileMenu client component with basic structure
  - Create new file `app/components/Home/MobileMenu.tsx` with 'use client' directive
  - Define TypeScript interface for MobileMenuProps (translations object and locale string)
  - Set up component skeleton with props destructuring
  - Add useState hook for isOpen state (boolean, initially false)
  - Export component as default
  - _Requirements: 9.2, 9.3_

- [ ] 2. Implement burger button with state management
  - [x] 2.1 Create burger button element with click handler
    - Add button element with onClick that toggles isOpen state
    - Add conditional rendering for menu icon (closed) vs close icon (open)
    - Use Material Icons: 'menu' when closed, 'close' when open
    - Apply Tailwind classes matching existing navbar button style
    - Add conditional aria-label: translations.menu when closed, translations.close when open
    - _Requirements: 1.3, 1.4, 5.5, 6.1_
  
  - [ ]* 2.2 Write property test for menu toggle behavior
    - **Property 2: Menu toggle behavior**
    - **Validates: Requirements 1.3, 1.4**
  
  - [ ]* 2.3 Write property test for button icon state
    - **Property 9: Button icon reflects menu state**
    - **Validates: Requirements 5.5**
  
  - [ ]* 2.4 Write property test for ARIA label state
    - **Property 10: ARIA label reflects menu state**
    - **Validates: Requirements 6.1**

- [ ] 3. Implement overlay component with Framer Motion
  - [x] 3.1 Add Framer Motion AnimatePresence and motion.div for overlay
    - Import AnimatePresence and motion from 'framer-motion'
    - Wrap overlay in AnimatePresence with conditional rendering based on isOpen
    - Create motion.div with fixed positioning covering full viewport
    - Add onClick handler that calls setIsOpen(false)
    - Add aria-hidden="true" attribute
    - Apply Tailwind classes: fixed inset-0 bg-black/50 z-40
    - Define animation variants: hidden (opacity: 0), visible (opacity: 1)
    - Set transition duration to 200ms
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 6.7_
  
  - [ ]* 3.2 Write property test for overlay visibility
    - **Property 5: Overlay visibility matches menu state**
    - **Validates: Requirements 3.1, 3.3**
  
  - [ ]* 3.3 Write property test for overlay click behavior
    - **Property 6: Overlay click closes menu**
    - **Validates: Requirements 3.2**

- [ ] 4. Implement menu panel with navigation items
  - [x] 4.1 Create menu panel with Framer Motion slide animation
    - Create motion.div for menu panel with fixed positioning
    - Calculate slide direction based on locale: from right if 'ar', from left if 'en'
    - Define animation variants with x translation: '-100%' or '100%' for hidden, '0%' for visible
    - Set transition duration to 300ms with ease-out for opening, ease-in for closing
    - Apply Tailwind classes: fixed top-0 h-full w-[280px] bg-white/80 backdrop-blur-xl z-50
    - Add role="dialog" and aria-modal="true" attributes
    - Position on right if locale is 'ar', left if locale is 'en'
    - _Requirements: 4.3, 4.4, 5.1, 5.2, 6.2, 7.1, 7.2_
  
  - [x] 4.2 Add logo to menu panel
    - Add logo image at top of menu panel
    - Use same logo source as main navbar: /meem-logo.png
    - Apply padding and styling consistent with design
    - _Requirements: 7.4_
  
  - [x] 4.3 Create navigation items list
    - Define navigationItems array with objects: { key, href }
    - Include all six items: home (/), offers (#), aboutUs (#), ourProducts (#), ourBranches (#), careers (/career)
    - Map over navigationItems to render Link components from '@/i18n/navigation'
    - Use translations[item.key] for link text
    - Add onClick handler to each link that calls setIsOpen(false)
    - Apply Tailwind classes matching desktop menu hover effects
    - Add appropriate padding and spacing between items
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 4.5, 7.3, 7.5_
  
  - [ ]* 4.4 Write property test for navigation items completeness
    - **Property 3: Navigation items completeness**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  
  - [ ]* 4.5 Write property test for navigation closes menu
    - **Property 4: Navigation closes menu**
    - **Validates: Requirements 2.4**
  
  - [ ]* 4.6 Write property test for correct translations
    - **Property 7: Correct translations for locale**
    - **Validates: Requirements 4.1, 4.2, 4.5**
  
  - [ ]* 4.7 Write property test for slide direction
    - **Property 8: Slide direction matches locale**
    - **Validates: Requirements 4.3, 4.4**
  
  - [ ]* 4.8 Write property test for dialog ARIA attributes
    - **Property 11: Dialog ARIA attributes when open**
    - **Validates: Requirements 6.2**

- [x] 5. Checkpoint - Ensure basic menu functionality works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Add keyboard and accessibility features
  - [x] 6.1 Implement Escape key handler
    - Add useEffect hook that listens for keydown events
    - Check if key is 'Escape' and isOpen is true
    - Call setIsOpen(false) when Escape is pressed
    - Clean up event listener on unmount
    - _Requirements: 6.4_
  
  - [x] 6.2 Implement focus management
    - Add useRef for first navigation item
    - Add useEffect that runs when isOpen changes to true
    - Set focus to first navigation item when menu opens
    - Handle case where ref is null gracefully
    - _Requirements: 6.5_
  
  - [ ]* 6.3 Write property test for Escape key behavior
    - **Property 12: Escape key closes menu**
    - **Validates: Requirements 6.4**
  
  - [ ]* 6.4 Write property test for focus on open
    - **Property 13: First item receives focus on open**
    - **Validates: Requirements 6.5**

- [ ] 7. Implement body scroll lock
  - [x] 7.1 Add useEffect for body scroll management
    - Add useEffect that runs when isOpen changes
    - When isOpen is true, add 'overflow-hidden' class to document.body
    - When isOpen is false, remove 'overflow-hidden' class from document.body
    - Clean up on unmount by removing class
    - _Requirements: 8.2, 8.3_
  
  - [ ]* 7.2 Write property test for body scroll lock
    - **Property 14: Body scroll lock matches menu state**
    - **Validates: Requirements 8.2, 8.3**

- [ ] 8. Implement responsive behavior and resize handling
  - [x] 8.1 Add resize event listener to close menu at desktop breakpoint
    - Add useEffect that listens for window resize events
    - Check if window.innerWidth >= 1024 (Desktop_Breakpoint)
    - If true and isOpen is true, call setIsOpen(false)
    - Debounce resize handler to avoid excessive calls
    - Clean up event listener on unmount
    - _Requirements: 8.5_
  
  - [x] 8.2 Add responsive visibility classes to burger button
    - Add 'lg:hidden' class to burger button to hide at desktop breakpoint
    - Ensure button is visible below lg breakpoint
    - _Requirements: 1.1, 1.2_
  
  - [ ]* 8.3 Write property test for responsive visibility
    - **Property 1: Burger button responsive visibility**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 8.4 Write property test for resize behavior
    - **Property 15: Resize closes menu at desktop breakpoint**
    - **Validates: Requirements 8.5**

- [x] 9. Checkpoint - Ensure all interactive features work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Integrate MobileMenu into Navbar server component
  - [x] 10.1 Update Navbar component to use MobileMenu
    - Import MobileMenu component in Navbar.tsx
    - Prepare translations object with all required keys (home, offers, aboutUs, ourProducts, ourBranches, careers, menu, close)
    - Pass translations and locale as props to MobileMenu component
    - Replace existing mobile menu button placeholder with MobileMenu component
    - Ensure Navbar remains a server component (no 'use client' directive)
    - _Requirements: 9.1, 9.3, 9.4_
  
  - [ ]* 10.2 Write unit tests for component integration
    - Test that Navbar passes correct props to MobileMenu
    - Test that Navbar remains a server component
    - Test that MobileMenu is a client component
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 11. Add translation keys to message files
  - [x] 11.1 Update English translation file
    - Open messages/en.json
    - Add 'menu' key with value 'Menu'
    - Add 'close' key with value 'Close'
    - Verify all navigation keys exist (home, offers, aboutUs, ourProducts, ourBranches, careers)
    - _Requirements: 4.2, 6.1_
  
  - [x] 11.2 Update Arabic translation file
    - Open messages/ar.json
    - Add 'menu' key with Arabic value 'القائمة'
    - Add 'close' key with Arabic value 'إغلاق'
    - Verify all navigation keys exist in Arabic
    - _Requirements: 4.1, 6.1_

- [ ] 12. Final checkpoint - Complete end-to-end testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify menu works correctly in both Arabic and English
  - Test on mobile viewport sizes
  - Verify animations are smooth
  - Test keyboard navigation and accessibility

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation at key milestones
- The implementation uses Framer Motion for animations (already in dependencies)
- The implementation uses fast-check for property-based testing
- All interactive elements are in the client component while Navbar remains a server component
