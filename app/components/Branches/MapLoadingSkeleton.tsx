'use client';

export default function MapLoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-xl shadow-lg animate-pulse">
      {/* Map icon skeleton */}
      <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4"></div>
      
      {/* Loading text skeleton */}
      <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
      
      {/* Subtext skeleton */}
      <div className="h-4 bg-gray-200 rounded w-48"></div>
    </div>
  );
}
