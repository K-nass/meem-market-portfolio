# Requirements Document

## Introduction

This document specifies the requirements for implementing a modern location-based branch filtering system on the home page. The system will add location circles to the home page hero swiper section, featuring a premium multi-step modal for branch selection and action choices. This will also enable removing the legacy sidebar-based filtering from the offers page.

## Glossary

- **Location_Circle**: A clickable circular UI element representing a geographic location (Saudi Arabia or Kuwait)
- **Branch_Modal**: A modal dialog that displays branches for a selected location and provides action options
- **Step_Indicator**: A visual progress component showing the current step in the multi-step modal flow
- **Action_Option**: One of three choices available after branch selection (Location Map, Contact & Social, Offers)
- **HeroSwiper**: The hero swiper component on the home page that displays rotating hero images
- **BranchFilterSidebar**: The legacy sidebar-based filtering component on the home page to be removed
- **LocationFilter**: The filter component on the offers page (remains unchanged)
- **Branch_Data**: Structured data containing branch information including id, locationId, name, address, city, coordinates, phone, and hours
- **Location_Data**: Structured data containing location information including id, code, name, and flag

## Requirements

### Requirement 1: Location Circle Display

**User Story:** As a user, I want to see location options directly in the home page hero section, so that I can quickly access branch information from the main landing area.

#### Acceptance Criteria

1. THE HeroSwiper SHALL display exactly 2 Location_Circles representing Saudi Arabia and Kuwait
2. WHEN the home page loads, THE Location_Circles SHALL be positioned within or overlaying the HeroSwiper component
3. THE Location_Circles SHALL display the location flag and name from Location_Data
4. THE Location_Circles SHALL be visually distinct and clickable with hover effects
5. THE Location_Circles SHALL maintain responsive layout on mobile, tablet, and desktop viewports

### Requirement 2: Branch Modal Trigger

**User Story:** As a user, I want to click on a location circle and see a modern modal, so that I can interact with branch information in a premium interface.

#### Acceptance Criteria

1. WHEN a user clicks a Location_Circle, THE system SHALL open the Branch_Modal
2. WHEN the Branch_Modal opens, THE system SHALL pass the selected location's id to the modal
3. THE Branch_Modal SHALL display with smooth animation transitions
4. WHEN the Branch_Modal is open, THE system SHALL prevent background scrolling
5. WHEN a user clicks outside the Branch_Modal or presses escape, THE system SHALL close the modal

### Requirement 3: Branch Selection Step

**User Story:** As a user, I want to choose a branch from the selected location, so that I can access specific branch information.

#### Acceptance Criteria

1. WHEN the Branch_Modal opens, THE system SHALL display Step 1 showing all branches for the selected location
2. THE system SHALL filter Branch_Data by the selected location's locationId
3. WHEN displaying branches, THE system SHALL show branch name and city in the current locale (en or ar)
4. THE branches SHALL be displayed as clickable cards or list items with hover effects
5. WHEN a user clicks a branch, THE system SHALL proceed to Step 2 and store the selected branch

### Requirement 4: Action Options Step

**User Story:** As a user, I want to choose what information I need after selecting a branch, so that I can quickly access the specific details I'm looking for.

#### Acceptance Criteria

1. WHEN a user selects a branch, THE system SHALL display Step 2 showing 3 Action_Options
2. THE Action_Options SHALL include "Location" with a map icon
3. THE Action_Options SHALL include "Contact & Social" with a contact icon
4. THE Action_Options SHALL include "Offers" with an offers icon
5. THE Action_Options SHALL be displayed as prominent clickable cards with icons and descriptions

### Requirement 5: Location Map Action

**User Story:** As a user, I want to view the branch location on a map, so that I can find directions to the branch.

#### Acceptance Criteria

1. WHEN a user selects the "Location" Action_Option, THE system SHALL display a map component
2. THE map SHALL center on the branch's coordinates from Branch_Data
3. THE map SHALL display a marker at the branch location
4. THE map SHALL show the branch address below or beside the map
5. WHEN coordinates are not available, THE system SHALL display the branch address as text

### Requirement 6: Contact & Social Action

**User Story:** As a user, I want to view contact information and social media links, so that I can reach out to the branch through my preferred channel.

#### Acceptance Criteria

1. WHEN a user selects the "Contact & Social" Action_Option, THE system SHALL display contact information
2. THE system SHALL display the branch phone number from Branch_Data
3. THE system SHALL display the branch operating hours from Branch_Data
4. THE system SHALL display social media links as clickable icon buttons (Instagram, Twitter/X, Facebook, WhatsApp, TikTok)
5. THE system SHALL format phone numbers as clickable tel: links
6. THE social media section SHALL use a decorative background pattern for visual appeal

### Requirement 7: Offers Action

**User Story:** As a user, I want to view offers for the selected branch, so that I can see location-specific deals.

#### Acceptance Criteria

1. WHEN a user selects the "Offers" Action_Option, THE system SHALL redirect to the offers page
2. THE system SHALL append the location name (in current locale) as a URL parameter named "location"
3. THE system SHALL append the branch name (in current locale) as a URL parameter named "branch"
4. THE redirect URL SHALL follow the format: /{locale}/offers?location={locationName}&branch={branchName}
5. THE system SHALL close the Branch_Modal before redirecting

### Requirement 8: Step Indicator

**User Story:** As a user, I want to see which step I'm on in the modal, so that I understand my progress through the selection flow.

#### Acceptance Criteria

1. THE Branch_Modal SHALL display a Step_Indicator at the top or bottom of the modal
2. THE Step_Indicator SHALL show 2 steps: "Select Branch" and "Choose Action"
3. WHEN on Step 1, THE Step_Indicator SHALL highlight step 1 as active
4. WHEN on Step 2, THE Step_Indicator SHALL highlight step 2 as active
5. THE Step_Indicator SHALL use visual styling to distinguish active, completed, and inactive steps

### Requirement 9: Internationalization Support

**User Story:** As a user, I want the interface to display in my preferred language, so that I can understand all content in Arabic or English.

#### Acceptance Criteria

1. THE system SHALL display all text content using next-intl translation keys
2. WHEN the locale is "ar", THE system SHALL display branch names, addresses, and cities in Arabic
3. WHEN the locale is "en", THE system SHALL display branch names, addresses, and cities in English
4. THE system SHALL support RTL layout when locale is "ar"
5. THE system SHALL use the locale-specific name property from Branch_Data and Location_Data

### Requirement 10: Responsive Design

**User Story:** As a user, I want the interface to work seamlessly on any device, so that I can access branch information from mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Location_Circles SHALL adapt their size and spacing for mobile viewports (< 768px)
2. THE Branch_Modal SHALL occupy full screen on mobile devices
3. THE Branch_Modal SHALL display as a centered dialog on tablet and desktop viewports
4. THE branch list and action options SHALL stack vertically on mobile and display in grid on larger screens
5. THE map component SHALL be responsive and maintain aspect ratio across all viewports

### Requirement 11: Legacy Component Removal

**User Story:** As a developer, I want to remove the old sidebar filtering system from the home page, so that the codebase remains clean and maintainable.

#### Acceptance Criteria

1. THE system SHALL remove the BranchFilterSidebar component from the home page
2. THE system SHALL remove the BranchFilterSidebar import statement from the home page
3. THE system SHALL remove both desktop and mobile/tablet BranchFilterSidebar instances from the home page layout
4. THE system SHALL remove any unused BranchFilterSidebar component files
5. THE LocationFilter component on the offers page SHALL remain unchanged

### Requirement 12: Premium Visual Design

**User Story:** As a user, I want the interface to look modern and premium, so that I have confidence in the brand quality.

#### Acceptance Criteria

1. THE Location_Circles SHALL use smooth shadows, gradients, or borders for depth
2. THE Branch_Modal SHALL use a backdrop blur or overlay effect
3. THE modal content SHALL use consistent spacing, typography, and color scheme
4. THE interactive elements SHALL provide visual feedback on hover and active states
5. THE animations SHALL be smooth with appropriate easing functions (duration 200-300ms)
