import { getTranslations } from 'next-intl/server';
import HeroSwiper from '../HeroSwiper';

export default async function Hero() {
    const t = await getTranslations('hero');

    return (
        <header className="relative overflow-hidden">
            <HeroSwiper
                season={t('season')}
                mainHeading={t('mainHeading')}
                subheading={t('subheading')}
                callToAction={t('callToAction')}
                exploreButton={t('exploreOffers')}
                downloadButton={t('downloadCalendar')}
            />
        </header>
    );
}
