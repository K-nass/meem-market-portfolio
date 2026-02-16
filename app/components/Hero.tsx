'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
    const t = useTranslations('hero');

    return (
        <header className="relative overflow-hidden group">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVJZ8DyirJ2SYHCLstzToGfuFP17AJlRtMpJ50PX1Ju0HhIC8r3s8_UcfhQ_p_ffG6lo2zwI0QDqZJpGRCN2GxFqDCFDd4P9Gy9eG-HCtJm8pZP5jNmgGeQsnD0aMWD4kueNxVeV-1IILEK5b_aG2KjmGwmhGZCCzU5pTi4SW4-bwpop-I2tdj0Tg9kk-046OwMb1xStkUkvMPv9i54fxGVgvSBk0rId4LKlmFYX7wDQ_2EnffylXQyK5QbZXrw0G22JOyM-1lmH-2"
                    alt="Golden hour desert landscape"
                    className="w-full h-full object-cover object-center opacity-90 transition-transform duration-[20s] ease-linear group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary-dark/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
                <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                                {t('season')}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
                            Ramdan <span className="text-gold font-serif italic">kareem</span>
                        </h1>
                        <h2 className="font-arabic text-4xl md:text-6xl font-bold text-white/90 mb-6" dir="rtl">
                            {t('arabicTitle')}
                        </h2>
                        <div className="h-1 w-24 bg-primary mb-6 rounded-full"></div>
                        <p className="text-xl md:text-2xl text-gray-200 font-light max-w-lg mb-8 leading-relaxed">
                            {t('tagline')} <br />
                            <span className="font-arabic opacity-90 block mt-1">{t('taglineSecondary')}</span>
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 flex items-center gap-2">
                                {t('exploreOffers')}
                                <span className="material-icons-outlined text-sm">arrow_forward</span>
                            </button>
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-xl font-semibold transition-all flex items-center gap-2">
                                <span className="material-icons-outlined">calendar_today</span>
                                {t('downloadCalendar')}
                            </button>
                        </div>
                    </div>

                    {/* Decorative Minimalist Lantern Icon (SVG) */}
                    <div className="hidden md:block opacity-80 mix-blend-screen animate-pulse duration-[3000ms]">
                        <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0L100 60" stroke="#D4AF37" strokeWidth="2" />
                            <circle cx="100" cy="65" r="5" fill="#D4AF37" />
                            <path d="M70 80H130L140 120H60L70 80Z" fill="url(#grad1)" stroke="#D4AF37" strokeWidth="2" />
                            <rect x="60" y="120" width="80" height="120" rx="10" fill="url(#grad2)" stroke="#D4AF37" strokeWidth="2" />
                            <path d="M60 240L70 260H130L140 240" stroke="#D4AF37" strokeWidth="2" />
                            <defs>
                                <linearGradient id="grad1" x1="100" y1="80" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#D4AF37" stopOpacity="0.2" />
                                    <stop offset="1" stopColor="#D4AF37" stopOpacity="0.05" />
                                </linearGradient>
                                <linearGradient id="grad2" x1="100" y1="120" x2="100" y2="240" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#D4AF37" stopOpacity="0.1" />
                                    <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
