interface CategoryCardProps {
    title: string;
    arabicTitle: string;
    description?: string;
    image: string;
    badge?: string;
    variant?: 'large' | 'tall' | 'wide' | 'small' | 'recipe';
    discount?: string;
    icon?: string;
    readRecipesLabel?: string;
    shopNowLabel?: string;
    viewCollectionLabel?: string;
    offLabel?: string;
}

export default function CategoryCard({
    title,
    arabicTitle,
    description,
    image,
    badge,
    variant = 'small',
    discount,
    icon,
    readRecipesLabel = 'Read Recipes',
    shopNowLabel = 'Shop Now',
    viewCollectionLabel = 'View Collection',
    offLabel = 'OFF'
}: CategoryCardProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'large':
                return 'md:col-span-2 md:row-span-2 rounded-[24px] shadow-xl';
            case 'tall':
                return 'md:col-span-1 md:row-span-2 rounded-[24px] shadow-lg';
            case 'wide':
                return 'md:col-span-1 lg:col-span-1 md:row-span-1 bg-primary rounded-[24px] shadow-lg';
            case 'recipe':
                return 'md:col-span-3 lg:col-span-2 md:row-span-1 rounded-[24px] shadow-lg border border-primary/5';
            default:
                return 'md:col-span-2 lg:col-span-1 md:row-span-1 rounded-[24px] shadow-lg border border-gold/20';
        }
    };

    if (variant === 'wide') {
        return (
            <div className={`${getVariantStyles()} group relative overflow-hidden hover-lift cursor-pointer`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <img alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" src={image} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90 mix-blend-multiply"></div>
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                    <div>
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <h4 className="text-lg font-arabic text-white/90" dir="rtl">{arabicTitle}</h4>
                    </div>
                    <div className="flex justify-between items-end">
                        {discount && <span className="text-3xl font-bold text-white">{discount} <span className="text-sm font-normal align-middle opacity-80">{offLabel}</span></span>}
                        {icon && <span className="material-icons-outlined text-white/80 text-4xl group-hover:rotate-12 transition-transform">{icon}</span>}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'recipe') {
        return (
            <div className={`${getVariantStyles()} group relative overflow-hidden hover-lift bg-white flex flex-row items-center cursor-pointer`}>
                <div className="w-1/2 h-full relative overflow-hidden">
                    <img alt={title} className="absolute inset-0 w-full h-full object-cover" src={image} />
                </div>
                <div className="w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white h-full">
                    <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-2">{badge}</h3>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
                    <a className="text-primary font-medium text-sm hover:underline decoration-2 underline-offset-4 flex items-center gap-1" href="#">
                        {readRecipesLabel} <span className="material-icons-outlined text-xs">arrow_forward</span>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={`${getVariantStyles()} group relative overflow-hidden hover-lift bg-white cursor-pointer`}>
            <img alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={image} />

            {variant === 'large' ? (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        {badge && <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 inline-block">{badge}</span>}
                        <h3 className="text-3xl font-bold text-white mb-2 font-display">{title}</h3>
                        <h4 className="text-2xl font-arabic font-bold text-white/90 mb-2" dir="rtl">{arabicTitle}</h4>
                        {description && <p className="text-gray-200 line-clamp-2 max-w-md text-sm mb-4">{description}</p>}
                        <span className="inline-flex items-center text-white font-medium group-hover:underline decoration-gold underline-offset-4">
                            {shopNowLabel} <span className="material-icons-outlined ml-1 rtl:mr-1 rtl:ml-0 text-sm">arrow_forward</span>
                        </span>
                    </div>
                </>
            ) : variant === 'tall' ? (
                <>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                        <h4 className="text-lg font-arabic font-bold text-white/90 mb-2" dir="rtl">{arabicTitle}</h4>
                        {description && <p className="text-xs text-gray-200 mb-3">{description}</p>}
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:border-transparent transition-colors border border-white/30">
                            <span className="material-icons-outlined">add</span>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-primary font-bold text-lg tracking-wide border-b-2 border-primary">{viewCollectionLabel}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full group-hover:opacity-0 transition-opacity">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <h4 className="text-lg font-arabic text-white/90" dir="rtl">{arabicTitle}</h4>
                    </div>
                    {badge && <div className="absolute top-4 right-4 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">{badge}</div>}
                </>
            )}
        </div>
    );
}
