
import { getTranslations } from "next-intl/server";
import Hero from "../components/Home/Hero";
import CategoryCard from "../components/Home/CategoryCard";
import FeaturedCategoriesSwiper from "../components/Home/FeaturedCategoriesSwiper";
import AppBanner from "../components/Home/AppBanner";
import AboutUs from "../components/Home/AboutUs";
import OurFields from "../components/Home/OurFields";
import CompetitiveValue from "../components/Home/CompetitiveValue";
import Footer from "../components/Home/Footer";
import BranchFilterSidebar from "../components/BranchFilter/BranchFilterSidebar";
import { locations, branches } from "../data/branches";
import { getFeaturedCategories, categories } from "../data/categories";
import WhyChooseUs from '../components/Home/WhyChooseUs';
import PartnersSlider from '../components/Home/PartnersSlider';
import Careers from '../components/Home/Careers';

export default async function Home({ params }: { params: { locale: string } }) {
    // Validate locale parameter against supported locales
    const validLocales = ['en', 'ar'];
    const locale = params?.locale && validLocales.includes(params.locale) 
        ? params.locale 
        : 'en';
    
    const t = await getTranslations('categories');
    
    // Fetch featured categories for swiper with validation
    const allFeaturedCategories = getFeaturedCategories();
    
    // Filter out invalid categories (must have required fields)
    const validFeaturedCategories = allFeaturedCategories.filter(cat => 
        cat?.id && 
        cat?.title && 
        cat?.arabicTitle && 
        cat?.imagePath
    );
    
    // Provide fallback if no valid featured categories exist
    const featuredCategories = validFeaturedCategories.length > 0 
        ? validFeaturedCategories 
        : categories.filter(c => c?.id && c?.title && c?.arabicTitle && c?.imagePath).slice(0, 3);
    
    // Get specific categories for static cards by ID with optional chaining
    const tallCategory = categories.find(c => c?.id === 'plastic-hardware');
    const wideCategory = categories.find(c => c?.id === 'household-items');
    const smallCategory = categories.find(c => c?.id === 'gifts-collectibles');
    const recipeCategory = categories.find(c => c?.id === 'vegetables-fruits');

    return (
        <>
            <Hero />
            {/* Container for sidebar positioning - starts after hero */}
            <div className="relative">
                {/* Sidebar - Positioned absolutely within this container */}
                <div className="hidden lg:block absolute left-4 top-24 z-30 w-64">
                    <BranchFilterSidebar
                        locations={locations}
                        branches={branches}
                    />
                </div>

                {/* Main Content - Full width, unaffected by sidebar */}
                <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-20 pb-20 w-full">
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
                    <div id="products" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
                        <CategoryCard
                            variant="large"
                            title={t('ramadanEssentials')}
                            arabicTitle="أساسيات رمضان"
                            description={t('ramadanEssentialsDesc')}
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBSmF-ftYBr6vUMECsnAVqCyqFo6qX5d3fPHsIog8G6HQbdNuiGGO2HLpw3haLjE_dd0mSvwPliLHd_2BFz9Q1x4VU6fkSTLiqFumdVvcRoAXMskjDqXBy_lBGRNMw_8LBV5Pq58wmEFwG81ZfPKElMDapnxKTYrCSPGMfuj68tbgVS6bYh2st_LTnlpSfW3TKmfuqrce3nte-G_MIw2EoMFuq3Zqdu8rnapiGblvHSbuANpyrxzHwuBKXWJXcZNgw7fWl5b9HEPv5b"
                            badge={t('topOffers')}
                            shopNowLabel={t('shopNow')}
                            locale={locale}
                        />
                        {tallCategory && (
                            <CategoryCard
                                variant="tall"
                                title={tallCategory?.title}
                                arabicTitle={tallCategory?.arabicTitle}
                                description={tallCategory?.description}
                                image={tallCategory?.imagePath}
                                badge={tallCategory?.badge}
                                discount={tallCategory?.discount}
                                icon={tallCategory?.icon}
                            />
                        )}
                        {wideCategory && (
                            <CategoryCard
                                variant="wide"
                                title={wideCategory?.title}
                                arabicTitle={wideCategory?.arabicTitle}
                                description={wideCategory?.description}
                                image={wideCategory?.imagePath}
                                badge={wideCategory?.badge}
                                discount={wideCategory?.discount}
                                icon={wideCategory?.icon}
                                offLabel={t('off')}
                            />
                        )}
                        {smallCategory && (
                            <CategoryCard
                                variant="small"
                                title={smallCategory?.title}
                                arabicTitle={smallCategory?.arabicTitle}
                                description={smallCategory?.description}
                                image={smallCategory?.imagePath}
                                badge={smallCategory?.badge}
                                discount={smallCategory?.discount}
                                icon={smallCategory?.icon}
                                viewCollectionLabel={t('viewCollection')}
                            />
                        )}
                        {recipeCategory && (
                            <CategoryCard
                                variant="recipe"
                                title={recipeCategory?.title}
                                arabicTitle={recipeCategory?.arabicTitle}
                                description={recipeCategory?.description}
                                image={recipeCategory?.imagePath}
                                badge={recipeCategory?.badge}
                                discount={recipeCategory?.discount}
                                icon={recipeCategory?.icon}
                                readRecipesLabel={t('readRecipes')}
                            />
                        )}

                        {/* Charity Box */}
                        {/* <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[24px] shadow-lg hover-lift bg-gradient-to-br from-[#1a3a1a] to-[#0d1f0d] p-6 text-center flex flex-col items-center justify-center cursor-pointer border border-white/5">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="material-icons-outlined text-gold text-3xl">volunteer_activism</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">{t('charityBox')}</h3>
                            <p className="text-gray-400 text-xs mb-4">{t('charityBoxDesc')}</p>
                            <button className="text-xs bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors w-full">{t('donateNow')}</button>
                        </div> */}
                    </div>

                    {/* Mobile/Tablet Sidebar */}
                    <div className="lg:hidden">
                        <BranchFilterSidebar
                            locations={locations}
                            branches={branches}
                        />
                    </div>
                </main>
            </div>

            <AboutUs />
            <CompetitiveValue />
            <OurFields />
            <WhyChooseUs />
            <PartnersSlider />
            <Careers />
            <AppBanner />
        </>
    );
}
