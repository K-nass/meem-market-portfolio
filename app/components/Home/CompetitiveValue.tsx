import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function CompetitiveValue() {
    const t = await getTranslations('competitiveValue');

    const features = [
        {
            key: 'variety',
            icon: 'verified',
            title: t('varietyTitle'),
            desc: t('varietyDesc'),
            gradient: 'from-primary to-primary-dark',
        },
        {
            key: 'quality',
            icon: 'workspace_premium',
            title: t('qualityTitle'),
            desc: t('qualityDesc'),
            gradient: 'from-primary-dark to-primary',
        },
        {
            key: 'savings',
            icon: 'savings',
            title: t('savingsTitle'),
            desc: t('savingsDesc'),
            gradient: 'from-primary to-primary-dark',
        },
    ];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-background-light">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-pattern opacity-30"></div>

            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Label */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3">
                        <div className="h-px w-12 bg-gold/60"></div>
                        <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
                            {t('sectionLabel')}
                        </span>
                        <div className="h-px w-12 bg-gold/60"></div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-primary-dark mb-6 font-arabic">
                    {t('title')}
                </h2>

                {/* Decorative underline */}
                <div className="flex items-center justify-center gap-2 mb-16">
                    <div className="h-[3px] w-16 bg-gold rounded-full"></div>
                    <div className="h-[3px] w-8 bg-primary rounded-full"></div>
                    <div className="h-[3px] w-16 bg-gold rounded-full"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Image Side */}
                    <div className="lg:col-span-5 order-1 lg:order-1">
                        <div className="relative group">
                            {/* Decorative border frame */}
                            <div className="absolute -inset-3 rounded-[28px] border-2 border-dashed border-gold/25 group-hover:border-gold/40 transition-colors duration-500"></div>

                            {/* Gold accent corner decorations */}
                            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-[3px] border-l-[3px] border-gold rounded-tl-xl"></div>
                            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[3px] border-r-[3px] border-gold rounded-tr-xl"></div>
                            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-[3px] border-l-[3px] border-gold rounded-bl-xl"></div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-[3px] border-r-[3px] border-gold rounded-br-xl"></div>

                            {/* Image container with shadow */}
                            <div className="relative overflow-hidden rounded-[20px] shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                                <Image
                                    src="/market.webp"
                                    alt="Meem Market Shopping Experience"
                                    width={600}
                                    height={750}
                                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                />
                                {/* Gradient overlay at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-dark/40 to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Text + Features Side */}
                    <div className="lg:col-span-7 order-2 lg:order-2">
                        {/* Description */}
                        <div className="mb-10">
                            <p className="text-base md:text-lg text-secondary-text leading-[2] font-arabic">
                                {t('description')}
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="space-y-5">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.key}
                                    className="group flex items-center gap-5 p-5 rounded-2xl bg-white border border-gray-200/60 hover:border-gold/40 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-0.5 cursor-default"
                                    style={{ animationDelay: `${index * 120}ms` }}
                                >
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                                        <span className="material-icons-outlined text-white text-2xl">
                                            {feature.icon}
                                        </span>
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-bold text-primary-dark group-hover:text-primary transition-colors duration-300 mb-0.5">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-secondary-text">
                                            {feature.desc}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                                        <span className="material-icons-outlined text-gold text-lg rtl:rotate-180">
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </section>
    );
}
