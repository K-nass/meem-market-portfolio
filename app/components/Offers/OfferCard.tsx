import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface OfferCardProps {
  variant?: 'large' | 'medium' | 'small' | 'tech' | 'minimal' | 'flash';
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: 'gold' | 'accent' | 'primary';
  image?: string;
  icon?: string;
  buttonText?: string;
  buttonHref?: string;
  progress?: number;
  progressLabel?: string;
  offerId?: string;
}

export default function OfferCard({
  variant = 'medium',
  title,
  description,
  badge,
  badgeColor = 'gold',
  image,
  icon,
  buttonText,
  buttonHref = '#',
  progress,
  progressLabel,
  offerId,
}: OfferCardProps) {
  const cardHref = offerId ? `/offers/${offerId}` : buttonHref;
  const badgeColors = {
    gold: 'bg-gold text-white',
    accent: 'bg-accent/90 backdrop-blur text-white',
    primary: 'bg-primary text-white',
  };

  // Large variant with image overlay
  if (variant === 'large') {
    if (offerId) {
      return (
        <Link
          href={cardHref}
          className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute bottom-0 right-0 p-8 z-20 text-white w-full h-1/2 flex flex-col justify-end">
            {badge && (
              <span className={`${badgeColors[badgeColor]} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg w-fit`}>
                {badge}
              </span>
            )}
            <h3 className="text-3xl font-black mb-2 leading-tight">{title}</h3>
            {description && (
              <p className="text-white/80 text-sm mb-6 line-clamp-2">{description}</p>
            )}
            <span className="inline-flex items-center gap-2 text-gold font-bold group-hover:gap-4 transition-all text-sm uppercase tracking-wide">
              عرض التفاصيل
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </span>
          </div>
        </Link>
      );
    }

    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute bottom-0 right-0 p-8 z-20 text-white w-full h-1/2 flex flex-col justify-end">
          {badge && (
            <span className={`${badgeColors[badgeColor]} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg w-fit`}>
              {badge}
            </span>
          )}
          <h3 className="text-3xl font-black mb-2 leading-tight">{title}</h3>
          {description && (
            <p className="text-white/80 text-sm mb-6 line-clamp-2">{description}</p>
          )}
          {buttonText && (
            <a
              href={buttonHref}
              className="inline-flex items-center gap-2 text-gold font-bold hover:gap-4 transition-all text-sm uppercase tracking-wide"
            >
              {buttonText}
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  // Tech variant with minimal design
  if (variant === 'tech') {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px] bg-slate-900 border border-slate-800">
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-overlay"></div>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
          />
        )}
        <div className="absolute inset-0 p-8 z-20 text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            {icon && <span className="material-symbols-outlined text-4xl opacity-70">{icon}</span>}
            {badge && (
              <span className="text-xs font-bold text-slate-300 border border-slate-600 px-2 py-1 rounded">
                {badge}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-black mb-1">{title}</h3>
            {description && <p className="text-slate-300 text-sm mb-4">{description}</p>}
            <div className="h-[2px] w-12 bg-gold"></div>
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant with white background
  if (variant === 'minimal') {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px] bg-white border border-slate-200">
        <div className="absolute inset-0 p-8 z-20 flex flex-col h-full">
          <div className="flex justify-between items-start mb-auto">
            {icon && (
              <div className="size-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
              </div>
            )}
            {badge && (
              <span className="text-[10px] text-slate-400 font-bold uppercase border border-slate-100 px-2 py-1 rounded-full">
                {badge}
              </span>
            )}
          </div>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-3xl font-black text-slate-900">{title}</h3>
              {description && <p className="text-slate-500 text-sm mt-2">{description}</p>}
            </div>
            {progress !== undefined && (
              <>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gold h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                {progressLabel && <p className="text-xs text-slate-400">{progressLabel}</p>}
              </>
            )}
          </div>
          {buttonText && (
            <a
              href={buttonHref}
              className="mt-auto w-full py-3 rounded-xl border border-slate-200 text-center text-primary font-bold hover:bg-slate-50 transition-colors"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    );
  }

  // Flash variant for time-limited offers
  if (variant === 'flash') {
    return (
      <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px] bg-primary text-white">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">timer</span>
        </div>
        <div className="absolute inset-0 p-10 z-20 flex flex-col items-center justify-center text-center gap-6">
          {icon && (
            <div className="size-20 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-4xl">{icon}</span>
            </div>
          )}
          <div>
            <h3 className="text-3xl font-black mb-2">{title}</h3>
            {description && <p className="text-white/70 text-base max-w-[200px] mx-auto">{description}</p>}
          </div>
          {buttonText && (
            <button className="px-8 py-3 bg-white text-primary hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors shadow-lg mt-4">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Medium variant (default)
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all hover:-translate-y-2 w-full h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      {icon && (
        <div className="absolute top-0 right-0 p-6 z-20 w-full flex justify-between items-start">
          {badge && (
            <span className={`${badgeColors[badgeColor]} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
              {badge}
            </span>
          )}
          <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">{icon}</span>
        </div>
      )}
      <div className="absolute bottom-0 right-0 p-8 z-20 text-white w-full">
        <h3 className="text-2xl font-black mb-2">{title}</h3>
        {description && <p className="text-white/80 text-sm mb-4 line-clamp-2">{description}</p>}
        {buttonText && (
          <a
            href={buttonHref}
            className="inline-flex items-center gap-2 text-white/90 font-bold hover:text-white hover:gap-3 transition-all text-xs"
          >
            {buttonText}
            <span className="material-symbols-outlined text-xs">arrow_back</span>
          </a>
        )}
      </div>
    </div>
  );
}
