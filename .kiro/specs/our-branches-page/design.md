# Design Document: Our Branches Page

## Overview

The "Our Branches" page is a dedicated Next.js page that displays all Meem market branch locations across Kuwait and Saudi Arabia. The page provides an interactive map visualization, country-based filtering, and a detailed branch list with full internationalization support for Arabic (RTL) and English (LTR) layouts.

### Key Features
- Dedicated route at `/[locale]/branches`
- Interactive map with branch location markers
- Country filter tabs (All, Kuwait, Saudi Arabia)
- Responsive branch list with detailed information
- Full i18n support with RTL/LTR layouts
- Integration with existing branch data structure
- Responsive design for mobile, tablet, and desktop

### Technology Stack
- **Framework**: Next.js 16 with App Router
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Map Library**: Leaflet with react-leaflet (lightweight, open-source)
- **Type Safety**: TypeScript with existing Branch and Location types

## Architecture

### Component Hierarchy

```
app/[locale]/branches/
└── page.tsx (Server Component)
    ├── BranchesPageHeader (Client Component)
    ├── BranchesFilterTabs (Client Component)
    └── BranchesContent (Client Component)
        ├── BranchesMap (Client Component)
        └── BranchesList (Client Component)
            └── BranchCard (Client Component)
```

### Data Flow

1. **Server Component** (`page.tsx`): Fetches branch data and translations server-side
2. **Client Components**: Handle user interactions (filtering, map interactions)
3. **State Management**: React useState for filter state, shared between tabs, map, and list
4. **Data Source**: Static imports from `app/data/branches.ts`

### Routing Integration

The page integrates with the existing Next.js app router structure:
- Route: `app/[locale]/branches/page.tsx`
- Uses existing i18n routing from `i18n/routing.ts`
- Supports both `/ar/branches` and `/en/branches` routes
- Leverages `next-intl` for server-side translations

## Components and Interfaces

### 1. BranchesPage (Server Component)

**Purpose**: Main page component that fetches data and renders the page structure.

**File**: `app/[locale]/branches/page.tsx`

**Interface**:
```typescript
interface BranchesPageProps {
  params: {
    locale: string;
  };
}
```

**Responsibilities**:
- Validate locale parameter
- Import branch data from `app/data/branches.ts`
- Fetch translations using `getTranslations` from next-intl
- Render page layout with header, filters, and content sections
- Pass data to client components

**Pseudocode**:
```
function BranchesPage(params):
  locale = validate_locale(params.locale)
  translations = await get_translations('branches', locale)
  branch_data = import_branches()
  location_data = import_locations()
  
  return (
    <main>
      <BranchesPageHeader translations={translations} />
      <BranchesFilterTabs 
        locations={location_data}
        translations={translations}
      />
      <BranchesContent 
        branches={branch_data}
        locations={location_data}
        locale={locale}
      />
    </main>
  )
```

### 2. BranchesPageHeader (Client Component)

**Purpose**: Displays the page title and subtitle with proper i18n support.

**File**: `app/components/Branches/BranchesPageHeader.tsx`

**Interface**:
```typescript
interface BranchesPageHeaderProps {
  title: string;
  subtitle: string;
}
```

**Responsibilities**:
- Display translated title and subtitle
- Apply responsive typography
- Support RTL/LTR layouts

**Pseudocode**:
```
function BranchesPageHeader(title, subtitle):
  return (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  )
```

### 3. BranchesFilterTabs (Client Component)

**Purpose**: Provides country filter tabs with active state management.

**File**: `app/components/Branches/BranchesFilterTabs.tsx`

**Interface**:
```typescript
type FilterOption = 'all' | 'kuwait' | 'saudi-arabia';

interface BranchesFilterTabsProps {
  locations: Location[];
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  locale: string;
}
```

**Responsibilities**:
- Render filter tabs for All, Kuwait, and Saudi Arabia
- Manage active tab visual state
- Emit filter change events
- Display localized tab labels
- Provide keyboard navigation and ARIA labels

**Pseudocode**:
```
function BranchesFilterTabs(locations, activeFilter, onFilterChange, locale):
  tabs = [
    { id: 'all', label: translations.all },
    { id: 'kuwait', label: get_location_name('kuwait', locale) },
    { id: 'saudi-arabia', label: get_location_name('saudi-arabia', locale) }
  ]
  
  for each tab in tabs:
    render_tab(
      label: tab.label,
      active: tab.id === activeFilter,
      onClick: () => onFilterChange(tab.id),
      aria_label: tab.label,
      role: 'tab'
    )
```

### 4. BranchesContent (Client Component)

**Purpose**: Container component that manages filter state and coordinates map and list updates.

**File**: `app/components/Branches/BranchesContent.tsx`

**Interface**:
```typescript
interface BranchesContentProps {
  branches: Branch[];
  locations: Location[];
  locale: string;
}
```

**State**:
```typescript
const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
```

**Responsibilities**:
- Manage filter state
- Filter branches based on active filter
- Coordinate between map and list components
- Handle branch selection from map or list
- Apply responsive layout (side-by-side on desktop, stacked on mobile)

**Pseudocode**:
```
function BranchesContent(branches, locations, locale):
  [activeFilter, setActiveFilter] = useState('all')
  [selectedBranch, setSelectedBranch] = useState(null)
  
  filteredBranches = filter_branches(branches, activeFilter)
  
  return (
    <div className="responsive-layout">
      <BranchesFilterTabs 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="content-grid">
        <BranchesMap 
          branches={filteredBranches}
          selectedBranch={selectedBranch}
          onBranchSelect={setSelectedBranch}
        />
        <BranchesList 
          branches={filteredBranches}
          selectedBranch={selectedBranch}
          onBranchSelect={setSelectedBranch}
          locale={locale}
        />
      </div>
    </div>
  )

function filter_branches(branches, filter):
  if filter === 'all':
    return branches
  else:
    return branches.filter(b => b.locationId === filter)
```

### 5. BranchesMap (Client Component)

**Purpose**: Displays an interactive map with branch location markers using Leaflet.

**File**: `app/components/Branches/BranchesMap.tsx`

**Interface**:
```typescript
interface BranchesMapProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  locale: string;
}
```

**Dependencies**:
- `react-leaflet`: MapContainer, TileLayer, Marker, Popup
- `leaflet`: For marker icons and map utilities

**Responsibilities**:
- Render interactive map using Leaflet
- Display markers for branches with coordinates
- Show popup with branch info on marker click
- Auto-fit map bounds to show all markers
- Highlight selected branch marker
- Handle marker click events
- Load map tiles from OpenStreetMap

**Pseudocode**:
```
function BranchesMap(branches, selectedBranch, onBranchSelect, locale):
  branchesWithCoords = branches.filter(b => b.coordinates exists)
  
  if branchesWithCoords is empty:
    return <EmptyMapPlaceholder />
  
  mapCenter = calculate_center(branchesWithCoords)
  mapBounds = calculate_bounds(branchesWithCoords)
  
  return (
    <MapContainer center={mapCenter} bounds={mapBounds}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      for each branch in branchesWithCoords:
        <Marker 
          position={[branch.coordinates.lat, branch.coordinates.lng]}
          icon={get_marker_icon(branch === selectedBranch)}
          eventHandlers={{
            click: () => onBranchSelect(branch)
          }}
        >
          <Popup>
            <BranchPopupContent branch={branch} locale={locale} />
          </Popup>
        </Marker>
    </MapContainer>
  )

function calculate_center(branches):
  avgLat = average(branches.map(b => b.coordinates.lat))
  avgLng = average(branches.map(b => b.coordinates.lng))
  return [avgLat, avgLng]

function calculate_bounds(branches):
  lats = branches.map(b => b.coordinates.lat)
  lngs = branches.map(b => b.coordinates.lng)
  return [[min(lats), min(lngs)], [max(lats), max(lngs)]]
```

### 6. BranchesList (Client Component)

**Purpose**: Displays a scrollable list of branch cards with detailed information.

**File**: `app/components/Branches/BranchesList.tsx`

**Interface**:
```typescript
interface BranchesListProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  locale: string;
}
```

**Responsibilities**:
- Render list of branch cards
- Handle branch selection
- Highlight selected branch
- Display empty state when no branches match filter
- Provide scrollable container
- Support keyboard navigation

**Pseudocode**:
```
function BranchesList(branches, selectedBranch, onBranchSelect, locale):
  if branches is empty:
    return <EmptyState message="No branches found" />
  
  return (
    <div className="scrollable-list">
      for each branch in branches:
        <BranchCard
          branch={branch}
          isSelected={branch.id === selectedBranch?.id}
          onClick={() => onBranchSelect(branch)}
          locale={locale}
        />
    </div>
  )
```

### 7. BranchCard (Client Component)

**Purpose**: Displays individual branch information in a card format.

**File**: `app/components/Branches/BranchCard.tsx`

**Interface**:
```typescript
interface BranchCardProps {
  branch: Branch;
  isSelected: boolean;
  onClick: () => void;
  locale: string;
}
```

**Responsibilities**:
- Display branch name, address, city
- Show phone number if available
- Show operating hours if available
- Apply selected state styling
- Handle click events
- Support keyboard interaction

**Pseudocode**:
```
function BranchCard(branch, isSelected, onClick, locale):
  return (
    <div 
      className={isSelected ? 'card-selected' : 'card-default'}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <h3>{branch.name[locale]}</h3>
      <p className="address">{branch.address?.[locale]}</p>
      <p className="city">{branch.city[locale]}</p>
      
      if branch.phone exists:
        <p className="phone">{branch.phone}</p>
      
      if branch.hours exists:
        <p className="hours">
          {format_hours(branch.hours.open, branch.hours.close)}
        </p>
    </div>
  )
```

## Data Models

### Existing Types (from app/types/branch.ts)

```typescript
interface Location {
  id: string;
  code: 'SA' | 'KW';
  name: {
    en: string;
    ar: string;
  };
  flag?: string;
}

interface Branch {
  id: string;
  locationId: string;
  name: {
    en: string;
    ar: string;
  };
  address?: {
    en: string;
    ar: string;
  };
  city: {
    en: string;
    ar: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  hours?: {
    open: string;
    close: string;
  };
}
```

### New Types

```typescript
// Filter option type
type FilterOption = 'all' | 'kuwait' | 'saudi-arabia';

// Map bounds type
interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Map center type
interface MapCenter {
  lat: number;
  lng: number;
}
```

### Translation Keys Structure

The following translation keys should be added to the i18n message files:

**messages/en.json**:
```json
{
  "branches": {
    "title": "Meem Market Branch Network",
    "subtitle": "We cover several areas to provide an easy shopping experience close to you",
    "filterAll": "All",
    "filterKuwait": "Kuwait",
    "filterSaudiArabia": "Saudi Arabia",
    "noBranchesFound": "No branches found for the selected filter",
    "phone": "Phone",
    "hours": "Hours",
    "openingHours": "Open {open} - {close}",
    "mapLoadError": "Unable to load map. Please try again later.",
    "selectBranch": "Select a branch to view details"
  }
}
```

**messages/ar.json**:
```json
{
  "branches": {
    "title": "شبكة فروع سوق ميم",
    "subtitle": "نُغطي عدة مناطق لتوفير تجربة تسوق سهلة وقريبة منك",
    "filterAll": "الكل",
    "filterKuwait": "الكويت",
    "filterSaudiArabia": "السعودية",
    "noBranchesFound": "لا توجد فروع للفلتر المحدد",
    "phone": "الهاتف",
    "hours": "ساعات العمل",
    "openingHours": "مفتوح {open} - {close}",
    "mapLoadError": "تعذر تحميل الخريطة. يرجى المحاولة مرة أخرى لاحقاً.",
    "selectBranch": "اختر فرعاً لعرض التفاصيل"
  }
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Locale-based content rendering

*For any* supported locale (ar or en), when the Branch_Page is rendered with that locale, all text content including titles, subtitles, and labels should display in the corresponding language from the translation system.

**Validates: Requirements 1.2, 2.1, 2.4, 6.1**

### Property 2: Filter behavior consistency

*For any* filter selection (all, kuwait, saudi-arabia), when a user selects that filter, both the Branch_List and Map_Component should display only branches matching the filter criteria (all branches for "all", only branches with locationId matching the selected country for country-specific filters).

**Validates: Requirements 3.2, 5.2, 4.5**

### Property 3: Branch data localization

*For any* branch in the Branch_List, the displayed name, address, and city should use the value from the branch data structure corresponding to the current locale (branch.name[locale], branch.address[locale], branch.city[locale]).

**Validates: Requirements 5.3, 5.4, 5.5, 6.5**

### Property 4: Optional field conditional display

*For any* branch with optional fields (phone, hours), the Branch_List should display those fields if and only if they are defined in the branch data, and should not display them if they are undefined or null.

**Validates: Requirements 5.6, 5.7**

### Property 5: Map marker coordinate filtering

*For any* branch in the branches array, the Map_Component should display a marker for that branch if and only if the branch has a defined coordinates property with valid lat and lng values.

**Validates: Requirements 4.2, 4.3**

### Property 6: Map marker interaction

*For any* branch marker displayed on the map, when a user clicks that marker, the Map_Component should display a popup containing the branch information (name, address, city in the current locale).

**Validates: Requirements 4.4**

### Property 7: Map bounds calculation

*For any* set of filtered branches with coordinates, the Map_Component should automatically calculate and set map bounds such that all branch markers are visible within the viewport.

**Validates: Requirements 4.6**

### Property 8: Active filter visual feedback

*For any* Location_Tab, when that tab represents the currently active filter, the tab should have distinct visual styling (CSS classes or attributes) that differentiates it from inactive tabs.

**Validates: Requirements 3.6**

### Property 9: List update responsiveness

*For any* filter change event, the Branch_List should update its displayed branches to reflect the new filter state without requiring a page reload.

**Validates: Requirements 5.8**

### Property 10: Locale switching

*For any* locale change event, the Branch_Page should re-render all text content, branch data, and labels in the new locale without requiring a page reload.

**Validates: Requirements 6.6**

### Property 11: Data-driven rendering

*For any* valid branch data array provided to the Branch_Page, the page should render all branches in the list and map (where coordinates exist) without requiring code changes, demonstrating that the page is fully data-driven.

**Validates: Requirements 8.4**

### Property 12: Filter tab accessibility

*For any* Location_Tab, the tab should be keyboard navigable (focusable and activatable via Enter/Space keys) and should have appropriate ARIA attributes (role, aria-label, aria-selected).

**Validates: Requirements 7.4, 9.1, 9.2**

### Property 13: Responsive map sizing

*For any* viewport size change, the Map_Component container should adjust its dimensions to fit the available space according to the responsive layout rules (full width on mobile, half width on desktop).

**Validates: Requirements 7.5**

## Error Handling

### Map Loading Errors

**Scenario**: Leaflet map fails to load tiles or initialize

**Handling**:
- Wrap MapContainer in error boundary
- Display fallback UI with error message from translations
- Provide retry mechanism or fallback to list-only view
- Log error details for debugging

**Implementation**:
```typescript
function BranchesMap() {
  const [mapError, setMapError] = useState(false);
  
  if (mapError) {
    return (
      <div className="map-error">
        <p>{t('branches.mapLoadError')}</p>
        <button onClick={() => setMapError(false)}>
          {t('branches.retry')}
        </button>
      </div>
    );
  }
  
  return (
    <ErrorBoundary onError={() => setMapError(true)}>
      <MapContainer>
        {/* map content */}
      </MapContainer>
    </ErrorBoundary>
  );
}
```

### Missing Branch Data

**Scenario**: Branch data is empty or undefined

**Handling**:
- Display empty state message
- Ensure no runtime errors from undefined access
- Provide helpful message to user

**Implementation**:
```typescript
if (!branches || branches.length === 0) {
  return (
    <div className="empty-state">
      <p>{t('branches.noBranchesFound')}</p>
    </div>
  );
}
```

### Invalid Locale

**Scenario**: Locale parameter is not 'ar' or 'en'

**Handling**:
- Validate locale in page component
- Default to 'ar' (default locale from routing config)
- Log warning for debugging

**Implementation**:
```typescript
const validLocales = ['ar', 'en'];
const locale = params?.locale && validLocales.includes(params.locale)
  ? params.locale
  : 'ar';
```

### Missing Coordinates

**Scenario**: Branch has no coordinates property

**Handling**:
- Filter out branches without coordinates from map
- Still display in list
- No error thrown

**Implementation**:
```typescript
const branchesWithCoords = branches.filter(
  b => b.coordinates && 
       typeof b.coordinates.lat === 'number' && 
       typeof b.coordinates.lng === 'number'
);
```

### Translation Key Missing

**Scenario**: Translation key not found in messages file

**Handling**:
- next-intl will display the key name as fallback
- Log warning in development
- Ensure all keys are defined in both en.json and ar.json

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, component rendering, and user interactions
- **Property tests**: Verify universal properties across all inputs, data variations, and state combinations

Both testing approaches are complementary and necessary for comprehensive coverage. Unit tests catch concrete bugs and verify specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Unit Testing

**Framework**: Jest with React Testing Library

**Test Categories**:

1. **Component Rendering Tests**
   - Verify BranchesPageHeader renders with correct title and subtitle
   - Verify BranchesFilterTabs renders all three tabs
   - Verify BranchCard renders all branch information fields
   - Verify empty states display correctly

2. **User Interaction Tests**
   - Test filter tab click updates active filter
   - Test branch card click triggers selection callback
   - Test keyboard navigation on filter tabs
   - Test map marker click displays popup

3. **Locale-Specific Tests**
   - Test Arabic locale displays RTL layout (dir="rtl")
   - Test English locale displays LTR layout (dir="ltr")
   - Test specific translation strings for both locales

4. **Edge Cases**
   - Test branches without coordinates are excluded from map
   - Test branches without phone/hours don't display those fields
   - Test empty branch array displays empty state
   - Test invalid locale defaults to 'ar'

5. **Integration Tests**
   - Test filter change updates both list and map
   - Test branch selection synchronizes between list and map
   - Test locale switching updates all content

**Example Unit Test**:
```typescript
describe('BranchesFilterTabs', () => {
  it('should highlight active tab', () => {
    const { getByRole } = render(
      <BranchesFilterTabs
        activeFilter="kuwait"
        onFilterChange={jest.fn()}
        locale="en"
      />
    );
    
    const kuwaitTab = getByRole('tab', { name: 'Kuwait' });
    expect(kuwaitTab).toHaveClass('active');
  });
});
```

### Property-Based Testing

**Framework**: fast-check (JavaScript/TypeScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Test Tagging**: Each property test must include a comment referencing the design property:
```typescript
// Feature: our-branches-page, Property 2: Filter behavior consistency
```

**Property Test Categories**:

1. **Filtering Properties**
   - Property 2: Filter behavior consistency
   - Generate random branch data with various locationIds
   - Test that filtering always returns correct subset

2. **Localization Properties**
   - Property 1: Locale-based content rendering
   - Property 3: Branch data localization
   - Generate random locales and branch data
   - Test that correct locale values are always used

3. **Conditional Display Properties**
   - Property 4: Optional field conditional display
   - Generate branches with and without optional fields
   - Test that fields display if and only if defined

4. **Map Properties**
   - Property 5: Map marker coordinate filtering
   - Property 7: Map bounds calculation
   - Generate random branch data with various coordinate values
   - Test marker filtering and bounds calculation

5. **State Synchronization Properties**
   - Property 9: List update responsiveness
   - Property 10: Locale switching
   - Generate random state changes
   - Test that UI always reflects current state

**Example Property Test**:
```typescript
// Feature: our-branches-page, Property 2: Filter behavior consistency
describe('Filter behavior', () => {
  it('should always filter branches correctly', () => {
    fc.assert(
      fc.property(
        fc.array(branchArbitrary),
        fc.constantFrom('all', 'kuwait', 'saudi-arabia'),
        (branches, filter) => {
          const filtered = filterBranches(branches, filter);
          
          if (filter === 'all') {
            expect(filtered).toEqual(branches);
          } else {
            expect(filtered.every(b => b.locationId === filter)).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Data Generators

For property-based testing, create arbitraries (generators) for:

```typescript
// Branch generator
const branchArbitrary = fc.record({
  id: fc.string(),
  locationId: fc.constantFrom('kuwait', 'saudi-arabia'),
  name: fc.record({
    en: fc.string(),
    ar: fc.string()
  }),
  address: fc.option(fc.record({
    en: fc.string(),
    ar: fc.string()
  })),
  city: fc.record({
    en: fc.string(),
    ar: fc.string()
  }),
  coordinates: fc.option(fc.record({
    lat: fc.double({ min: -90, max: 90 }),
    lng: fc.double({ min: -180, max: 180 })
  })),
  phone: fc.option(fc.string()),
  hours: fc.option(fc.record({
    open: fc.string(),
    close: fc.string()
  }))
});

// Locale generator
const localeArbitrary = fc.constantFrom('ar', 'en');

// Filter generator
const filterArbitrary = fc.constantFrom('all', 'kuwait', 'saudi-arabia');
```

### Testing Coverage Goals

- **Unit Test Coverage**: Minimum 80% code coverage
- **Property Test Coverage**: All 13 correctness properties implemented
- **Integration Test Coverage**: All major user flows tested
- **Accessibility Testing**: Manual testing with screen readers and keyboard navigation

### Continuous Integration

- Run all tests on every pull request
- Fail build if any test fails
- Generate coverage reports
- Run property tests with 100 iterations in CI
- Consider increasing iterations to 1000 for release builds
