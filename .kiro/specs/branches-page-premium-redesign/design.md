# Design Document: Branches Page Premium Redesign

## Overview

This design transforms the branches page from a basic functional interface into a premium, production-grade experience that matches the quality of the offers and home pages. The redesign focuses on three key areas: replacing placeholder elements with professional components, implementing consistent branding and design patterns, and enhancing user experience through modern UI/UX practices.

The design maintains the existing architecture (Next.js 15 App Router, React components, Leaflet maps) while upgrading visual presentation, interactions, and accessibility. All changes are incremental and backward-compatible with the existing data structures and API contracts.

## Architecture

### Component Hierarchy

```
BranchesPage (app/[locale]/branches/page.tsx)
├── BranchesPageHeader
│   └── Enhanced header with improved typography and spacing
├── BranchesContent
    ├── BranchesFilterTabs
    │   └── Enhanced filter controls with premium styling
    ├── BranchesMap (with BranchesMapWrapper)
    │   ├── Custom Meem logo markers
    │   ├── Animated map transitions
    │   └── Enhanced tooltips and popups
    └── BranchesList
        └── BranchCard (enhanced with icons and hover effects)
```

### Design System Integration

The redesign leverages the existing design system defined in `globals.css`:

- **Colors**: Primary (#124e91), Gold (#f59e0b), accent colors
- **Typography**: Inter for English, Almarai for Arabic
- **Spacing**: Consistent padding and margins using Tailwind scale
- **Shadows**: Layered shadows for depth and elevation
- **Animations**: Smooth transitions using cubic-bezier easing
- **Background**: bg-pattern class for branded background

### State Management

The existing state management pattern is preserved:
- Local component state for UI interactions (selected branch, active filter)
- Props drilling for data flow
- No global state management needed

## Components and Interfaces

### 1. BranchCard Component

**Purpose**: Display individual branch information with professional styling and icons

**Enhanced Interface**:
```typescript
interface BranchCardProps {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
  locale: string;
}
```

**Visual Design**:
- White background with subtle shadow
- Hover effect: lift animation (translateY(-4px)) with enhanced shadow
- Selected state: primary color border (2px) with light primary background tint
- Rounded corners: rounded-xl (12px)
- Padding: p-6 for comfortable spacing
- Icons: lucide-react Phone and Clock icons with primary color
- Typography hierarchy:
  - Branch name: text-xl font-bold text-gray-900
  - Address/City: text-sm text-gray-600
  - Phone/Hours: text-sm text-gray-700 with icon

**Interaction States**:
- Default: white bg, gray-200 border, subtle shadow
- Hover: lift effect, enhanced shadow, border-gray-300
- Selected: primary border, light primary bg tint
- Focus: ring-2 ring-primary ring-offset-2

### 2. BranchesMap Component

**Purpose**: Display interactive map with custom Meem-branded markers

**Custom Marker Implementation**:
```typescript
interface CustomMarkerProps {
  position: LatLngExpression;
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
  locale: 'ar' | 'en';
}
```

**Marker Design**:
- Use Meem logo (/meem-logo.png) as marker icon
- Size: 40x40px for normal, 50x50px for selected
- Drop shadow for elevation
- Tooltip on hover showing branch name
- Popup on click with full branch details

**Custom Icon Creation**:
```typescript
const createMeemMarkerIcon = (isSelected: boolean) => {
  return new Icon({
    iconUrl: '/meem-logo.png',
    iconSize: isSelected ? [50, 50] : [40, 40],
    iconAnchor: [20, 40], // Bottom center
    popupAnchor: [0, -40],
    className: isSelected ? 'selected-marker' : 'default-marker'
  });
};
```

**Map Animation**:
- Use Leaflet's `flyTo` method for smooth camera transitions
- Duration: 1000ms (1 second)
- Easing: ease-in-out
- Zoom level: 14 for individual branch focus

**Animation Implementation**:
```typescript
// When branch is selected
useEffect(() => {
  if (selectedBranch && mapRef.current) {
    mapRef.current.flyTo(
      [selectedBranch.coordinates.lat, selectedBranch.coordinates.lng],
      14,
      {
        duration: 1.0,
        easeLinearity: 0.25
      }
    );
  }
}, [selectedBranch]);
```

### 3. BranchesPageHeader Component

**Enhanced Design**:
- Background: transparent (shows bg-pattern from parent)
- Typography:
  - Title: text-4xl md:text-5xl font-bold text-gray-900
  - Subtitle: text-lg md:text-xl text-gray-600
- Spacing: py-12 md:py-16
- Max width: max-w-4xl mx-auto for optimal readability
- Text alignment: center

### 4. BranchesFilterTabs Component

**Enhanced Design**:
- Active tab: bg-primary text-white with shadow-md
- Inactive tab: bg-white text-gray-700 with border
- Hover: scale(1.02) transform with shadow enhancement
- Transition: all 200ms ease-in-out
- Spacing: gap-3 between tabs
- Padding: px-8 py-3
- Border radius: rounded-lg
- Font: font-semibold text-base

### 5. BranchesList Component

**Enhanced Design**:
- Container: space-y-4 for card spacing
- Scrollbar: custom-scrollbar class for styled scrollbar
- Max height: max-h-[700px] with overflow-y-auto
- Padding right: pr-2 for scrollbar clearance

**Empty State**:
- Icon: lucide-react MapPin icon (size 64)
- Message: centered text with helpful guidance
- Background: bg-gray-50 rounded-lg
- Padding: p-12

### 6. BranchesContent Component

**Layout Design**:
- Grid: grid-cols-1 lg:grid-cols-2 gap-8
- Map container: rounded-xl overflow-hidden shadow-lg
- List container: rounded-xl bg-white p-6 shadow-lg
- Responsive ordering:
  - Mobile: List first, map second
  - Desktop: Map left, list right

### 7. Main Page Component

**Background Enhancement**:
```typescript
<main className="min-h-screen bg-pattern">
  {/* Content */}
</main>
```

## Data Models

### Branch Data Structure (Unchanged)

```typescript
interface Branch {
  id: string;
  locationId: string;
  name: { en: string; ar: string };
  address?: { en: string; ar: string };
  city: { en: string; ar: string };
  coordinates?: { lat: number; lng: number };
  phone?: string;
  hours?: { open: string; close: string };
}
```

### UI State Models

```typescript
interface BranchesUIState {
  selectedBranch: Branch | null;
  activeFilter: FilterOption;
  isLoading: boolean;
}

type FilterOption = 'all' | 'kuwait' | 'saudi-arabia';
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following redundancies:
- Requirements 3.3 and 3.4 are redundant with 3.1 and 10.3 respectively
- Requirements 5.6, 6.4, 8.1 are covered by more specific responsive requirements
- Requirements 15.5 is redundant with 15.1 (same behavior, different trigger description)
- Multiple design consistency requirements (16.1-16.5) are subjective and verified through using the design system
- Icon sizing (1.3) and color (1.4) can be combined into a single comprehensive property about icon styling

The following properties represent the unique, testable correctness guarantees:

### Property 1: Icon Replacement and Styling

*For any* branch card rendered in the UI, all emoji icons (📞, 🕒) should be replaced with corresponding lucide-react icons (Phone, Clock) that have consistent sizing (w-4 h-4), spacing (me-2), and color (text-primary) applied.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 2: Custom Map Markers

*For any* branch with valid coordinates displayed on the map, the marker should use the Meem logo image (/meem-logo.png) with proper sizing (40x40px default, 50x50px when selected) and not use generic colored markers from external URLs.

**Validates: Requirements 2.1, 2.5**

### Property 3: Marker Selection Visual Distinction

*For any* branch selection on the map, the selected marker should have visually distinct styling (larger size, enhanced shadow) compared to unselected markers.

**Validates: Requirements 2.4**

### Property 4: Marker Interactivity

*For any* map marker, it should be clickable to display a popup with complete branch information and hoverable to display a tooltip with the branch name in the current locale.

**Validates: Requirements 2.2, 2.3, 2.6**

### Property 5: Background Pattern Application

*For any* page render, the main element should have the bg-pattern class applied and should not have the bg-gray-50 class.

**Validates: Requirements 3.1, 3.2**

### Property 6: Component Elevation Styling

*For any* elevated component (branch card, map container, filter tabs), it should have both rounded corners (rounded-lg or rounded-xl) and shadow classes applied.

**Validates: Requirements 4.1, 4.2, 5.5**

### Property 7: Interactive Element Transitions

*For any* interactive element (branch card, filter tab), it should have transition classes applied and provide visual feedback (hover effects, active states) with smooth animations.

**Validates: Requirements 4.6, 11.1, 11.2, 11.3**

### Property 8: Branch Card Selected State

*For any* branch card, when isSelected is true, it should have a primary color border (border-primary) and light primary background tint, visually distinguishing it from unselected cards.

**Validates: Requirements 5.3**

### Property 9: Filter Tab Active State

*For any* filter tab, when it is active, it should use primary color background (bg-primary) and white text (text-white), and when inactive, it should use white background with gray text.

**Validates: Requirements 6.1, 6.3**

### Property 10: Loading State Skeleton Display

*For any* loading state, the system should display skeleton screens that structurally match the layout of actual content (same number of elements, similar dimensions).

**Validates: Requirements 7.1, 7.2, 7.3**

### Property 11: Responsive Layout Stacking

*For any* viewport width below 1024px, the map and list should stack vertically with the list appearing first, and for viewports at or above 1024px, they should display side-by-side.

**Validates: Requirements 8.2**

### Property 12: Touch Target Minimum Size

*For any* interactive element on mobile viewports (< 768px), the clickable/tappable area should be at least 44x44 pixels.

**Validates: Requirements 8.3**

### Property 13: Keyboard Navigation Support

*For any* interactive element (branch card, filter tab, marker), pressing Enter or Space when focused should trigger the same action as clicking.

**Validates: Requirements 10.2**

### Property 14: ARIA Labels Presence

*For any* interactive element without visible text labels, it should have an appropriate aria-label or aria-labelledby attribute.

**Validates: Requirements 10.1**

### Property 15: Focus Indicators

*For any* focusable element, when focused, it should display a visible focus ring (ring-2 ring-primary ring-offset-2 or similar).

**Validates: Requirements 10.4**

### Property 16: Color Contrast Compliance

*For any* text element, the contrast ratio between text color and background color should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 10.3**

### Property 17: Empty State Display

*For any* filter selection that results in zero branches, the system should display an empty state with an icon, explanatory message, and no empty list container.

**Validates: Requirements 12.1, 12.2, 12.3**

### Property 18: Bilingual Content Rendering

*For any* text content with translations, switching locale between 'ar' and 'en' should display the correct translated text, apply the appropriate font family (Almarai for Arabic, Inter for English), and set the correct text direction (RTL for Arabic, LTR for English).

**Validates: Requirements 13.1, 13.2, 13.3**

### Property 19: Map Animation on Branch Selection

*For any* branch selection change where the new branch has valid coordinates, the map should call flyTo with the branch coordinates, zoom level 14, duration between 800-1500ms, and easing parameters.

**Validates: Requirements 15.1, 15.2, 15.3, 15.4**

## Error Handling

### Map Loading Errors

**Scenario**: Leaflet fails to load or map tiles are unavailable

**Handling**:
- Display error state with icon and message
- Provide "Retry" button to attempt reload
- Log error to console for debugging
- Maintain existing error boundary pattern

**Implementation**:
```typescript
const [mapError, setMapError] = useState(false);

if (mapError) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-xl p-8">
      <MapPinOff className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-700 mb-4 text-lg font-medium">
        {locale === 'ar' ? 'تعذر تحميل الخريطة' : 'Unable to load map'}
      </p>
      <button onClick={() => setMapError(false)} className="btn-primary">
        {locale === 'ar' ? 'إعادة المحاولة' : 'Retry'}
      </button>
    </div>
  );
}
```

### Missing Coordinates

**Scenario**: Branch data lacks coordinates

**Handling**:
- Filter out branches without coordinates from map display
- Still show these branches in the list
- Display count of branches without map locations
- Provide helpful message if no branches have coordinates

### Image Loading Errors

**Scenario**: Meem logo fails to load for markers

**Handling**:
- Fallback to colored circle markers with "M" text
- Log warning to console
- Maintain marker functionality

### Translation Missing

**Scenario**: Translation key not found

**Handling**:
- Display key name as fallback
- Log warning to console
- Ensure UI remains functional

## Testing Strategy

### Unit Testing

**Focus Areas**:
1. Component rendering with different props
2. Icon replacement verification
3. State management (selection, filtering)
4. Event handlers (click, hover, keyboard)
5. Conditional rendering (empty states, loading states)
6. Locale switching and RTL support

**Example Tests**:
```typescript
describe('BranchCard', () => {
  it('should render Phone icon instead of emoji', () => {
    const { container } = render(<BranchCard {...props} />);
    expect(container.querySelector('[data-lucide="phone"]')).toBeInTheDocument();
    expect(container.textContent).not.toContain('📞');
  });

  it('should apply hover-lift class', () => {
    const { container } = render(<BranchCard {...props} />);
    const card = container.firstChild;
    expect(card).toHaveClass('hover-lift');
  });

  it('should show selected state with primary border', () => {
    const { container } = render(<BranchCard {...props} isSelected={true} />);
    const card = container.firstChild;
    expect(card).toHaveClass('border-primary');
  });
});
```

### Property-Based Testing

**Configuration**:
- Library: fast-check (for TypeScript/JavaScript)
- Iterations: 100 per property test
- Tag format: Feature: branches-page-premium-redesign, Property {number}: {property_text}

**Property Test Examples**:

```typescript
// Property 1: Icon Replacement Completeness
test('Property 1: No emoji icons in rendered branch cards', () => {
  fc.assert(
    fc.property(
      fc.array(branchArbitrary),
      (branches) => {
        const { container } = render(<BranchesList branches={branches} />);
        const text = container.textContent || '';
        return !text.includes('📞') && !text.includes('🕒');
      }
    ),
    { numRuns: 100 }
  );
});

// Property 6: Map Animation Trigger
test('Property 6: Map animates on branch selection', () => {
  fc.assert(
    fc.property(
      branchArbitrary,
      branchArbitrary,
      (branch1, branch2) => {
        const flyToMock = jest.fn();
        const mapRef = { current: { flyTo: flyToMock } };
        
        const { rerender } = render(
          <BranchesMap selectedBranch={branch1} mapRef={mapRef} />
        );
        
        rerender(<BranchesMap selectedBranch={branch2} mapRef={mapRef} />);
        
        if (branch2.coordinates) {
          expect(flyToMock).toHaveBeenCalledWith(
            [branch2.coordinates.lat, branch2.coordinates.lng],
            14,
            expect.objectContaining({ duration: 1.0 })
          );
        }
        return true;
      }
    ),
    { numRuns: 100 }
  );
});

// Property 10: Color Contrast Compliance
test('Property 10: Text contrast meets WCAG AA', () => {
  fc.assert(
    fc.property(
      fc.array(branchArbitrary),
      (branches) => {
        const { container } = render(<BranchesList branches={branches} />);
        const textElements = container.querySelectorAll('[class*="text-"]');
        
        return Array.from(textElements).every(element => {
          const contrast = calculateContrast(element);
          const fontSize = getComputedStyle(element).fontSize;
          const isLargeText = parseInt(fontSize) >= 18;
          return contrast >= (isLargeText ? 3 : 4.5);
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Focus Areas**:
1. Filter interaction updates both map and list
2. Branch selection synchronizes between map and list
3. Map marker clicks update selected state
4. Locale changes update all text content
5. Responsive layout changes at breakpoints

### Visual Regression Testing

**Focus Areas**:
1. Branch card appearance (default, hover, selected)
2. Filter tabs styling
3. Map marker appearance
4. Empty states
5. Loading states
6. Mobile vs desktop layouts

### Accessibility Testing

**Tools**:
- axe-core for automated accessibility checks
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)

**Focus Areas**:
1. Keyboard navigation completeness
2. ARIA labels and roles
3. Focus indicators
4. Color contrast
5. Screen reader announcements

### Performance Testing

**Metrics**:
- Initial page load time
- Time to interactive
- Map rendering time with multiple markers
- Animation frame rate (should maintain 60fps)

**Benchmarks**:
- Page load: < 2 seconds
- Map render: < 1 second for up to 50 markers
- Animation smoothness: 60fps maintained

## Implementation Notes

### Icon Integration

Import lucide-react icons at the top of BranchCard:
```typescript
import { Phone, Clock } from 'lucide-react';
```

Use with consistent sizing:
```typescript
<Phone className="w-4 h-4 text-primary inline-block mr-2" />
```

### Custom Map Marker CSS

Add to globals.css:
```css
.default-marker {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.selected-marker {
  filter: drop-shadow(0 4px 8px rgba(18, 78, 145, 0.4));
  transform: scale(1.1);
}
```

### Skeleton Screen Component

Create reusable skeleton component:
```typescript
const BranchCardSkeleton = () => (
  <div className="p-6 rounded-xl border-2 border-gray-200 bg-white animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);
```

### Map Ref Management

Use useRef to maintain map instance reference:
```typescript
const mapRef = useRef<L.Map | null>(null);

<MapContainer ref={mapRef} ...>
```

### Responsive Breakpoints

Follow Tailwind's default breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

Use lg breakpoint for map/list layout switch.

### RTL Considerations

Ensure icons and spacing work in both directions:
```typescript
<Phone className={`w-4 h-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
```

Or use Tailwind's RTL-aware classes:
```typescript
<Phone className="w-4 h-4 me-2" /> {/* me = margin-end, works in both directions */}
```

### Animation Performance

Use CSS transforms for animations (GPU-accelerated):
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

Avoid animating properties like height, width, top, left (causes reflow).

### Lazy Loading

Consider lazy loading the map component:
```typescript
const BranchesMap = dynamic(() => import('./BranchesMap'), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />
});
```

This improves initial page load performance.
