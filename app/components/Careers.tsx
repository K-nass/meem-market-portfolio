'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Careers() {
    const t = useTranslations('careers');

    return (
        <section className="py-16 px-6 lg:px-40">
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/career-section-bg.webp"
                            alt="Careers at Meem"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 py-16 px-8 lg:px-16 lg:py-20">
                        <div className="max-w-2xl">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-gold mb-6 border border-gold/30 backdrop-blur-sm"
                            >
                                <span className="material-symbols-outlined text-sm">work</span>
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    {t('badge')}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                            >
                                {t('title')}
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-white/90 text-lg mb-8 leading-relaxed"
                            >
                                {t('description')}
                            </motion.p>

                            {/* Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <button className="bg-gold hover:bg-gold-light text-primary-dark font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-gold/20 flex items-center gap-2 group">
                                    <span>{t('button')}</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
