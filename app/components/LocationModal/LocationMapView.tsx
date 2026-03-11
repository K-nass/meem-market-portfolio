'use client';

import { Branch } from '@/app/types/branch';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { MapPinOff, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface LocationMapViewProps {
  branch: Branch;
  locale: string;
}

export default function LocationMapView({ branch, locale }: LocationMapViewProps) {
  const t = useTranslations('modal');
  const [customIcon, setCustomIcon] = useState<any>(null);

  // Fix Leaflet icon issue in Next.js
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      
      // Delete default icon to prevent conflicts
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      
      // Create custom icon using Leaflet's default icon with CDN URLs
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      setCustomIcon(icon);
    }
  }, []);

  // Handle missing coordinates with fallback UI
  if (!branch.coordinates) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <MapPinOff className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">{t('noCoordinates')}</p>
        {branch.address?.[locale as 'en' | 'ar'] && (
          <p className="text-gray-800 font-medium">
            {branch.address[locale as 'en' | 'ar']}
          </p>
        )}
      </div>
    );
  }

  // Don't render map until icon is loaded
  if (!customIcon) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="location-map-view">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        {t('branchLocation')}
      </h2>

      {/* Map Container */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-md mb-4">
        <MapContainer
          center={[branch.coordinates.lat, branch.coordinates.lng]}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={[branch.coordinates.lat, branch.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-center">
                <strong className="block mb-1">
                  {branch.name[locale as 'en' | 'ar']}
                </strong>
                {branch.address?.[locale as 'en' | 'ar'] && (
                  <p className="text-sm text-gray-600">
                    {branch.address[locale as 'en' | 'ar']}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Address Info */}
      {branch.address?.[locale as 'en' | 'ar'] && (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="w-5 h-5 text-primary mt-0.5" />
          <p className="text-gray-800 flex-1">
            {branch.address[locale as 'en' | 'ar']}
          </p>
        </div>
      )}
    </div>
  );
}
