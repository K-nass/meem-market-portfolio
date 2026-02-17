'use client';

import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngBounds, LatLngExpression, Icon } from 'leaflet';
import { Branch } from '@/app/types/branch';
import 'leaflet/dist/leaflet.css';

interface BranchesMapProps {
  branches: Branch[];
  selectedBranch?: Branch | null;
  onBranchSelect?: (branch: Branch) => void;
  locale: 'ar' | 'en';
}

// Custom marker icon to fix default icon issue in Next.js
const createCustomIcon = (isSelected: boolean = false) => {
  return new Icon({
    iconUrl: isSelected 
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function BranchesMapContent({ branches, selectedBranch, onBranchSelect, locale }: BranchesMapProps) {
  const [mapError, setMapError] = useState(false);

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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
          const position: LatLngExpression = [
            branch.coordinates!.lat,
            branch.coordinates!.lng
          ];

          return (
            <Marker
              key={branch.id}
              position={position}
              icon={createCustomIcon(isSelected)}
              eventHandlers={{
                click: () => {
                  if (onBranchSelect) {
                    onBranchSelect(branch);
                  }
                }
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2">{branch.name[locale]}</h3>
                  {branch.address && (
                    <p className="text-sm text-gray-600 mb-1">
                      {branch.address[locale]}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-2">{branch.city[locale]}</p>
                  {branch.phone && (
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">
                        {locale === 'ar' ? 'الهاتف: ' : 'Phone: '}
                      </span>
                      {branch.phone}
                    </p>
                  )}
                  {branch.hours && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">
                        {locale === 'ar' ? 'ساعات العمل: ' : 'Hours: '}
                      </span>
                      {branch.hours.open} - {branch.hours.close}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
