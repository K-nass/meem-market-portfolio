import { getTranslations, getLocale } from 'next-intl/server';
import LocaleSwitcher from './LocaleSwitcher';
import { Link } from '@/i18n/navigation';
import MobileMenu from './MobileMenu';
export default async function Navbar() {
    const t = await getTranslations('common');
    const locale = await getLocale();

    // Prepare translations for MobileMenu
    const mobileMenuTranslations = {
        home: t('home'),
        offers: t('offers'),
        aboutUs: t('aboutUs'),
        ourProducts: t('ourProducts'),
        ourBranches: t('ourBranches'),
        careers: t('careers'),
        menu: t('menu'),
        close: t('close')
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo with subtle animation */}
                    <div className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                            <Link href="/">
                                <img
                                    src="/meem-logo.png"
                                    alt="Meem Market"
                                    className="h-12 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Menu with morphologic hover effects */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link
                            href="/"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('home')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                        <Link
                            href="/offers"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('offers')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                        <Link
                            href="#"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('aboutUs')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                        <Link
                            href="#products"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('ourProducts')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                        <Link
                            href="/branches"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('ourBranches')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                        <Link
                            href="/career"
                            className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300 group"
                        >
                            <span className="relative z-10">{t('careers')}</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                        </Link>
                    </div>

                    {/* Actions with enhanced styling */}
                    <div className="flex items-center gap-3">
                        {/* Search button with morphologic effect */}
                        <button
                            className="relative p-2.5 text-gray-600 hover:text-primary transition-all duration-300 group rounded-xl hover:bg-gray-100/80"
                            aria-label={t('search')}
                        >
                            <span className="material-icons-outlined text-[22px] relative z-10">search</span>
                            <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                        </button>

                        {/* Find Store button with gradient accent */}
                        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-full hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            <span className="material-icons-outlined text-lg relative z-10">storefront</span>
                            <span className="relative z-10">{t('findStore')}</span>
                        </button>

                        {/* Divider */}
                        <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                        {/* Locale Switcher with enhanced container */}
                        <div className="relative">
                            <LocaleSwitcher />
                        </div>

                        {/* Mobile Menu */}
                        <MobileMenu translations={mobileMenuTranslations} locale={locale} />
                    </div>
                </div>
            </div>

            {/* Subtle gradient line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </nav>
    );
}
