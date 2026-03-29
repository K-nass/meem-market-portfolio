'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function LocalizedNotFound() {
    const t = useTranslations('common');

    return (
        <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh] bg-pattern">
            <div className="text-center">
                <p className="text-8xl font-black text-primary/10 select-none leading-none mb-0">404</p>
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 -mt-4">
                    <span className="material-icons-outlined text-4xl text-primary">search_off</span>
                </div>
                <h1 className="text-3xl font-black text-primary-dark mb-3">{t('notFoundTitle')}</h1>
                <p className="text-secondary-text mb-10 max-w-sm mx-auto">{t('notFoundMessage')}</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl"
                >
                    <span className="material-icons-outlined text-xl">home</span>
                    {t('goHome')}
                </Link>
            </div>
        </div>
    );
}
