import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from './LocaleSwitcher';

export default async function Navbar() {
    const t = await getTranslations('common');

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <img src="/meem-logo.png" alt="Meem Market" className="h-12 w-auto" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 rtl:space-x-reverse items-center">
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('home')}</a>
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('offers')}</a>
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('aboutUs')}</a>
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('ourProducts')}</a>
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('ourBranches')}</a>
                        <a href="#" className="hover:text-primary transition-colors font-medium text-secondary-text">{t('careers')}</a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <button className="p-2 text-gray-500 hover:text-primary transition-colors" aria-label={t('search')}>
                            <span className="material-icons-outlined">search</span>
                        </button>
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary/20 rounded-full hover:bg-primary/5 transition-colors">
                            <span className="material-icons-outlined text-lg">storefront</span>
                            {t('findStore')}
                        </button>
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}
