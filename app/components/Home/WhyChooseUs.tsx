import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function WhyChooseUs() {
    const t = await getTranslations('whyChooseUs');

    return (
        <section className="flex-1 px-6 lg:px-40 py-16">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold mb-6 border border-gold/20">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span className="text-xs font-bold uppercase tracking-widest">{t('badge')}</span>
                </div>
                <h1 className="text-primary-dark tracking-tight text-4xl lg:text-6xl font-bold leading-tight mb-6">
                    {t('title')}
                </h1>
                <div className="w-24 h-1.5 bg-gold mx-auto rounded-full mb-8"></div>
                <p className="text-secondary-text text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    {t('description')}
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Card 1: Many Products */}
                <div className="group flex flex-col  bg-gradient-to-br from-[#003366] via-[#004080] to-[#002952] text-white p-8 rounded-2xl shadow-lg border border-primary/5 hover:border-gold/30 hover:translate-y-[-8px] transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                    </div>
                    <div className="mb-6">
                        <div className="w-full h-48 bg-primary rounded-xl overflow-hidden mb-6 border border-primary/5">
                            <Image
                                src="/Many-products-iconz.png"
                                alt={t('manyProducts.title')}
                                width={400}
                                height={300}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-primary-dark text-2xl font-bold mb-4">{t('manyProducts.title')}</h3>
                        <p className="text-secondary-text text-base leading-relaxed">
                            {t('manyProducts.description')}
                        </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center gap-2 text-gold font-bold text-sm">
                        <span>{t('manyProducts.link')}</span>
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </div>
                </div>

                {/* Card 2: Spacious Areas */}
                <div className="group flex flex-col bg-gradient-to-br from-[#003366] via-[#004080] to-[#002952] text-white p-8 rounded-2xl shadow-lg border border-primary/5 hover:border-gold/30 hover:translate-y-[-8px] transition-all duration-300">
                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-8 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-4xl">view_quilt</span>
                    </div>
                    <div className="mb-6">
                        <div className="w-full h-48 bg-primary rounded-xl overflow-hidden mb-6 border border-primary/5">
                            <Image
                                src="/Large-areas-iconz.png"
                                alt={t('spaciousAreas.title')}
                                width={400}
                                height={300}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-primary-dark text-2xl font-bold mb-4">{t('spaciousAreas.title')}</h3>
                        <p className="text-secondary-text text-base leading-relaxed">
                            {t('spaciousAreas.description')}
                        </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center gap-2 text-primary font-bold text-sm">
                        <span>{t('spaciousAreas.link')}</span>
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </div>
                </div>

                {/* Card 3: Family Destination */}
                <div className="group flex flex-col bg-gradient-to-br from-[#003366] via-[#004080] to-[#002952] text-white p-8 rounded-2xl shadow-lg border border-primary/5 hover:border-gold/30 hover:translate-y-[-8px] transition-all duration-300 ">
                    <div className="w-16 h-16 bg-primary-dark/5 rounded-2xl flex items-center justify-center text-primary-dark mb-8 group-hover:bg-primary-dark group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-4xl">family_restroom</span>
                    </div>
                    <div className="mb-6">
                        <div className="w-full h-48 bg-primary rounded-xl overflow-hidden mb-6 border border-primary/5">
                            <Image
                                src="/Family-destination-iconz.png"
                                alt={t('familyDestination.title')}
                                width={400}
                                height={300}
                                className="w-full h-full object-c group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-primary-dark text-2xl font-bold mb-4">{t('familyDestination.title')}</h3>
                        <p className="text-secondary-text text-base leading-relaxed">
                            {t('familyDestination.description')}
                        </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center gap-2 text-gold font-bold text-sm">
                        <span>{t('familyDestination.link')}</span>
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-24 rounded-3xl p-12 lg:p-16 text-center text-primary-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-pattern bg-white"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary-dark">{t('cta.title')}</h2>
                    <p className="border border-gold inline-block px-6 py-2 rounded-full font-medium mb-10">
                        {t('cta.subtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-gold hover:bg-gold-light text-primary-dark font-bold px-10 py-4 rounded-xl transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined">map</span>
                            {t('cta.nearbyBranches')}
                        </button>
                        <button className="text-white bg-primary hover:bg-primary/90 font-bold px-10 py-4 rounded-xl transition-colors duration-300 backdrop-blur-sm flex items-center gap-2 cursor-pointer">
                            <span className="material-symbols-outlined">call</span>
                            {t('cta.contactUs')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
