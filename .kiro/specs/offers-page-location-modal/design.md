# Design Document: Offers Page Location Modal

## Overview

This feature implements a modern location-based branch filtering system integrated into the home page hero swiper. Users can click on location circles (Saudi Arabia or Kuwait) to open a premium multi-step modal that guides them through branch selection and action choices (view map, contact info, or offers).

### Key Features
- Location circles integrated into home page hero swiper overlay
- Premium multi-step modal with smooth animations
- Step 1: Branch selection from chosen location
- Step 2: Action selection (Location Map, Contact & Social, Offers)
- Interactive map display with branch markers
- Contact information with social media links
- Redirect to offers page with location/branch parameters
- Full internationalization support (en/ar with RTL)
- Responsive design for mobile, tablet, and desktop
- Removal of legacy BranchFilterSidebar from home page

### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS with custom animations
- **Map Library**: Leaflet with react-leaflet
- **State Management**: React useState for modal and step state
- **Type Safety**: TypeScript with existing Branch and Location types

## Architecture

### Component Hierarchy

```
app/components/
├── HeroSwiper.tsx (Modified - adds LocationCircles)
├── LocationModal/
│   ├── LocationModal.tsx (Main modal container)
│   ├── StepIndicator.tsx (Progress indicator)
│   ├── BranchSelectionStep.tsx (Step 1)
│   ├── ActionSelectionStep.tsx (Step 2)
│   ├── LocationMapView.tsx (Map display)
│   ├── ContactSocialView.tsx (Contact info)
│   └── LocationCircle.tsx (Clickable location circle)
```

### Data Flow

1. **Location Circle Click**: User clicks location circle → Opens modal with locationId
2. **Branch Selection**: User selects branch → Advances to step 2 with branchId
3. **Action Selection**: User selects action → Shows corresponding view or redirects
4. **State Management**: Modal state managed in parent, passed down to children
5. **Data Source**: Static imports from `app/data/branches.ts`

### State Management

```typescript
// Modal state (in HeroSwiper or parent component)
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
const [currentStep, setCurrentStep] = useState<1 | 2>(1);
const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
const [selectedAction, setSelectedAction] = useState<'map' | 'contact' | 'offers' | null>(null);
```

## Components and Interfaces

### 1. LocationCircle (Client Component)

**Purpose**: Clickable circular UI element representing a geographic location.

**File**: `app/components/LocationModal/LocationCircle.tsx`

**Interface**:
```typescript
interface LocationCircleProps {
  location: Location;
  onClick: (locationId: string) => void;
  locale: string;
}
```

**Responsibilities**:
- Display location flag and name
- Handle click events
- Provide hover effects
- Support keyboard interaction
- Apply premium visual styling

**Pseudocode**:
```
function LocationCircle(location, onClick, locale):
  return (
    <button
      onClick={() => onClick(location.id)}
      className="location-circle"
      aria-label={location.name[locale]}
    >
      <div className="flag">{location.flag}</div>
      <div className="name">{location.name[locale]}</div>
    </button>
  )
```

**Styling**:
- Circular shape with gradient background
- Smooth shadow for depth
- Scale transform on hover (1.05)
- Transition duration: 200ms
- Responsive sizing: 80px mobile, 100px desktop

### 2. LocationModal (Client Component)

**Purpose**: Main modal container that manages step flow and displays content.

**File**: `app/components/LocationModal/LocationModal.tsx`

**Interface**:
```typescript
interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  locale: string;
}
```

**State**:
```typescript
const [currentStep, setCurrentStep] = useState<1 | 2>(1);
const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
const [selectedAction, setSelectedAction] = useState<'map' | 'contact' | 'offers' | null>(null);
```

**Responsibilities**:
- Manage modal open/close state
- Handle backdrop click to close
- Handle escape key to close
- Prevent background scrolling when open
- Manage step transitions
- Coordinate between step components
- Apply responsive layout

**Pseudocode**:
```
function LocationModal(isOpen, onClose, locationId, locale):
  [currentStep, setCurrentStep] = useState(1)
  [selectedBranch, setSelectedBranch] = useState(null)
  [selectedAction, setSelectedAction] = useState(null)
  
  branches = get_branches_by_location(locationId)
  location = get_location_by_id(locationId)
  
  useEffect(() => {
    if isOpen:
      document.body.style.overflow = 'hidden'
    else:
      document.body.style.overflow = 'unset'
    
    return cleanup
  }, [isOpen])
  
  useEffect(() => {
    function handleEscape(event):
      if event.key === 'Escape':
        onClose()
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  function handleBranchSelect(branch):
    setSelectedBranch(branch)
    setCurrentStep(2)
  
  function handleActionSelect(action):
    setSelectedAction(action)
    
    if action === 'offers':
      redirect_to_offers(location, branch, locale)
      onClose()
  
  function handleBackdropClick(event):
    if event.target === event.currentTarget:
      onClose()
  
  if not isOpen:
    return null
  
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <StepIndicator currentStep={currentStep} />
        
        if currentStep === 1:
          <BranchSelectionStep
            branches={branches}
            onBranchSelect={handleBranchSelect}
            locale={locale}
          />
        else if currentStep === 2 and selectedAction === null:
          <ActionSelectionStep
            onActionSelect={handleActionSelect}
            locale={locale}
          />
        else if selectedAction === 'map':
          <LocationMapView
            branch={selectedBranch}
            locale={locale}
          />
        else if selectedAction === 'contact':
          <ContactSocialView
            branch={selectedBranch}
            locale={locale}
          />
      </div>
    </div>
  )
```

### 3. StepIndicator (Client Component)

**Purpose**: Visual progress indicator showing current step in the modal flow.

**File**: `app/components/LocationModal/StepIndicator.tsx`

**Interface**:
```typescript
interface StepIndicatorProps {
  currentStep: 1 | 2;
  locale: string;
}
```

**Responsibilities**:
- Display 2 steps: "Select Branch" and "Choose Action"
- Highlight active step
- Show completed steps
- Support RTL layout

**Pseudocode**:
```
function StepIndicator(currentStep, locale):
  steps = [
    { number: 1, label: t('modal.step1') },
    { number: 2, label: t('modal.step2') }
  ]
  
  return (
    <div className="step-indicator">
      for each step in steps:
        <div className={get_step_class(step.number, currentStep)}>
          <div className="step-number">{step.number}</div>
          <div className="step-label">{step.label}</div>
        </div>
        
        if step.number < steps.length:
          <div className="step-connector" />
    </div>
  )

function get_step_class(stepNumber, currentStep):
  if stepNumber < currentStep:
    return 'step-completed'
  else if stepNumber === currentStep:
    return 'step-active'
  else:
    return 'step-inactive'
```

**Styling**:
- Horizontal layout with connecting lines
- Active step: primary color, bold
- Completed step: success color, checkmark
- Inactive step: gray, lighter
- Responsive: stack vertically on mobile

### 4. BranchSelectionStep (Client Component)

**Purpose**: Displays list of branches for the selected location.

**File**: `app/components/LocationModal/BranchSelectionStep.tsx`

**Interface**:
```typescript
interface BranchSelectionStepProps {
  branches: Branch[];
  onBranchSelect: (branch: Branch) => void;
  locale: string;
}
```

**Responsibilities**:
- Display branches as clickable cards
- Show branch name and city
- Handle branch selection
- Provide hover effects
- Support keyboard navigation

**Pseudocode**:
```
function BranchSelectionStep(branches, onBranchSelect, locale):
  return (
    <div className="branch-selection">
      <h2>{t('modal.selectBranch')}</h2>
      
      <div className="branch-grid">
        for each branch in branches:
          <button
            className="branch-card"
            onClick={() => onBranchSelect(branch)}
            key={branch.id}
          >
            <h3>{branch.name[locale]}</h3>
            <p>{branch.city[locale]}</p>
            <span className="material-icons">arrow_forward</span>
          </button>
      </div>
    </div>
  )
```

**Styling**:
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Card with border, shadow, and hover effect
- Scale transform on hover (1.02)
- Smooth transitions

### 5. ActionSelectionStep (Client Component)

**Purpose**: Displays 3 action options after branch selection.

**File**: `app/components/LocationModal/ActionSelectionStep.tsx`

**Interface**:
```typescript
interface ActionSelectionStepProps {
  onActionSelect: (action: 'map' | 'contact' | 'offers') => void;
  locale: string;
}
```

**Responsibilities**:
- Display 3 action cards: Location, Contact & Social, Offers
- Show icon and description for each action
- Handle action selection
- Provide hover effects

**Pseudocode**:
```
function ActionSelectionStep(onActionSelect, locale):
  actions = [
    {
      id: 'map',
      icon: 'location_on',
      title: t('modal.actions.map.title'),
      description: t('modal.actions.map.description')
    },
    {
      id: 'contact',
      icon: 'contact_phone',
      title: t('modal.actions.contact.title'),
      description: t('modal.actions.contact.description')
    },
    {
      id: 'offers',
      icon: 'local_offer',
      title: t('modal.actions.offers.title'),
      description: t('modal.actions.offers.description')
    }
  ]
  
  return (
    <div className="action-selection">
      <h2>{t('modal.chooseAction')}</h2>
      
      <div className="action-grid">
        for each action in actions:
          <button
            className="action-card"
            onClick={() => onActionSelect(action.id)}
            key={action.id}
          >
            <span className="material-icons">{action.icon}</span>
            <h3>{action.title}</h3>
            <p>{action.description}</p>
          </button>
      </div>
    </div>
  )
```

**Styling**:
- Grid layout: 1 column mobile, 3 columns desktop
- Large cards with icon, title, description
- Gradient background or solid with shadow
- Scale transform on hover (1.03)
- Icon size: 48px

### 6. LocationMapView (Client Component)

**Purpose**: Displays branch location on an interactive map.

**File**: `app/components/LocationModal/LocationMapView.tsx`

**Interface**:
```typescript
interface LocationMapViewProps {
  branch: Branch;
  locale: string;
}
```

**Dependencies**:
- `react-leaflet`: MapContainer, TileLayer, Marker, Popup
- `leaflet`: For marker icons

**Responsibilities**:
- Display map centered on branch coordinates
- Show marker at branch location
- Display branch address
- Handle case where coordinates are missing
- Provide zoom controls

**Pseudocode**:
```
function LocationMapView(branch, locale):
  if not branch.coordinates:
    return (
      <div className="map-fallback">
        <span className="material-icons">location_off</span>
        <p>{t('modal.noCoordinates')}</p>
        <p className="address">{branch.address?.[locale]}</p>
      </div>
    )
  
  return (
    <div className="location-map-view">
      <h2>{t('modal.branchLocation')}</h2>
      
      <MapContainer
        center={[branch.coordinates.lat, branch.coordinates.lng]}
        zoom={15}
        className="branch-map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[branch.coordinates.lat, branch.coordinates.lng]}>
          <Popup>
            <div>
              <strong>{branch.name[locale]}</strong>
              <p>{branch.address?.[locale]}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      <div className="address-info">
        <span className="material-icons">place</span>
        <p>{branch.address?.[locale]}</p>
      </div>
    </div>
  )
```

**Styling**:
- Map height: 400px desktop, 300px mobile
- Rounded corners
- Address info below map with icon
- Fallback UI with centered icon and text

### 7. ContactSocialView (Client Component)

**Purpose**: Displays branch contact information and social media links.

**File**: `app/components/LocationModal/ContactSocialView.tsx`

**Interface**:
```typescript
interface ContactSocialViewProps {
  branch: Branch;
  locale: string;
}
```

**Responsibilities**:
- Display phone number as clickable link
- Display operating hours
- Display social media icons with links
- Apply decorative background pattern
- Handle missing contact info

**Pseudocode**:
```
function ContactSocialView(branch, locale):
  social_links = [
    { platform: 'instagram', icon: 'instagram', url: 'https://instagram.com/meemmarket' },
    { platform: 'twitter', icon: 'twitter', url: 'https://twitter.com/meemmarket' },
    { platform: 'facebook', icon: 'facebook', url: 'https://facebook.com/meemmarket' },
    { platform: 'whatsapp', icon: 'whatsapp', url: 'https://wa.me/...' },
    { platform: 'tiktok', icon: 'tiktok', url: 'https://tiktok.com/@meemmarket' }
  ]
  
  return (
    <div className="contact-social-view">
      <h2>{t('modal.contactInfo')}</h2>
      
      <div className="contact-section">
        if branch.phone:
          <div className="contact-item">
            <span className="material-icons">phone</span>
            <a href={`tel:${branch.phone}`}>{branch.phone}</a>
          </div>
        
        if branch.hours:
          <div className="contact-item">
            <span className="material-icons">schedule</span>
            <p>{format_hours(branch.hours.open, branch.hours.close)}</p>
          </div>
      </div>
      
      <div className="social-section">
        <h3>{t('modal.followUs')}</h3>
        <div className="social-grid">
          for each link in social_links:
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
              aria-label={link.platform}
            >
              <i className={`icon-${link.icon}`}></i>
            </a>
        </div>
      </div>
    </div>
  )

function format_hours(open, close):
  return `${open} - ${close}`
```

**Styling**:
- Contact section with icons and info
- Social media grid: 5 columns
- Circular social buttons with brand colors
- Decorative background pattern (gradient or geometric)
- Hover effects on social buttons (scale 1.1)

### 8. Modified HeroSwiper Component

**Purpose**: Integrate location circles into the hero swiper overlay.

**File**: `app/components/HeroSwiper.tsx`

**Modifications**:
- Add LocationCircle components to the content overlay
- Add modal state management
- Position circles in the right side of the hero
- Pass location data to circles

**Pseudocode**:
```
function HeroSwiper(props):
  [isModalOpen, setIsModalOpen] = useState(false)
  [selectedLocationId, setSelectedLocationId] = useState(null)
  
  locations = import_locations()
  locale = useLocale()
  
  function handleLocationClick(locationId):
    setSelectedLocationId(locationId)
    setIsModalOpen(true)
  
  function handleModalClose():
    setIsModalOpen(false)
    setSelectedLocationId(null)
  
  return (
    <div className="hero-swiper-container">
      <Swiper>
        {/* existing swiper slides */}
      </Swiper>
      
      <div className="content-overlay">
        <div className="content-area">
          {/* existing hero content */}
        </div>
        
        <div className="location-circles-container">
          for each location in locations:
            <LocationCircle
              location={location}
              onClick={handleLocationClick}
              locale={locale}
            />
        </div>
      </div>
      
      if isModalOpen and selectedLocationId:
        <LocationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          locationId={selectedLocationId}
          locale={locale}
        />
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
// Modal step type
type ModalStep = 1 | 2;

// Action type
type ActionType = 'map' | 'contact' | 'offers';

// Social media platform type
interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}
```

### Translation Keys Structure

**messages/en.json**:
```json
{
  "modal": {
    "step1": "Select Branch",
    "step2": "Choose Action",
    "selectBranch": "Choose Your Branch",
    "chooseAction": "What would you like to do?",
    "actions": {
      "map": {
        "title": "View Location",
        "description": "See branch location on map"
      },
      "contact": {
        "title": "Contact & Social",
        "description": "Get contact info and social links"
      },
      "offers": {
        "title": "View Offers",
        "description": "Browse location-specific offers"
      }
    },
    "branchLocation": "Branch Location",
    "contactInfo": "Contact Information",
    "followUs": "Follow Us",
    "noCoordinates": "Map location not available",
    "phone": "Phone",
    "hours": "Hours"
  }
}
```

**messages/ar.json**:
```json
{
  "modal": {
    "step1": "اختر الفرع",
    "step2": "اختر الإجراء",
    "selectBranch": "اختر فرعك",
    "chooseAction": "ماذا تريد أن تفعل؟",
    "actions": {
      "map": {
        "title": "عرض الموقع",
        "description": "شاهد موقع الفرع على الخريطة"
      },
      "contact": {
        "title": "التواصل والسوشيال",
        "description": "احصل على معلومات الاتصال وروابط السوشيال"
      },
      "offers": {
        "title": "عرض العروض",
        "description": "تصفح العروض الخاصة بالموقع"
      }
    },
    "branchLocation": "موقع الفرع",
    "contactInfo": "معلومات الاتصال",
    "followUs": "تابعنا",
    "noCoordinates": "الموقع على الخريطة غير متوفر",
    "phone": "الهاتف",
    "hours": "ساعات العمل"
  }
}
```

## Error Handling

### Map Loading Errors

**Scenario**: Leaflet map fails to load in LocationMapView

**Handling**:
- Wrap MapContainer in try-catch or error boundary
- Display fallback UI with address text
- Provide helpful error message
- Log error for debugging

**Implementation**:
```typescript
try {
  return <MapContainer>...</MapContainer>
} catch (error) {
  console.error('Map loading error:', error);
  return (
    <div className="map-error">
      <p>{t('modal.mapError')}</p>
      <p>{branch.address?.[locale]}</p>
    </div>
  );
}
```

### Missing Branch Data

**Scenario**: No branches found for selected location

**Handling**:
- Display empty state in BranchSelectionStep
- Provide helpful message
- Allow user to close modal

**Implementation**:
```typescript
if (branches.length === 0) {
  return (
    <div className="empty-state">
      <span className="material-icons">location_off</span>
      <p>{t('modal.noBranches')}</p>
    </div>
  );
}
```

### Missing Coordinates

**Scenario**: Branch has no coordinates for map view

**Handling**:
- Display fallback UI with address text
- Show location_off icon
- No error thrown

**Implementation**:
```typescript
if (!branch.coordinates) {
  return (
    <div className="map-fallback">
      <span className="material-icons">location_off</span>
      <p>{t('modal.noCoordinates')}</p>
      <p>{branch.address?.[locale]}</p>
    </div>
  );
}
```

### Missing Contact Info

**Scenario**: Branch has no phone or hours

**Handling**:
- Conditionally render only available fields
- Display social media section regardless
- No error thrown

**Implementation**:
```typescript
{branch.phone && (
  <div className="contact-item">
    <a href={`tel:${branch.phone}`}>{branch.phone}</a>
  </div>
)}

{branch.hours && (
  <div className="contact-item">
    <p>{formatHours(branch.hours)}</p>
  </div>
)}
```

### Redirect Errors

**Scenario**: Navigation to offers page fails

**Handling**:
- Use try-catch around router.push
- Log error
- Show toast notification
- Keep modal open

**Implementation**:
```typescript
try {
  const url = `/${locale}/offers?location=${encodeURIComponent(locationName)}&branch=${encodeURIComponent(branchName)}`;
  router.push(url);
  onClose();
} catch (error) {
  console.error('Navigation error:', error);
  // Show toast notification
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Location circle content display

*For any* location in the locations array, when a LocationCircle is rendered for that location, the rendered output should contain the location's flag and the location's name in the current locale.

**Validates: Requirements 1.3**

### Property 2: Modal opening on circle click

*For any* location circle, when a user clicks that circle, the Branch_Modal should open with isOpen state set to true.

**Validates: Requirements 2.1**

### Property 3: Location ID propagation

*For any* location, when its circle is clicked, the Branch_Modal should receive the correct locationId matching that location's id property.

**Validates: Requirements 2.2**

### Property 4: Modal closing interactions

*For any* open modal state, when a user clicks the backdrop or presses the Escape key, the modal should close (isOpen becomes false).

**Validates: Requirements 2.5**

### Property 5: Branch filtering by location

*For any* selected location, when the Branch_Modal opens, the displayed branches should include only branches where branch.locationId equals the selected location's id.

**Validates: Requirements 3.1, 3.2**

### Property 6: Branch locale-specific display

*For any* branch and locale (en or ar), when the branch is displayed in the BranchSelectionStep, the displayed name and city should use the values from branch.name[locale] and branch.city[locale].

**Validates: Requirements 3.3**

### Property 7: Branch selection step advancement

*For any* branch in the branch list, when a user clicks that branch, the modal should advance to step 2 (currentStep becomes 2) and store the selected branch.

**Validates: Requirements 3.5**

### Property 8: Map centering on coordinates

*For any* branch with defined coordinates, when the LocationMapView is displayed for that branch, the map should be centered on [branch.coordinates.lat, branch.coordinates.lng].

**Validates: Requirements 5.2**

### Property 9: Map marker display

*For any* branch with defined coordinates, when the LocationMapView is displayed for that branch, a marker should be rendered at the branch's coordinates.

**Validates: Requirements 5.3**

### Property 10: Branch address display

*For any* branch with a defined address, when displayed in any view (map or contact), the address should be shown in the current locale (branch.address[locale]).

**Validates: Requirements 5.4**

### Property 11: Conditional phone display

*For any* branch, when displayed in the ContactSocialView, the phone number should be displayed if and only if branch.phone is defined and not null.

**Validates: Requirements 6.2**

### Property 12: Conditional hours display

*For any* branch, when displayed in the ContactSocialView, the operating hours should be displayed if and only if branch.hours is defined and not null.

**Validates: Requirements 6.3**

### Property 13: Phone link formatting

*For any* branch with a defined phone number, when displayed in the ContactSocialView, the phone number should be rendered as a clickable link with href="tel:{phone}".

**Validates: Requirements 6.5**

### Property 14: Offers redirect URL construction

*For any* selected location, branch, and locale, when the user selects the "Offers" action, the redirect URL should be "/{locale}/offers?location={location.name[locale]}&branch={branch.name[locale]}" with proper URL encoding.

**Validates: Requirements 7.2, 7.3, 7.4**

## Testing Strategy

### Dual Testing Approach

This feature does not require property-based testing as specified by the user ("No tests are required for this feature"). However, for production quality, we recommend:

- **Unit tests**: Verify component rendering, user interactions, and edge cases
- **Integration tests**: Verify modal flow, step transitions, and data handling

### Unit Testing (Recommended)

**Framework**: Jest with React Testing Library

**Test Categories**:

1. **Component Rendering Tests**
   - Verify LocationCircle renders with flag and name
   - Verify LocationModal renders with correct step
   - Verify StepIndicator highlights active step
   - Verify BranchSelectionStep renders branch cards
   - Verify ActionSelectionStep renders 3 action cards

2. **User Interaction Tests**
   - Test location circle click opens modal
   - Test branch card click advances to step 2
   - Test action card click shows corresponding view
   - Test backdrop click closes modal
   - Test escape key closes modal
   - Test close button closes modal

3. **Step Flow Tests**
   - Test step 1 displays branches
   - Test branch selection advances to step 2
   - Test step 2 displays actions
   - Test offers action redirects and closes modal
   - Test map action displays LocationMapView
   - Test contact action displays ContactSocialView

4. **Locale Tests**
   - Test Arabic locale displays RTL layout
   - Test English locale displays LTR layout
   - Test branch names display in correct locale
   - Test translation keys resolve correctly

5. **Edge Cases**
   - Test branches without coordinates show fallback
   - Test branches without phone/hours don't display those fields
   - Test empty branch list shows empty state
   - Test map loading error shows fallback

6. **Responsive Tests**
   - Test modal is full screen on mobile
   - Test modal is centered dialog on desktop
   - Test location circles resize on mobile
   - Test grid layouts adapt to viewport

### Integration Testing (Recommended)

1. **End-to-End Flow**
   - Test complete flow: click circle → select branch → select action
   - Test offers redirect with correct URL parameters
   - Test modal state resets on close
   - Test multiple modal open/close cycles

2. **Data Integration**
   - Test modal receives correct branches for location
   - Test branch data displays correctly in all views
   - Test URL parameters match branch/location names

### Manual Testing Checklist

- [ ] Location circles visible and clickable on hero
- [ ] Modal opens with smooth animation
- [ ] Step indicator updates correctly
- [ ] Branch selection works on all devices
- [ ] Action selection works on all devices
- [ ] Map displays correctly with marker
- [ ] Contact info displays correctly
- [ ] Social media links work
- [ ] Offers redirect works with correct parameters
- [ ] Modal closes on backdrop click
- [ ] Modal closes on escape key
- [ ] Modal closes on close button
- [ ] RTL layout works correctly in Arabic
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility works

