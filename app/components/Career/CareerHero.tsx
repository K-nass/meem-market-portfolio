import Image from 'next/image';
import Link from 'next/link';

interface CareerHeroProps {
  badge: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref?: string;
  imageAlt: string;
  locale?: string;
}

export default function CareerHero({
  badge,
  title,
  description,
  primaryButtonText,
  primaryButtonHref = '#jobs',
  imageAlt,
  locale = 'ar',
}: CareerHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[500px] lg:min-h-[600px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/jobs-bg-banner.webp"
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-700/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-2xl text-right">
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="material-symbols-outlined text-sm">star</span>
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-200 mb-10 leading-relaxed">
            {description}
          </p>
          <a
            className="inline-flex items-center gap-2 bg-accent hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
            href={primaryButtonHref}
          >
            <span className="material-symbols-outlined">arrow_downward</span>
            {primaryButtonText}
          </a>
        </div>
      </div>
    </section>
  );
}
