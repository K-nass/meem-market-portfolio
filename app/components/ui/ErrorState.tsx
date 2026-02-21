'use client';

import { RefreshCw, AlertCircle } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    message?: string;
    retryLabel?: string;
    onRetry?: () => void;
    isFullPage?: boolean;
}

export default function ErrorState({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again.',
    retryLabel = 'Try Again',
    onRetry,
    isFullPage = true,
}: ErrorStateProps) {
    const content = (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-600 mb-8">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
                >
                    <RefreshCw className="w-4 h-4" />
                    {retryLabel}
                </button>
            )}
        </div>
    );

    if (!isFullPage) return content;

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            {content}
        </div>
    );
}
