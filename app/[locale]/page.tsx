
import { getTranslations } from "next-intl/server";
import Hero from "../components/Home/Hero";
import CategoryCarousel from "../components/Home/CategoryCarousel";
import AppBanner from "../components/Home/AppBanner";
import AboutUs from "../components/Home/AboutUs";
import OurFields from "../components/Home/OurFields";
import CompetitiveValue from "../components/Home/CompetitiveValue";
import { categories } from "../data/categories";
import WhyChooseUs from '../components/Home/WhyChooseUs';
import PartnersSlider from '../components/Home/PartnersSlider';
import Careers from '../components/Home/Careers';

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'seo' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
        },
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const t = await getTranslations('categories');

    return (
        <main>
            <Hero />

            {/* Category Carousel Section - Full Width Premium Design */}
            <section className="w-full bg-pattern bg-gradient-to-b from-gray-50 to-white py-16 relative z-20 overflow-hidden">
                {/* Ramadan Kareem Decoration - Top Left */}
                <div className="absolute top-0 left-0 z-0 opacity-90">
                    <img
                        src="/ramadan-kareem.png"
                        alt="Ramadan Kareem"
                        className="h-48 md:h-64 lg:h-80 object-contain"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="uppercase tracking-widest text-xs font-bold text-gold mb-2 block">{t('seasonalCollections')}</span>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">{t('featuredCategories')}</h3>
                        </div>
                        <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors mt-4 md:mt-0 group">
                            {t('viewAllCategories')}
                            <span className="material-icons-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>

                    {/* Category Carousel */}
                    <CategoryCarousel
                        categories={categories}
                        locale={locale}
                    />
                </div>
            </section>

            <AboutUs />
            <CompetitiveValue />
            <OurFields />
            <WhyChooseUs />
            <PartnersSlider />
            <Careers />
            <AppBanner />
        </main>
    );
}
