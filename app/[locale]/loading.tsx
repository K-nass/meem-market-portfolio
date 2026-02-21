import { useTranslations } from 'next-intl';

export default function Loading() {
    const t = useTranslations('common');

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-4">
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-primary animate-spin"></div>

                {/* Inner Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <h3 className="text-lg font-bold text-slate-900 animate-pulse">
                    {t('loadingTitle')}
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                    {t('loadingMessage')}
                </p>
            </div>
        </div>
    );
}
