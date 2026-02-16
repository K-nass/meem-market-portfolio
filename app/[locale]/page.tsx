'use client';

import { useTranslations } from 'next-intl';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import AppBanner from "../components/AppBanner";
import Footer from "../components/Footer";

export default function Home() {
    const t = useTranslations('categories');

    return (
        <>
            <Navbar />
            <Hero />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20 w-full">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 text-white md:text-gray-800">
                    <div>
                        <span className="uppercase tracking-widest text-xs font-bold text-gold mb-1 block">{t('seasonalCollections')}</span>
                        <h3 className="text-3xl font-bold">{t('featuredCategories')}</h3>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors mt-4 md:mt-0">
                        {t('viewAllCategories')} <span className="material-icons-outlined text-sm">arrow_forward</span>
                    </a>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
                    <CategoryCard
                        variant="large"
                        title={t('ramadanEssentials')}
                        arabicTitle="أساسيات رمضان"
                        description={t('ramadanEssentialsDesc')}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBSmF-ftYBr6vUMECsnAVqCyqFo6qX5d3fPHsIog8G6HQbdNuiGGO2HLpw3haLjE_dd0mSvwPliLHd_2BFz9Q1x4VU6fkSTLiqFumdVvcRoAXMskjDqXBy_lBGRNMw_8LBV5Pq58wmEFwG81ZfPKElMDapnxKTYrCSPGMfuj68tbgVS6bYh2st_LTnlpSfW3TKmfuqrce3nte-G_MIw2EoMFuq3Zqdu8rnapiGblvHSbuANpyrxzHwuBKXWJXcZNgw7fWl5b9HEPv5b"
                        badge={t('topOffers')}
                        shopNowLabel={t('shopNow')}
                    />
                    <CategoryCard
                        variant="tall"
                        title={t('freshProduce')}
                        arabicTitle="منتجات طازجة"
                        description={t('freshProduceDesc')}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHrZ6WzHhIiGlHKwTy9sMMSOahQSB9wSmS9ntgc0GdWAap7A6ajP9Grv4-SBsB_ZTKXF54WN9ibf4icTHiTc2n1Ects5R7VcxWYy4yMkvz8j_WHqZIpjBFptUaDFvI_fU_adJUlvNc9Mt6YfpizZXNuSkrDIOTwbTiM4i2rfSBFo5wlv0HV3zcpDOjHQzpi61XjELQZr71u4g9F1I94IWJwacV_NztDpORfMLZjT3hdlOnl8kyLfNKdqxdjoKIbLwLe7mzTu4nzk4"
                    />
                    <CategoryCard
                        variant="wide"
                        title={t('household')}
                        arabicTitle="أدوات منزلية"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBPRcEkOUzCRgjfiHDySZ9pqvjB3fhepQ2PDUYqYKKs3sf5zZO8Ig9DgDZdqHzyHXAoOJIy2ShSfw3FnIdji8VAPRv1pIgycT97aB90oedWP-pOqZaOyzNd_FApJgjxlGXCvnBdozQJSoy3WsDDdyMtToh9G08DrqmrEse9XcGz4-B-rxIFdtJ5Nl1zcC2idU1QFv6mfKeoIvWK7vWTBV3J-fJKxwKu25_caOo0MaHlwgyNT5EXv2LQsyXkmvvv0WIHhL9U3kMlQsOp"
                        discount="40%"
                        icon="countertops"
                        offLabel={t('off')}
                    />
                    <CategoryCard
                        variant="small"
                        title={t('giftSets')}
                        arabicTitle="مجموعات الهدايا"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAsU3D_6e6Vx_5iva2oLCroFG-OioXTGG2HwKCES0hy8LjJtRplyrCUYUf1F8uty3kt-O4uVv376G5BkCXWzjxEX3oThqLG7HwQh5ds0WXgWGrTjFQAUOyA33XVNnr3R7Yry6FqoZi__sDyUs0LuGomf2EGdrX5zCsZIWSGNSp47nVKPlIVr6Qka53wftT_NUNaqXBvrKhKoYP1-UbKCM4f__G1FYAtcUhEj7ENy-w_gbCH-MDXz2jDbyo9YH38D_-FSfZrPAm5WWwU"
                        badge={t('premium')}
                        viewCollectionLabel={t('viewCollection')}
                    />
                    <CategoryCard
                        variant="recipe"
                        title={t('iftarInspiration')}
                        arabicTitle=""
                        description={t('iftarInspirationDesc')}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAj94Em9UvY1g7Heeu3-rGEu-Z9QzttWusTPE2peEuVApKkEsTWlrHzhjxu8nh-v0xObpRuzxZPt85ehzqdAdme-owGrLHLodWKWFdG5_vBGPLJK9Z87sapt86EcAWW0pidAB3K9pFWb6cNrXYdkjGReuy2Y9z70F9eEQcO6GecyW3rLNVpPhj_9Xb9SrKa4f50PK8N-f9bU5fBo8LqZJI3oSU-ylU-fFMp9-ykLleTyf5U7Nr_MMDCllHh7GlQ3TWmsRLUhfIR6iln"
                        badge={t('chefsCorner')}
                        readRecipesLabel={t('readRecipes')}
                    />
                    <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[24px] shadow-lg hover-lift bg-gradient-to-br from-[#1a3a1a] to-[#0d1f0d] p-6 text-center flex flex-col items-center justify-center cursor-pointer border border-white/5">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-icons-outlined text-gold text-3xl">volunteer_activism</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">{t('charityBox')}</h3>
                        <p className="text-gray-400 text-xs mb-4">{t('charityBoxDesc')}</p>
                        <button className="text-xs bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors w-full">{t('donateNow')}</button>
                    </div>
                </div>
            </main>
            <AppBanner />
            <Footer />
        </>
    );
}
