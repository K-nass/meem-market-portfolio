'use client';

import { useTranslations } from 'next-intl';

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

function getErrorMessage(error: Error | null, t: (key: string) => string): string {
  if (!error) {
    return t('errors.unknown');
  }

  // Check for network errors
  if (error.message.includes('network') || error.message.includes('Network')) {
    return t('errors.network');
  }

  // Check for server errors (5xx)
  if ('response' in error && typeof error.response === 'object' && error.response !== null) {
    const response = error.response as { status?: number };
    if (response.status && response.status >= 500) {
      return t('errors.server');
    }
  }

  // Default to unknown error
  return t('errors.unknown');
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const t = useTranslations('modal');
  const errorMessage = getErrorMessage(error, t);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Error icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Error message */}
      <p className="text-gray-700 text-lg mb-6 text-center max-w-md">
        {errorMessage}
      </p>

      {/* Retry button */}
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t('retry')}
      </button>
    </div>
  );
}
