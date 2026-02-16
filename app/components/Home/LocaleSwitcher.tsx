'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const newLocale = locale === 'ar' ? 'en' : 'ar';
        router.replace(pathname, { locale: newLocale });
        router.refresh();
    };

    return (
        <button
            onClick={switchLocale}
            className="font-arabic text-primary font-bold hover:opacity-80 transition-opacity"
        >
            {locale === 'ar' ? 'English' : 'عربي'}
        </button>
    );
}
