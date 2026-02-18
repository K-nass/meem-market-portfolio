'use client';

export default function BranchCardSkeleton() {
  return (
    <div className="p-4 sm:p-5 md:p-6 rounded-xl border-2 border-gray-200 bg-white shadow-md animate-pulse">
      {/* Branch name skeleton */}
      <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Address skeleton */}
      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>

      {/* City skeleton */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>

      {/* Phone skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>

      {/* Hours skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
