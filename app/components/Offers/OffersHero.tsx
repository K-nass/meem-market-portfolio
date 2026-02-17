interface OffersHeroProps {
  title: string;
  description: string;
  badge: string;
  country?: string;
  branch?: string;
}

export default function OffersHero({
  title,
  description,
  badge,
  country,
  branch,
}: OffersHeroProps) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent font-bold text-sm">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>{badge}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">
              {title} <span className="text-primary italic">{country}، {branch}</span>
            </h2>
            <p className="text-slate-500 max-w-xl">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
