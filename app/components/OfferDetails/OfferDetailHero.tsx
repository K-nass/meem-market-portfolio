interface OfferDetailHeroProps {
  title: string;
  location: string;
  branch: string;
  status: string;
}

export default function OfferDetailHero({
  title,
  location,
  branch,
  status,
}: OfferDetailHeroProps) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-r-4 border-gold pr-6 py-2">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-slate-500">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="font-medium">
                المنطقة: {location} | الفرع: {branch}
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              {status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
