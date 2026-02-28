import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function OurFields() {
    const t = useTranslations('ourFields');

    return (
        <section id='products' className="max-w-7xl mx-auto px-6 py-12 lg:py-20 font-arabic">
            {/* Intro Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
                <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold font-bold text-xs uppercase tracking-wider w-fit">
                        <span className="material-symbols-outlined text-sm">stars</span>
                        {t('introBadge')}
                    </div>
                    <h2 className="text-primary text-4xl lg:text-6xl font-black leading-tight">
                        {t('title')} <span className="text-gold">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed text-justify">
                        {t('introDescription')}
                    </p>
                </div>
                <div className="lg:col-span-6 flex items-center bg-white/50 p-8 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="relative">
                        <span className="material-symbols-outlined text-primary/10 text-8xl absolute -top-12 -right-8 select-none">format_quote</span>
                        <p className="text-primary-dark text-xl font-medium leading-relaxed italic relative z-10">
                            "{t('quote')}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Portfolio Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {/* Large Visual Anchor */}
                <div className="md:col-span-4 lg:col-span-4 lg:row-span-2 relative overflow-hidden rounded-2xl group bento-card border-4 border-white shadow-xl min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent z-10"></div>
                    <Image
                        src="/meem-market.jpg"
                        alt={t('imageCard.title')}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                        priority
                    />
                    <div className="absolute bottom-0 right-0 p-8 z-20 text-white w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-[2px] w-12 bg-gold"></div>
                            <span className="text-gold font-bold text-sm tracking-widest uppercase">{t('imageCard.badge')}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-2">{t('imageCard.title')}</h3>
                        <p className="text-white/80 max-w-lg">{t('imageCard.description')}</p>
                    </div>
                </div>

                {/* Highlight Card 1 */}
                <div className="md:col-span-2 lg:col-span-2 bg-white p-8 rounded-2xl bento-card flex flex-col justify-between border border-slate-100">
                    <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
                    </div>
                    <div>
                        <h4 className="text-primary text-xl font-bold mb-2">{t('highlights.variety.title')}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{t('highlights.variety.description')}</p>
                    </div>
                </div>

                {/* Highlight Card 2 */}
                <div className="md:col-span-2 lg:col-span-2 bg-primary text-white p-8 rounded-2xl bento-card flex flex-col justify-between shadow-lg shadow-primary/20">
                    <div className="size-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-gold-light text-3xl">verified</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2">{t('highlights.quality.title')}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{t('highlights.quality.description')}</p>
                    </div>
                </div>

                {/* Highlight Card 3 */}
                <div className="md:col-span-2 lg:col-span-2 bg-gold-light/30 border border-gold/20 p-8 rounded-2xl bento-card flex flex-col justify-between">
                    <div className="size-14 bg-gold rounded-xl flex items-center justify-center mb-6 shadow-sm">
                        <span className="material-symbols-outlined text-white text-3xl">payments</span>
                    </div>
                    <div>
                        <h4 className="text-primary-dark text-xl font-bold mb-2">{t('highlights.value.title')}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{t('highlights.value.description')}</p>
                    </div>
                </div>

                {/* Highlight Card 4 */}
                <div className="md:col-span-2 lg:col-span-2 bg-white p-8 rounded-2xl bento-card flex flex-col justify-between border border-slate-100">
                    <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">home_work</span>
                    </div>
                    <div>
                        <h4 className="text-primary text-xl font-bold mb-2">{t('highlights.convenience.title')}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{t('highlights.convenience.description')}</p>
                    </div>
                </div>

                {/* Call to Action Grid Element */}
                <div className="md:col-span-4 lg:col-span-2 bg-white border-2 border-dashed border-primary/20 p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
                    <div className="size-12 rounded-full bg-primary/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">add_circle</span>
                    </div>
                    <h4 className="text-primary font-bold text-lg">{t('cta.title')}</h4>
                    <p className="text-slate-500 text-xs">{t('cta.subtitle')}</p>
                    <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors mt-2">
                        {t('cta.link')}
                    </button>
                </div>
            </div>

            {/* Footer Decoration */}
            <div className="mt-20 flex flex-col items-center text-center gap-6 opacity-60">
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-24 bg-primary/20"></div>
                    <div className="flex gap-2">
                        <div className="size-2 rounded-full bg-gold"></div>
                        <div className="size-2 rounded-full bg-primary"></div>
                        <div className="size-2 rounded-full bg-gold"></div>
                    </div>
                    <div className="h-[1px] w-24 bg-primary/20"></div>
                </div>
                <p className="text-primary text-sm font-medium">{t('footer')}</p>
            </div>
        </section>
    );
};