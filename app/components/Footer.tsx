'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
    const t = useTranslations('footer');

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
                            <span className="text-xl font-bold text-gray-900">Meem Market</span>
                        </div>
                        <p className="text-sm mb-6 text-secondary-text">
                            {t('brandDescription')}
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <a href="#" className="text-gray-400 hover:text-primary" aria-label="Facebook">
                                <span className="material-icons-outlined text-xl">facebook</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary" aria-label="Instagram">
                                <span className="material-icons-outlined text-xl">camera_alt</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary" aria-label="Twitter">
                                <span className="material-icons-outlined text-xl">alternate_email</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">{t('shopping')}</h4>
                        <ul className="space-y-3 text-sm text-secondary-text">
                            <li><a href="#" className="hover:text-primary">{t('weeklyFlyer')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('ramadanSpecials')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('meemBrands')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('giftCards')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">{t('customerCare')}</h4>
                        <ul className="space-y-3 text-sm text-secondary-text">
                            <li><a href="#" className="hover:text-primary">{t('helpCenter')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('returnsRefunds')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('storeLocator')}</a></li>
                            <li><a href="#" className="hover:text-primary">{t('contactUs')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">{t('stayUpdated')}</h4>
                        <p className="text-sm mb-4 text-secondary-text">{t('stayUpdatedDesc')}</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm text-gray-900"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-lg text-sm transition-colors"
                            >
                                {t('subscribe')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-text">
                    <p>{t('copyright')}</p>
                    <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900">{t('privacyPolicy')}</a>
                        <a href="#" className="hover:text-gray-900">{t('termsOfService')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
