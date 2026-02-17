# Design Document: Mobile Burger Menu

## Overview

The mobile burger menu feature will be implemented by extracting interactive elements from the existing server-rendered Navbar component into a new client component. This approach maintains the performance benefits of server-side rendering while enabling the interactivity required for the mobile menu.

The solution uses React hooks for state management, Framer Motion for smooth animations, and follows the existing design system with Tailwind CSS. The menu will slide in from the appropriate side based on locale (right for Arabic, left for English) with a semi-transparent overlay.

## Architecture

### Component Structure

```
Navbar (Server Component)
├── Logo
├── Desktop Menu (hidden on mobile)
├── Actions (Search, Find Store, Locale Switcher)
└── MobileMenu (Client Component)
    ├── Burger Button
    ├── Overlay
    └── Menu Panel
        ├── Logo
        ├── Navigation Items
        └── Close Button
```

### Component Responsibilities

**Navbar (Server Component)**:
- Fetches translations and locale using next-intl/server
- Renders static elements (logo, desktop menu)
- Passes translations and locale to MobileMenu client component

**MobileMenu (Client Component)**:
- Manages menu open/closed state
- Handles user interactions (clicks, keyboard events)
- Renders burger button, overlay, and menu panel
- Controls animations and transitions
- Manages body scroll lock

### Data Flow

1. Server component fetches translations and locale
2. Server component passes data as props to client component
3. Client component manages local UI state (isOpen)
4. User interactions update local state
5. State changes trigger animations and DOM updates

## Components and Interfaces

### MobileMenu Component

**Props Interface**:
```typescript
interface MobileMenuProps {
  translations: {
    home: string;
    offers: string;
    aboutUs: string;
    ourProducts: string;
    ourBranches: string;
    careers: string;
    menu: string;
    close: string;
  };
  locale: string;
}
```

**State**:
```typescript
const [isOpen, setIsOpen] = useState<boolean>(false);
```

**Key Functions**:
- `toggleMenu()`: Opens or closes the menu
- `closeMenu()`: Closes the menu
- `handleKeyDown(event)`: Handles Escape key press
- `handleOverlayClick()`: Closes menu when overlay is clicked
- `handleLinkClick()`: Closes menu when navigation item is clicked

### Navigation Items Configuration

```typescript
const navigationItems = [
  { key: 'home', href: '/' },
  { key: 'offers', href: '#' },
  { key: 'aboutUs', href: '#' },
  { key: 'ourProducts', href: '#' },
  { key: 'ourBranches', href: '#' },
  { key: 'careers', href: '/career' }
];
```

## Data Models

### Menu State

```typescript
type MenuState = {
  isOpen: boolean;
}
```

### Navigation Item

```typescript
type NavigationItem = {
  key: string;      // Translation key
  href: string;     // Route path
}
```

### Animation Variants

```typescript
type AnimationVariants = {
  overlay: {
    hidden: { opacity: 0 };
    visible: { opacity: 1 };
  };
  menu: {
    hidden: { x: string };  // '-100%' for LTR, '100%' for RTL
    visible: { x: '0%' };
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Burger button responsive visibility
*For any* viewport width, the burger button should be visible if and only if the width is below 1024px (Desktop_Breakpoint)
**Validates: Requirements 1.1, 1.2**

### Property 2: Menu toggle behavior
*For any* menu state (open or closed), clicking the burger button should toggle the menu to the opposite state
**Validates: Requirements 1.3, 1.4**

### Property 3: Navigation items completeness
*For any* rendered mobile menu, it should contain all six navigation items (Home, Offers, About Us, Our Products, Our Branches, Careers) in the correct order with correct href values
**Validates: Requirements 2.1, 2.2, 2.3**

### Property 4: Navigation closes menu
*For any* navigation item, clicking it should trigger the closeMenu function
**Validates: Requirements 2.4**

### Property 5: Overlay visibility matches menu state
*For any* menu state, the overlay should be visible if and only if the menu is open
**Validates: Requirements 3.1, 3.3**

### Property 6: Overlay click closes menu
*For any* menu state, if the menu is open and the overlay is clicked, the menu should close
**Validates: Requirements 3.2**

### Property 7: Correct translations for locale
*For any* locale (ar or en), all navigation items should display text in the correct language using the provided translations
**Validates: Requirements 4.1, 4.2, 4.5**

### Property 8: Slide direction matches locale
*For any* locale, the menu should slide from the right if locale is 'ar' (RTL) and from the left if locale is 'en' (LTR)
**Validates: Requirements 4.3, 4.4**

### Property 9: Button icon reflects menu state
*For any* menu state, the burger button should display a menu icon when closed and a close icon (X) when open
**Validates: Requirements 5.5**

### Property 10: ARIA label reflects menu state
*For any* menu state, the burger button should have aria-label "Menu" when closed and "Close" when open
**Validates: Requirements 6.1**

### Property 11: Dialog ARIA attributes when open
*For any* menu state, when the menu is open, the menu panel should have role="dialog" and aria-modal="true"
**Validates: Requirements 6.2**

### Property 12: Escape key closes menu
*For any* menu state, if the menu is open and the Escape key is pressed, the menu should close
**Validates: Requirements 6.4**

### Property 13: First item receives focus on open
*For any* menu state transition from closed to open, the first navigation item should receive focus
**Validates: Requirements 6.5**

### Property 14: Body scroll lock matches menu state
*For any* menu state, the body element should have overflow-hidden when the menu is open and not have it when the menu is closed
**Validates: Requirements 8.2, 8.3**

### Property 15: Resize closes menu at desktop breakpoint
*For any* menu state, if the menu is open and the viewport is resized to or above the Desktop_Breakpoint, the menu should close
**Validates: Requirements 8.5**

## Error Handling

### Invalid Props
- If translations object is missing required keys, component should log error and use fallback text
- If locale is not 'ar' or 'en', default to 'en' behavior

### Event Handler Errors
- All event handlers should be wrapped in try-catch to prevent crashes
- Errors should be logged to console for debugging

### Animation Errors
- If Framer Motion fails to load, menu should still function with instant show/hide
- Fallback to CSS transitions if Framer Motion is unavailable

### Focus Management Errors
- If focus cannot be set to first item, fail silently and allow default focus behavior
- Ensure focus trap doesn't prevent closing the menu

## Testing Strategy

### Unit Testing
The implementation will use unit tests for specific examples and edge cases:
- Test that component renders without crashing with valid props
- Test that burger button has correct initial state
- Test that menu is initially closed
- Test specific translation keys are used correctly
- Test that overlay has aria-hidden="true"
- Test that menu has correct styling classes
- Test that logo is rendered in menu
- Test that component architecture is correct (server/client split)

### Property-Based Testing
The implementation will use property-based testing to verify universal properties across all inputs. We will use **fast-check** for TypeScript/React property-based testing.

Each property test will:
- Run a minimum of 100 iterations with randomized inputs
- Reference the corresponding design property in a comment
- Use the tag format: **Feature: mobile-burger-menu, Property {number}: {property_text}**

Property tests will cover:
- Responsive visibility behavior across viewport widths
- Menu toggle behavior for all state transitions
- Navigation items completeness and correctness
- Overlay visibility and interaction for all states
- Locale-based behavior (translations and slide direction)
- ARIA attributes and accessibility features
- Body scroll lock behavior
- Resize behavior at breakpoint

### Integration Testing
- Test full user flow: open menu → click link → verify navigation and menu close
- Test keyboard navigation through all menu items
- Test rapid open/close interactions
- Test menu behavior during locale switching

### Manual Testing Checklist
- Verify animations are smooth on various devices
- Test on actual mobile devices (iOS Safari, Android Chrome)
- Verify RTL layout in Arabic locale
- Test with screen readers (VoiceOver, TalkBack)
- Verify no layout shift when menu opens/closes
- Test with slow network to ensure progressive enhancement
