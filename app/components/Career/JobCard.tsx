interface JobCardProps {
  title: string;
  badge: string;
  badgeColor?: 'blue' | 'orange' | 'green' | 'gold';
  workType: string;
  location: string;
  description?: string;
  requirements?: string;
  postedDate?: string;
  icon?: string;
  variant?: 'large' | 'vertical' | 'default';
  buttonText: string;
  onButtonClick?: () => void;
}

const badgeColors = {
  blue: 'bg-blue-50 text-primary',
  orange: 'bg-orange-50 text-orange-600',
  green: 'bg-green-50 text-accent',
  gold: 'bg-gold/10 text-gold',
};

const iconMap: Record<string, string> = {
  video: 'video_camera_back',
  sales: 'shopping_cart',
  support: 'support_agent',
  cashier: 'point_of_sale',
};

export default function JobCard({
  title,
  badge,
  badgeColor = 'blue',
  workType,
  location,
  description,
  requirements,
  postedDate,
  icon,
  variant = 'default',
  buttonText,
  onButtonClick,
}: JobCardProps) {
  const iconName = icon ? iconMap[icon] || icon : undefined;

  if (variant === 'large') {
    return (
      <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className={`${badgeColors[badgeColor]} px-3 py-1 rounded-md text-xs font-bold mb-3 inline-block`}>
              {badge}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <div className="flex items-center gap-4 text-secondary-text text-sm mb-6">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {workType}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {location}
              </span>
            </div>
          </div>
          {iconName && (
            <div className="bg-primary/10 p-4 rounded-xl group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
                {iconName}
              </span>
            </div>
          )}
        </div>
        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
          {description && (
            <p className="text-slate-600 text-sm hidden md:block">{description}</p>
          )}
          <button
            onClick={onButtonClick}
            className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors text-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
        <div className="mb-6">
          <div className={`${badgeColors[badgeColor]} px-3 py-1 rounded-md text-xs font-bold mb-3 inline-block`}>
            {badge}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <div className="flex flex-col gap-2 text-secondary-text text-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {workType}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {location}
            </span>
          </div>
        </div>
        <div className="mt-auto space-y-4">
          {requirements && (
            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
              <span className="text-xs text-secondary-text block mb-1">المتطلبات الأساسية:</span>
              <span className="text-xs font-medium text-slate-700">{requirements}</span>
            </div>
          )}
          <button
            onClick={onButtonClick}
            className="w-full bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors text-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex items-start justify-between mb-6">
        {iconName && (
          <div className={`${badgeColors[badgeColor]} p-3 rounded-xl`}>
            <span className="material-symbols-outlined text-2xl">{iconName}</span>
          </div>
        )}
        {postedDate && <span className="text-xs text-secondary-text">{postedDate}</span>}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <div className="flex items-center gap-4 text-secondary-text text-sm mb-6">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {workType}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {location}
        </span>
      </div>
      <button
        onClick={onButtonClick}
        className="w-full bg-primary/10 text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-primary hover:text-white transition-all text-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}
