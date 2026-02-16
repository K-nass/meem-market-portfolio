'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const AppBanner: React.FC = () => {
    const t = useTranslations('appBanner');

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 w-full">
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10 relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="flex-1 z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
                    <p className="mb-8 max-w-md text-secondary-text">
                        {t('description')}
                    </p>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity">
                            <span className="material-icons-outlined text-2xl">apple</span>
                            <div className="text-left rtl:text-right leading-tight">
                                <div className="text-[10px] uppercase font-semibold opacity-70">{t('downloadOn')}</div>
                                <div className="text-sm font-bold">{t('appStore')}</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity">
                            <span className="material-icons-outlined text-2xl">android</span>
                            <div className="text-left rtl:text-right leading-tight">
                                <div className="text-[10px] uppercase font-semibold opacity-70">{t('getItOn')}</div>
                                <div className="text-sm font-bold">{t('googlePlay')}</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center relative z-10">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtTisPOrF5ySBQQYHOGK8KOOGv9HH5Dg6b10zK73eFKZVH6xziVwf5_f9JsghWixWFky9FrVZeh0f2zS6rPRI3mWxSlLqMVnaju43a_h8Vxfi2eO6jAzERYe-E8alhxSDKTicztWhupJ_5bn3ngGQcBLTYW0e5PSpIx9hEFr8MZsMmYXGwyOrfRcYpGkjCwJvF2VeCU4HRDx79WwWgXYdJweb0trihdwfrkN6ft_ozXvg9WOtI3gGA7oUuvwwkL63EC1uQPqUE2FYX"
                        alt="Smartphone displaying app interface"
                        className="w-48 h-auto rotate-6 shadow-2xl rounded-[32px] border-4 border-white"
                    />
                </div>
            </div>
        </section>
    );
};

export default AppBanner;
