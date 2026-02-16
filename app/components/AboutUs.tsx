import { getTranslations } from 'next-intl/server';

export default async function AboutUs() {
    const t = await getTranslations('about');

    const pillars = [
        {
            key: 'mission',
            icon: 'campaign',
            title: t('missionTitle'),
            text: t('missionText'),
        },
        {
            key: 'goal',
            icon: 'emoji_events',
            title: t('goalTitle'),
            text: t('goalText'),
        },
        {
            key: 'vision',
            icon: 'visibility',
            title: t('visionTitle'),
            text: t('visionText'),
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark"></div>
            <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,175,55,0.3) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                                  radial-gradient(circle at 60% 80%, rgba(212,175,55,0.2) 0%, transparent 45%)`
            }}></div>
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="h-px w-12 bg-gold/60"></div>
                        <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">{t('sectionLabel')}</span>
                        <div className="h-px w-12 bg-gold/60"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-arabic">
                        {t('title')}
                    </h2>
                </div>

                {/* Description */}
                <div className="max-w-4xl mx-auto mb-20">
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed text-center font-light">
                        {t('description')}
                    </p>
                </div>

                {/* Three Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <div
                            key={pillar.key}
                            className="group relative bg-white/[0.07] backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/[0.12] hover:border-gold/30 transition-all duration-500 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                                <span className="material-icons-outlined text-gold text-2xl">{pillar.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                                {pillar.title}
                            </h3>

                            {/* Body */}
                            <p className="text-white/60 leading-relaxed text-sm group-hover:text-white/75 transition-colors duration-300">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </section>
    );
}
