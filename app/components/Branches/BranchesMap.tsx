'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { LatLngBounds, LatLngExpression, Icon } from 'leaflet';
import type L from 'leaflet';
import { Branch } from '@/app/types/branch';
import { Phone, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface BranchesMapProps {
  branches: Branch[];
  selectedBranch?: Branch | null;
  onBranchSelect?: (branch: Branch) => void;
  locale: 'ar' | 'en';
}

/**
 * Performance Optimizations:
 * 1. Marker icons are created once and reused (not recreated on every render)
 * 2. BranchMarker component is memoized with custom comparison to prevent unnecessary re-renders
 * 3. Only markers with changed selection state will re-render when selection changes
 * 4. Click handlers are memoized with useCallback for stable references
 */

// Custom marker icon using Meem logo - memoized for performance
const defaultMarkerIcon = new Icon({
  iconUrl: '/meem-logo.png',
  iconSize: [44, 44],
  iconAnchor: [22, 44], // Bottom center for proper positioning
  popupAnchor: [0, -44],
  className: 'default-marker'
});

const selectedMarkerIcon = new Icon({
  iconUrl: '/meem-logo.png',
  iconSize: [54, 54],
  iconAnchor: [27, 54], // Adjusted for larger size
  popupAnchor: [0, -54],
  className: 'selected-marker'
});

const getMarkerIcon = (isSelected: boolean) => {
  return isSelected ? selectedMarkerIcon : defaultMarkerIcon;
};

// Memoized marker component to prevent unnecessary re-renders
const BranchMarker = React.memo(({ 
  branch, 
  isSelected, 
  onBranchSelect, 
  locale 
}: { 
  branch: Branch; 
  isSelected: boolean; 
  onBranchSelect?: (branch: Branch) => void; 
  locale: 'ar' | 'en';
}) => {
  const position: LatLngExpression = [
    branch.coordinates!.lat,
    branch.coordinates!.lng
  ];

  const markerAriaLabel = `${branch.name[locale]}, ${branch.city[locale]}${isSelected ? ` (${locale === 'ar' ? 'محدد' : 'selected'})` : ''}`;
  
  // Memoize click handler to prevent recreation on every render
  const handleClick = React.useCallback(() => {
    if (onBranchSelect) {
      onBranchSelect(branch);
    }
  }, [branch, onBranchSelect]);

  return (
    <Marker
      key={branch.id}
      position={position}
      icon={getMarkerIcon(isSelected)}
      eventHandlers={{
        click: handleClick
      }}
      aria-label={markerAriaLabel}
    >
      <Tooltip direction="top" offset={[0, -40]} opacity={0.9}>
        <div className="text-sm font-semibold">
          {branch.name[locale]}
        </div>
      </Tooltip>
      <Popup className="custom-popup">
        <div className="p-3 min-w-[220px]">
          <h3 className="font-bold text-lg mb-3 text-primary border-b border-gray-200 pb-2">
            {branch.name[locale]}
          </h3>
          {branch.address && (
            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
              {branch.address[locale]}
            </p>
          )}
          <p className="text-sm text-gray-600 mb-3 font-medium">
            {branch.city[locale]}
          </p>
          {branch.phone && (
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-primary me-2 flex-shrink-0" />
              <span>{branch.phone}</span>
            </div>
          )}
          {branch.hours && (
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 text-primary me-2 flex-shrink-0" />
              <span>
                {branch.hours.open} - {branch.hours.close}
              </span>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Only re-render if these specific props change
  return (
    prevProps.branch.id === nextProps.branch.id &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.locale === nextProps.locale
  );
});

function BranchesMapContent({ branches, selectedBranch, onBranchSelect, locale }: BranchesMapProps) {
  const [mapError, setMapError] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Filter branches with valid coordinates
  const branchesWithCoords = useMemo(() => {
    return branches.filter(
      (branch) =>
        branch.coordinates &&
        typeof branch.coordinates.lat === 'number' &&
        typeof branch.coordinates.lng === 'number' &&
        !isNaN(branch.coordinates.lat) &&
        !isNaN(branch.coordinates.lng)
    );
  }, [branches]);

  // Animate map to selected branch
  useEffect(() => {
    if (selectedBranch && selectedBranch.coordinates && mapRef.current) {
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

  // Calculate map center from branch coordinates
  const mapCenter = useMemo((): LatLngExpression => {
    if (branchesWithCoords.length === 0) {
      // Default center (Middle East region)
      return [25.0, 45.0];
    }

    const avgLat =
      branchesWithCoords.reduce((sum, branch) => sum + branch.coordinates!.lat, 0) /
      branchesWithCoords.length;
    const avgLng =
      branchesWithCoords.reduce((sum, branch) => sum + branch.coordinates!.lng, 0) /
      branchesWithCoords.length;

    return [avgLat, avgLng];
  }, [branchesWithCoords]);

  // Calculate map bounds to fit all markers
  const mapBounds = useMemo((): LatLngBounds | undefined => {
    if (branchesWithCoords.length === 0) {
      return undefined;
    }

    const lats = branchesWithCoords.map((branch) => branch.coordinates!.lat);
    const lngs = branchesWithCoords.map((branch) => branch.coordinates!.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return new LatLngBounds([minLat, minLng], [maxLat, maxLng]);
  }, [branchesWithCoords]);

  // Error state UI
  if (mapError) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <p className="text-gray-700 mb-4 text-lg font-medium">
          {locale === 'ar' ? 'تعذر تحميل الخريطة' : 'Unable to load map'}
        </p>
        <p className="text-gray-500 mb-6">
          {locale === 'ar'
            ? 'يرجى المحاولة مرة أخرى لاحقاً'
            : 'Please try again later'}
        </p>
        <button
          onClick={() => setMapError(false)}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]"
        >
          {locale === 'ar' ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  // Empty state when no branches have coordinates
  if (branchesWithCoords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-gray-700 text-lg">
          {locale === 'ar'
            ? 'لا توجد فروع بإحداثيات متاحة'
            : 'No branches with coordinates available'}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={6}
        bounds={mapBounds}
        boundsOptions={{ padding: [50, 50] }}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {branchesWithCoords.map((branch) => {
          const isSelected = selectedBranch?.id === branch.id;
          
          return (
            <BranchMarker
              key={branch.id}
              branch={branch}
              isSelected={isSelected}
              onBranchSelect={onBranchSelect}
              locale={locale}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

// Error boundary wrapper component
class MapErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map error:', error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function BranchesMap(props: BranchesMapProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-700 mb-4">
          {props.locale === 'ar' ? 'تعذر تحميل الخريطة' : 'Unable to load map'}
        </p>
        <button
          onClick={() => setHasError(false)}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px]"
        >
          {props.locale === 'ar' ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <MapErrorBoundary onError={() => setHasError(true)}>
      <BranchesMapContent {...props} />
    </MapErrorBoundary>
  );
}
