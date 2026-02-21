'use client';

import { useEffect } from 'react';
import ErrorState from '@/app/components/ui/ErrorState';
import { useTranslations } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('common');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('SEGMENT_ERROR:', error);
    }, [error]);

    return (
        <ErrorState
            title={t('errorTitle')}
            message={t('errorMessage')}
            retryLabel={t('retry')}
            onRetry={() => reset()}
        />
    );
}
